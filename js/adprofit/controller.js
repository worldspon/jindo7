import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {

    // 광고수익금 데이터 통신 호출
    static initCommunication() {
        EventLogic.getAdprofitData();
    }
}

class Dynamic {

    // 광고수익금 RENDER 함수 호출
    static topAdprofitText(data) {
        View.renderTopAdprofitText(data)
    }

    // SELECT BOX RENDER 함수 호출
    static setSelectBox(data) {
        View.renderSelectBox(data);
    }

    // LINE CHART RENDER 함수 호출
    static setLineChart(firstChartData, lastChartData, labelArray) {
        View.renderLineChart(firstChartData, lastChartData, labelArray);
    }

    // BAR CHART RENDER 함수 호출
    static setBarChart(barChartData) {
        View.renderBarChart(barChartData);
    }

    // 수익비교 RENDER 함수 호출
    static setComparisonBox(comparisonData) {
        View.renderComparisonBox(comparisonData);
    }

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    
    // WINDOW RESIZE -> CHART HEIGHT RESIZE EVENT BIND
    static bindWindowResizeEvent() {
        window.addEventListener('resize', EventLogic.windowResizeEvent);
    }

    // SELECT BOX CHANGE -> PROFIT, CHART DATA CHANGE EVEVNT BIND
    static bindSelectBoxChangeEvent() {
        const selectBox = document.querySelectorAll('.data-select-box');

        for(const box of selectBox) {
            box.addEventListener('change', EventLogic.updateSelect);
        }
    }
}

export { Init, Dynamic, EventList };