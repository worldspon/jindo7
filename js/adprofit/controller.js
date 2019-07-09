import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static initCommunication() {
        EventLogic.getAdprofitData();
    }
}

class Dynamic {
    static topAdprofitText(data) {
        View.renderTopAdprofitText(data)
    }

    static setSelectBox(data) {
        View.renderSelectBox(data);
    }

    static setLineChart(firstChartData, lastChartData, labelArray) {
        View.renderLineChart(firstChartData, lastChartData, labelArray);
    }

    static setBarChart(barChartData) {
        View.renderBarChart(barChartData);
    }

    static setComparisonBox(comparisonData) {
        View.renderComparisonBox(comparisonData);
    }
}

class EventList {
    static bindSelectBoxChangeEvent() {
        const selectBox = document.querySelectorAll('.data-select-box');

        for(const box of selectBox) {
            box.addEventListener('change', EventLogic.updateSelect);
        }
    }

    static bindWindowResizeEvent() {
        window.addEventListener('resize', EventLogic.windowResizeEvent);
    }
}

export { Init, Dynamic, EventList };