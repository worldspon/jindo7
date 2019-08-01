import { Init, Dynamic } from './controller.js';
import { chartObject } from './view.js';

const communicationURL = {
    block : '/main/blockInformation',
    adprofit : '/main/adprofit',
    notice : '/main/notice',
    faq : '/main/faq',
    game : '/main/game'
}

// 현재월 일 정보 저장 객체
const currentDate = {
    month : new Date().getMonth()+1,
    day : new Date().getDate()
}

// 전월, 현재월 수익금 데이터 및 증감율 가공 후 저장 객체
const adprofitMonthData = {
    prevMonth : null,
    currentMonth : null,
    comparePercentage : null
}

// 차트 데이터 가공 후 저장 객체
const adprofitChartData = {
    dateArray : [],
    valueArray : []
}

// PROMISE 종료 결과 저장 객체
const promiseResultValue = { resolveCount : 0, rejectCount : 0 };

// DATA PROMISE 통신이 끝나면 BLOCK 유저 검증 통신 호출
// 모든 통신 종료 후 REJECT가 하나라도 있으면 ALERT
const promiseProxy = new Proxy(promiseResultValue, {

    set(el, result, count) {

        el[result] = count;

        let endPromise = 0;

        for(let resultCount in el) {
            endPromise += el[resultCount];
        }

        // 모든 RENDER 통신이 완료되면 회원 BLOCK 유무 확인
        if( endPromise === 4 ) {
            Init.userBlockInfo();
        }

        // 모든 통신이 완료되고 REJECT 통신이 하나라도 있으면 ALERT 표출
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

    // 광고수익금 DATA 비동기통신
    static adProfitData() {
        const promiseResult = Communication.getPromise(communicationURL.adprofit);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Logic.convertAdprofitMonthData(resultData);
            Logic.convertAdprofitChartData(resultData);

            // 광고수익금 RENDER 함수 호출
            Dynamic.adProfitTextRender(adprofitMonthData);
            Dynamic.adProfitChartRender(adprofitChartData);
            promiseProxy.resolveCount++;
        }, () => {
            promiseProxy.rejectCount++;
        })
    }

    // 상단 수익금 DATA 가공 후 저장
    static convertAdprofitMonthData(resultData) {
        adprofitMonthData.currentMonth = Logic.currencyFormat(resultData.totalForecast);
        adprofitMonthData.prevMonth = Logic.currencyFormat(resultData.totalClosing);
        adprofitMonthData.comparePercentage = Logic.convertPercentage(resultData.totalClosing, resultData.totalForecast)
    }

    // 화폐 형식으로 변환 함수 ( 1812.4 => $1,812.4 )
    static currencyFormat(profit) {
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(parseFloat(profit));
    }

    // 전월대비증감율 계산 ( 현재월 - 전월 ) / 전월 * 100
    static convertPercentage(prevMonthProfit, currentMonthProfit) {
        let convertData = ((parseFloat(currentMonthProfit) - parseFloat(prevMonthProfit)) / parseFloat(prevMonthProfit)) * 100;
        
        return Math.abs(convertData) === Infinity ? '-' : `${convertData.toFixed(2)}%`;
    }

    // 차트 데이터 형식 변환 후 저장
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

        // 차트 앞뒤 공백을 위해 '', null 추가
        adprofitChartData.dateArray.push('');
        adprofitChartData.valueArray.push(null);

        for(const el of nearSevenDaysProfitData) {
            adprofitChartData.dateArray.push(`${el[0]}일`);
            adprofitChartData.valueArray.push(el[1]);
        }

        adprofitChartData.dateArray.push('');
        adprofitChartData.valueArray.push(null);
    }

    // CANVAS TAG 생성
    static createChartTag() {
        const chartBox = document.querySelector('.profit-chart-content');
        chartBox.innerHTML = `<canvas id="index-profit-chart" style="height:${Logic.setChartHeight()}px;"></canvas>`;
    }

    // WINDOW WIDTH 에 맞춰서 CANVAS HEIGHT 지정
    static setChartHeight() {
        if(window.innerWidth <= 500){
            return 200;
        }else if(window.innerWidth <= 960){
            return 300;
        }else {
            return 500;
        }
    }

    // 공지사항 DATA 비동기통신
    static noticeData() {
        const promiseResult = Communication.getPromise(communicationURL.notice);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);

            // 공지사항 RENDER 함수 호출
            Dynamic.noticeRender(resultData.noticeList);
            promiseProxy.resolveCount++;
        }, () => {
            promiseProxy.rejectCount++;
        })
    }

    // FAQ DATA 비동기통신
    static faqData() {
        const promiseResult = Communication.getPromise(communicationURL.faq);

        promiseResult.then((result) => {
            const resultData = JSON.parse(result);

            // FAQ RENDER 함수 호출
            Dynamic.faqRender(resultData.faqList);
            promiseProxy.resolveCount++;
        }, ()=>{
            promiseProxy.rejectCount++;
        })
    }

    // GAME DATA 비동기통신
    static gameData() {
        const promiseResult = Communication.getPromise(communicationURL.game);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);

            // GAME RENDER 함수 호출
            Dynamic.gameRender(resultData);
            promiseProxy.resolveCount++;
        }, () => {
            promiseProxy.rejectCount++;
        })
    }

    // USER BLOCK 유무 비동기통신
    static userBlockInfoData() {
        const promiseResult = Communication.getPromise(communicationURL.block);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);

            // BLOCK DATA가 있고 다시보지않기에 등록되어있지 않으면
            if( Logic.checkBlock(resultData) && Logic.checkCookie(resultData.trademark) ) {
                Dynamic.renderBlockInfoModal(resultData);
            }
            promiseProxy.resolveCount++;
        }, () => {
            promiseProxy.rejectCount++;
        })
    }

    // BLOCK DATA가 빈객체인지 판단
    static checkBlock(object) {
        return Object.keys(object).length === 0 ? false : true;
    }

    // 현재 사용자가 다시보지않기에 등록되었는지 유무 판단
    static checkCookie(userId) {
        const cookieNameArray = Logic.getCookieName();

        for(const el of cookieNameArray) {
            if( el.toUpperCase() === userId.toUpperCase() ) {
                return false;
            }
        }
        return true;
    }

    // COOKY에 등록된 유저 목록을 배열 형태로 반환
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

    // 3일(72H) 후 시간을 계산하여 UTC String으로 반환
    static calcAfterThreeDays() {
        const nowDate = Date.now();
        const threeDaysMilliSecond = 259200000;
        const afterThreeDate = new Date(nowDate + threeDaysMilliSecond);

        return afterThreeDate.toUTCString();
    }
}

