import { Init, Dynamic } from './controller.js';

const communicationURL = {
    block : 'http://192.168.0.24:8080/main/blockInformation',
    adprofit : 'http://192.168.0.24:8080/main/adprofit',
    notice : 'http://192.168.0.24:8080/main/notice',
    faq : 'http://192.168.0.24:8080/main/faq',
    game : 'http://192.168.0.24:8080/main/game'
}


const currentDate = {
    month : new Date().getMonth()+1,
    day : new Date().getDate()
}

const adprofitMonthData = {
    prevMonth : null,
    currentMonth : null,
    comparePercentage : null
}

const adprofitChartData = {
    dateArray : [],
    valueArray : []
}

const promiseResultValue = {resolveCount : 0, rejectCount : 0};

// promise 결과를 저장 -> reject가 하나라도 있으면
// 모든 통신이 끝나고 alert 표현
const promiseProxy = new Proxy(promiseResultValue, {

    set(el, result, count) {

        el[result] = count;
        let endPromise = 0;

        for(let resultCount in el) {
            endPromise += el[resultCount];
        }

        if( endPromise === 4 ) {
            Init.userBlockInfo();
        }

        if(endPromise === 5 && el.rejectCount >= 1) {
            setTimeout(()=>{
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            },1000);
        }

        return true;
    }
});

class Communication {
    static getPromise(url) {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('GET',url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }
}

class Logic {

    static checkCookie(userId) {
        const cookieNameArray = Logic.getCookieName();

        for(const el of cookieNameArray) {
            if( el.toUpperCase() === userId.toUpperCase() ) {
                return false;
            }
        }
        return true;
    }

    static getCookieName() {
        const cookies = document.cookie;
        const cookieArray = cookies.split(';');
        for(const [index, value] of cookieArray.entries()) {
            cookieArray[index] = value.trim();
            const equalIndex = cookieArray[index].indexOf('=');
            cookieArray[index] = cookieArray[index].slice(0,equalIndex);
        }

        return cookieArray;
    }

    static checkBlock(object) {
        return Object.keys(object).length === 0 ? false : true;
    }

    static userBlockInfoData() {
        const promiseResult = Communication.getPromise(communicationURL.block);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( Logic.checkBlock(resultData) && Logic.checkCookie(resultData.trademark) ) {
                Dynamic.renderBlockInfoModal(resultData);
            }
            promiseProxy.resolveCount++;
        }, () => {
            promiseProxy.rejectCount++;
        })
    }

    // 광고수익금 비동기통신
    static adProfitData() {
        const promiseResult = Communication.getPromise(communicationURL.adprofit);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Logic.convertAdprofitMonthData(resultData);
            Logic.convertAdprofitChartData(resultData);
            Dynamic.adProfitTextRender(adprofitMonthData);
            Dynamic.adProfitChartRender(adprofitChartData);
            promiseProxy.resolveCount++;
        }, () => {
            promiseProxy.rejectCount++;
        })
    }

    // 상단 수익금 모델 형식으로 변환
    static convertAdprofitMonthData(resultData) {
        adprofitMonthData.currentMonth = Logic.currencyFormat(resultData.totalForecast);
        adprofitMonthData.prevMonth = Logic.currencyFormat(resultData.totalClosing);
        adprofitMonthData.comparePercentage = Logic.convertPercentage(resultData.totalClosing, resultData.totalForecast)
    }

    // 화폐 형식으로 변환 함수
    static currencyFormat(profit) {
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(parseFloat(profit));
    }

    // 증감율 계산
    static convertPercentage(prevMonthProfit, currentMonthProfit) {
        let convertData = ((parseFloat(currentMonthProfit) - parseFloat(prevMonthProfit)) / parseFloat(prevMonthProfit)) * 100;
        
        return Math.abs(convertData) === Infinity ? '-' : `${convertData.toFixed(2)}%`;
    }

    // 차트 데이터 형식으로 변환
    static convertAdprofitChartData(resultData) {
        const nearSevenDaysClosing = resultData.closing;
        const nearSevenDaysForecast = resultData.forecast;
        const nearSevenDaysProfitData = new Map();

        for(const key in nearSevenDaysClosing) {
            nearSevenDaysProfitData.set(key, nearSevenDaysClosing[key]);
        }

        for(const key in nearSevenDaysForecast) {
            nearSevenDaysProfitData.set(key, nearSevenDaysForecast[key]);
        }

        adprofitChartData.dateArray.push('');
        adprofitChartData.valueArray.push(null);

        for(const el of nearSevenDaysProfitData) {
            adprofitChartData.dateArray.push(`${el[0]}일`);
            adprofitChartData.valueArray.push(el[1]);
        }

        adprofitChartData.dateArray.push('');
        adprofitChartData.valueArray.push(null);
    }

    static noticeData() {
        const promiseResult = Communication.getPromise(communicationURL.notice);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.noticeRender(resultData.noticeList);
            promiseProxy.resolveCount++;
        }, () => {
            promiseProxy.rejectCount++;
        })
    }

    static faqData() {
        const promiseResult = Communication.getPromise(communicationURL.faq);

        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.faqRender(resultData.faqList);
            promiseProxy.resolveCount++;
        })
    }

    static gameData() {
        const promiseResult = Communication.getPromise(communicationURL.game);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.gameRender(resultData);
            promiseProxy.resolveCount++;
        }, () => {
            promiseProxy.rejectCount++;
        })
    }

    // canvas tag 생성
    static createChartTag() {
        const chartBox = document.querySelector('.profit-chart-content');
        chartBox.innerHTML = `<canvas id='index-profit-chart' style='height:${Logic.setChartHeight()}px;'></canvas>`;
        return document.getElementById("index-profit-chart").getContext("2d");
    }

    // window width에 맞춰서 canvas height 지정
    static setChartHeight() {
        if(window.innerWidth <= 500){
            return 200;
        }else if(window.innerWidth <= 960){
            return 300;
        }else {
            return 500;
        }
    }

    static calcAfterThreeDays() {
        const nowDate = Date.now();
        const threeDaysMilliSecond = 259200000;
        const afterThreeDate = new Date(nowDate + threeDaysMilliSecond);

        return afterThreeDate.toUTCString();

    }
}

class EventLogic {
    static modalHeightResize() {
        const modalBackground = document.querySelector('.modal-backgruond');
        const windowHeight = window.innerHeight;
        const bodyHeight = document.querySelector('body').offsetHeight;
        modalBackground.style.height = windowHeight >= bodyHeight ? windowHeight : bodyHeight + 'px';
    }

    static pauseBlockModal(e) {
        const userId = e.target.dataset.id;
        const expireDate = Logic.calcAfterThreeDays();
        document.cookie = `${userId}=${userId};expires=${expireDate}`;
        EventLogic.closeModal();
    }

    static closeModal() {
        const modalBackground = document.querySelector('.modal-backgruond');
        const modal = document.querySelector('.modal-box');

        modalBackground.remove();
        modal.remove();
    }

}

export { Logic, currentDate, EventLogic };