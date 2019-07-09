import { Dynamic, EventList } from './controller.js';
import { chart } from './view.js';

let parseJSONData;

// 현재 차트가 표현하는 일자
const currentDate = {
    year : new Date().getFullYear(),
    month : new Date().getMonth()+1,
    day : new Date().getDate()
}
const communicationURL = 'http://192.168.0.24:8081/adprofit/fetch';

const firstChartData = {
    mobileLabel : [],
    mobileValue : [],
    tabletLabel : [],
    tabletValue : [],
    pcLabel : [],
    pcValue : []
};

const lastChartData = {
    mobileLabel : [],
    mobileValue : [],
    tabletLabel : [],
    tabletValue : [],
    pcLabel : [],
    pcValue : []
};

const labelArray = {
    mobile : [],
    tablet : [],
    pc : []
}

class Communication {
    static getPromise(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
          });
    }
}

class EventLogic {
    static getAdprofitData() {
        const promiseResult = Communication.getPromise(communicationURL);

        promiseResult.then((data)=>{
            parseJSONData = JSON.parse(data);
            EventLogic.setTopAdprofitData();
            EventLogic.setSelectBoxData();
            EventLogic.setLineChartData();
            EventLogic.setBarChartData();
            EventLogic.setComparisonData();
            EventList.bindSelectBoxChangeEvent();
        }, () => {
            console.log('err');
        });
    }

    static setTopAdprofitData() {
        const profitData = {
            month : currentDate.month,
            monthTotalProfit : 0, 
            monthDeductionProfit : 0,
            monthPureProfit : 0
        };

        const renderAdprofitData = parseJSONData.ad[currentDate.year][currentDate.month];

        for(const dailyProfit of renderAdprofitData.dailyprofit) {
            profitData.monthTotalProfit += dailyProfit;
        }
        for(const deduction of renderAdprofitData.deduction) {
            profitData.monthDeductionProfit += deduction;
        }
        profitData.monthPureProfit = profitData.monthTotalProfit - profitData.monthDeductionProfit;

        Dynamic.topAdprofitText(profitData);
    }

    static setSelectBoxData(lastSelectBoxSelected = {year : 'select', month : null}) {
        const selectBoxData = {
            month : currentDate.month,
            firstSelectBox : null,
            lastSelectBox : null
        };
        let selectBoxHTML = ``;

        for(const year of parseJSONData.year) {
            for(const month of parseJSONData.month[year]) {
                if( !(lastSelectBoxSelected.year === year && lastSelectBoxSelected.month === month) ) {
                    selectBoxHTML += 
                `<option ${(year === currentDate.year && month === currentDate.month) ? 'style="display:none;" selected="selected"' : ''} data-year="${year}" data-month="${month}">${year}-${(month > 9 ? month : '0'+month)}</option>`;
                }
            }
        }
        selectBoxData.firstSelectBox = selectBoxHTML;

        selectBoxHTML = 
        `<option value="select" ${lastSelectBoxSelected.year === 'select' ? 'style="display:none;" selected="selected"' : ''}>select</option>`;
        for(const year of parseJSONData.year) {
            for(const month of parseJSONData.month[year]) {
                if( !(year === currentDate.year && month === currentDate.month) )
                {
                    selectBoxHTML += 
                    `<option ${lastSelectBoxSelected.year === year && lastSelectBoxSelected.month === month ? 'style="display:none;" selected="selected"' : ''} data-year="${year}" data-month="${month}">${year}-${(month > 9 ? month : '0'+month)}</option>`;
                }
            }
        }
        selectBoxData.lastSelectBox = selectBoxHTML;

        Dynamic.setSelectBox(selectBoxData);
    }