class EventLogic {

    // WINDOW WIDTH에 맞는 CHART HEIGHT 값을 찾아 CHART UPDATE
    static chartResize() {
        const chartHeight = Logic.setChartHeight();
        const chartTag = document.getElementById("index-profit-chart");
        chartTag.style.height = chartHeight+'px';
        chartObject.myChart.update();
    }

    // BLOCK MODAL BACKGROUND HEIGHT를 BODY HEIGHT와 동일하게 설정
    static modalHeightResize() {
        const modalBackground = document.querySelector('.modal-backgruond');
        const windowHeight = window.innerHeight;
        const bodyHeight = document.querySelector('body').offsetHeight;
        modalBackground.style.height = windowHeight >= bodyHeight ? windowHeight : bodyHeight + 'px';
    }

    // 현재 사용자를 3일 후 만기되는 쿠키 등록 후 MODAL CLOSE
    static pauseBlockModal(e) {
        const userId = e.target.dataset.id;
        const expireDate = Logic.calcAfterThreeDays();
        document.cookie = `${userId}=${userId};expires=${expireDate}`;
        EventLogic.closeModal();
    }

    // MODAL CLOSE CLICK -> REMOVE MODAL
    static closeModal() {
        const modalBackground = document.querySelector('.modal-backgruond');
        const modal = document.querySelector('.modal-box');

        modalBackground.remove();
        modal.remove();
    }

}

export { Logic, currentDate, EventLogic };