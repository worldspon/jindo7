import { Init,Handler } from './controller.js';

const communicationURL = {
    adprofit : 'http://192.168.0.24:8081/main/adprofit',
    notice : 'http://192.168.0.24:8081/main/notice',
    faq : 'http://192.168.0.24:8081/main/faq',
    game : 'http://192.168.0.24:8081/main/game'
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

        if(endPromise >= 4 && el.rejectCount >= 1) {
            setTimeout(()=>{
                Handler.catchError('서버와 통신이 원활하지않습니다.');
            },1000);
        }

        return true;
    }
});

class Communication {
    static asyncGetPromise(url) {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('GET',url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

    static setPromiseResult(type, url) {
        const promiseResult = this.asyncGetPromise(url);
        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            if(type === 'adprofit' && resultData.errorCode === 0) {
                AdprofitData.convertAdprofitMonthData(resultData);
                AdprofitChart.convertAdprofitChartData(resultData);
                Init.adProfitTextRender(adprofitMonthData);
                Init.adProfitChartRender(adprofitChartData);
                promiseProxy.resolveCount++;
            } else if(type === 'notice' && resultData.errorCode === 0) {
                Init.noticeRender(resultData.noticeList);
                promiseProxy.resolveCount++;
            } else if(type === 'faq' && resultData.errorCode === 0) {
                Init.faqRender(resultData.faqList);
                promiseProxy.resolveCount++;
            } else if(type === 'game') {
                Init.gameRender(resultData);
                promiseProxy.resolveCount++;
            } else {
                promiseProxy.rejectCount++;
            }
        }, ()=>{
            promiseProxy.rejectCount++;
        })
    }
}

class AdprofitData {

    // 상단 수익금 모델 형식으로 변환
    static convertAdprofitMonthData(resultData) {
        adprofitMonthData.currentMonth = this.currencyFormat(resultData.totalForecast);
        adprofitMonthData.prevMonth = this.currencyFormat(resultData.totalClosing);
        adprofitMonthData.comparePercentage = this.convertPercentage(resultData.totalClosing, resultData.totalForecast)
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
}

class AdprofitChart {

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

    // canvas tag 생성
    static createChartTag() {
        const chartBox = document.querySelector('.profit-chart-content');
        chartBox.innerHTML = `<canvas id='index-profit-chart' style='height:${this.setChartHeight()}px;'></canvas>`;
        return document.getElementById("index-profit-chart").getContext("2d");
    }

    // resize event bind
    static chartResizeEvent(chartObject) {
        window.addEventListener('resize', ()=>{
            const chartHeight = this.setChartHeight();
            const chartTag = document.getElementById("index-profit-chart");
            chartTag.style.height = chartHeight+'px';
            chartObject.update();
        });
    }
}

export { communicationURL, currentDate, Communication, AdprofitChart };