    static setLineChartData(lastSelectBoxSelected = {year : 'select', month : null}) {
        for(const key in firstChartData) {
            firstChartData[key] = [];
        }

        for(const key in lastChartData) {
            lastChartData[key] = [];
        }

        for(const key in labelArray) {
            labelArray[key] = [];
        }

        const dailyProfitData = parseJSONData.ad[currentDate.year][currentDate.month].dailyprofit;
        const deductionProfitData = parseJSONData.ad[currentDate.year][currentDate.month].deduction;

        if( currentDate.month === new Date().getMonth()+1) {
            dailyProfitData.length = new Date().getDate();
            deductionProfitData.length = new Date().getDate();
        }

        // MOBILE
        for(const [index, value] of dailyProfitData.entries()) {
            if( ( index === 0 )||( index % 5 === 4 ) && index <= 25 ){
                firstChartData.mobileValue.push((value - deductionProfitData[index]).toFixed(2));
            }
        }
        for( let index = 0; index < dailyProfitData.length; index++ ) {
            if( ( index === 0 )||( index % 5 === 4 ) && index <= 25 ){
                firstChartData.mobileLabel.push(`${index+1}일`);
            }
        }
        firstChartData.mobileLabel.length = firstChartData.mobileValue.length;

        // TABLET
        for(const [index, value] of dailyProfitData.entries()) {
            if( ( index === 0 ) || ( index % 3 === 2 ) && index <= 27 ){
                firstChartData.tabletValue.push((value - deductionProfitData[index]).toFixed(2));
            }
        }
        for( let index = 0; index < dailyProfitData.length; index++ ) {
            if( ( index === 0 ) || ( index % 3 === 2 ) && index <= 27 ){
                firstChartData.tabletLabel.push(`${index+1}일`);
            }
        }
        firstChartData.tabletLabel.length = firstChartData.tabletValue.length;

        // PC
        for(const [index, value] of dailyProfitData.entries()) {
            firstChartData.pcValue.push((value - deductionProfitData[index]).toFixed(2));
        }
        for( let index = 0; index < firstChartData.pcValue.length; index++ ) {
            firstChartData.pcLabel.push(`${index+1}일`);
        }

        firstChartData.mobileLabel.unshift('');
        firstChartData.mobileLabel.push('');
        firstChartData.tabletLabel.unshift('');
        firstChartData.tabletLabel.push('');
        firstChartData.pcLabel.unshift('');
        firstChartData.pcLabel.push('');
        firstChartData.mobileValue.unshift(null);
        firstChartData.mobileValue.push(null);
        firstChartData.tabletValue.unshift(null);
        firstChartData.tabletValue.push(null);
        firstChartData.pcValue.unshift(null);
        firstChartData.pcValue.push(null);

        if(lastSelectBoxSelected.year !== 'select') {
            const lastDailyprofitArray = parseJSONData.ad[lastSelectBoxSelected.year][lastSelectBoxSelected.month].dailyprofit;
            const lastDeductionArray = parseJSONData.ad[lastSelectBoxSelected.year][lastSelectBoxSelected.month].deduction;

            if( lastSelectBoxSelected.month === new Date().getMonth()+1) {
                lastDailyprofitArray.length = new Date().getDate();
                lastDeductionArray.length = new Date().getDate();
            }

            // MOBILE
            for(const [index, value] of lastDailyprofitArray.entries()) {
                if( ( index === 0 )||( index % 5 === 4 ) && index <= 25 ){
                    lastChartData.mobileValue.push((value - lastDeductionArray[index]).toFixed(2));
                }
            }
            for( let index = 0; index < lastDailyprofitArray.length; index++ ) {
                if( ( index === 0 )||( index % 5 === 4 ) && index <= 25 ){
                    lastChartData.mobileLabel.push(`${index+1}일`);
                }
            }
            lastChartData.mobileLabel.length = lastChartData.mobileValue.length;

            // TABLET
            for(const [index, value] of lastDailyprofitArray.entries()) {
                if( ( index === 0 ) || ( index % 3 === 2 ) && index <= 27 ){
                    lastChartData.tabletValue.push((value - lastDeductionArray[index]).toFixed(2));
                }
            }
            for( let index = 0; index < lastDailyprofitArray.length; index++ ) {
                if( ( index === 0 ) || ( index % 3 === 2 ) && index <= 27 ){
                    lastChartData.tabletLabel.push(`${index+1}일`);
                }
            }
            lastChartData.tabletLabel.length = lastChartData.tabletValue.length;

            // PC
            for(const [index, value] of lastDailyprofitArray.entries()) {
                lastChartData.pcValue.push((value - lastDeductionArray[index]).toFixed(2));
            }
            for( let index = 0; index < lastChartData.pcValue.length; index++ ) {
                lastChartData.pcLabel.push(`${index+1}일`);
            }

            lastChartData.mobileLabel.unshift('');
            lastChartData.mobileLabel.push('');
            lastChartData.tabletLabel.unshift('');
            lastChartData.tabletLabel.push('');
            lastChartData.pcLabel.unshift('');
            lastChartData.pcLabel.push('');
            lastChartData.mobileValue.unshift(null);
            lastChartData.mobileValue.push(null);
            lastChartData.tabletValue.unshift(null);
            lastChartData.tabletValue.push(null);
            lastChartData.pcValue.unshift(null);
            lastChartData.pcValue.push(null);
        }


        labelArray.mobile = firstChartData.mobileLabel.length >= lastChartData.mobileLabel.length ? firstChartData.mobileLabel : lastChartData.mobileLabel;

        labelArray.tablet = firstChartData.tabletLabel.length >= lastChartData.tabletLabel.length ? firstChartData.tabletLabel : lastChartData.tabletLabel;

        labelArray.pc = firstChartData.pcLabel.length >= lastChartData.pcLabel.length ? firstChartData.pcLabel : lastChartData.pcLabel;

        Dynamic.setLineChart(firstChartData, lastChartData, labelArray);
    }

    static updateSelect() {
        const firstSelectBoxOptions = document.querySelectorAll('.data-select-box')[0].childNodes;
        const lastSelectBoxOptions = document.querySelectorAll('.data-select-box')[1].childNodes;
        const lastSelectBoxSelected = {
            year : 'select', 
            month : null
        }

        for(const option of firstSelectBoxOptions) {
            if(option.selected === true) {
                currentDate.year = parseInt(option.dataset.year);
                currentDate.month = parseInt(option.dataset.month);
            }
        }

        for(const option of lastSelectBoxOptions) {
            if(option.selected === true && option.value !== 'select') {
                lastSelectBoxSelected.year = parseInt(option.dataset.year);
                lastSelectBoxSelected.month = parseInt(option.dataset.month);
            }
        }

        EventLogic.setTopAdprofitData();
        EventLogic.setSelectBoxData(lastSelectBoxSelected);
        EventLogic.setLineChartData(lastSelectBoxSelected);
    }

    static setBarChartData() {
        const barChartObject = {
            thisMonth : 0,
            lastMonth : 0,
            twoAgoMonth : 0
        };

        const nowYear = new Date().getFullYear();
        const nowMonth = new Date().getMonth()+1;

        for(const [index, value] of parseJSONData.ad[nowYear][nowMonth].dailyprofit.entries()) {
            barChartObject.thisMonth += value-parseJSONData.ad[nowYear][nowMonth].deduction[index];
        }

        if(nowMonth === 2) {
            for(const [index, value] of parseJSONData.ad[nowYear][nowMonth-1].dailyprofit.entries()) {
                barChartObject.lastMonth += value-parseJSONData.ad[nowYear][nowMonth-1].deduction[index];
            }

            for(const [index, value] of parseJSONData.ad[nowYear-1][12].dailyprofit.entries()) {
                barChartObject.twoAgoMonth += value-parseJSONData.ad[nowYear-1][12].deduction[index];
            }
        } else if(nowMonth === 1) {
            for(const [index, value] of parseJSONData.ad[nowYear-1][12].dailyprofit.entries()) {
                barChartObject.lastMonth += value-parseJSONData.ad[nowYear][12].deduction[index];
            }

            for(const [index, value] of parseJSONData.ad[nowYear-1][11].dailyprofit.entries()) {
                barChartObject.twoAgoMonth += value-parseJSONData.ad[nowYear-1][11].deduction[index];
            }
        } else {
            for(const [index, value] of parseJSONData.ad[nowYear][nowMonth-1].dailyprofit.entries()) {
                barChartObject.lastMonth += value-parseJSONData.ad[nowYear][nowMonth-1].deduction[index];
            }

            for(const [index, value] of parseJSONData.ad[nowYear][nowMonth-2].dailyprofit.entries()) {
                barChartObject.twoAgoMonth += value-parseJSONData.ad[nowYear][nowMonth-2].deduction[index];
            }
        }

        for(const key in barChartObject) {
            barChartObject[key] = barChartObject[key].toFixed(2);
        }

        Dynamic.setBarChart(barChartObject);
    }

    static setComparisonData() {
        const comparisonData = {
            maxThisMonth : 0,
            minThisMonth : 0,
            avgThisMonth : 0,
            maxAvgProfit : 0,
            minAvgProfit : 0,
            avgProfit : 0
        };

        let monthCount = 0;

        for(const year of parseJSONData.year) {
            for(const month of parseJSONData.month[year]) {
                monthCount++;
                const tempArray = [];
                for(let index = 0; index < parseJSONData.ad[year][month].dailyprofit.length; index++) {
                    tempArray.push(parseJSONData.ad[year][month].dailyprofit[index] - parseJSONData.ad[year][month].deduction[index]);
                }
                comparisonData.maxAvgProfit += Math.max(...tempArray);
                comparisonData.minAvgProfit += Math.min(...tempArray);

                let profitSum = 0;
                for(const profit of tempArray) {
                    profitSum += profit;
                }
                comparisonData.avgProfit += profitSum/tempArray.length;

                if( month === new Date().getMonth()+1 ) {
                    comparisonData.maxThisMonth = Math.max(...tempArray).toFixed(2);
                    comparisonData.minThisMonth = Math.min(...tempArray).toFixed(2);
                    comparisonData.avgThisMonth = (profitSum/tempArray.length).toFixed(2);
                }
            }
        }

        comparisonData.maxAvgProfit = (comparisonData.maxAvgProfit / monthCount).toFixed(2);
        comparisonData.minAvgProfit = (comparisonData.minAvgProfit / monthCount).toFixed(2);
        comparisonData.avgProfit = (comparisonData.avgProfit / monthCount).toFixed(2);
        
        Dynamic.setComparisonBox(comparisonData);
    }

    static windowResizeEvent() {
        const chartBox = document.getElementById('ad-profit-chart');

        if(window.innerWidth <= 500 ){
            chartBox.style.height = '200px';
            chart.data.labels = labelArray.mobile;
            chart.data.datasets[0].data = firstChartData.mobileValue;
            chart.data.datasets[1].data = lastChartData.mobileValue;
            chart.update();
        }else if(window.innerWidth <= 960 ){
            chartBox.style.height = '300px';
            chart.data.labels = labelArray.tablet;
            chart.data.datasets[0].data = firstChartData.tabletValue;
            chart.data.datasets[1].data = lastChartData.tabletValue;
            chart.update();
        }else {
            chartBox.style.height = '500px';
            chart.data.labels = labelArray.pc;
            chart.data.datasets[0].data = firstChartData.pcValue;
            chart.data.datasets[1].data = lastChartData.pcValue;
            chart.update();
        }
    }
}

export { EventLogic };