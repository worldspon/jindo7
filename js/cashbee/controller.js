import { View } from './view.js';
import { EventLogic } from './model.js';

class Init {
    static bindEvent() {
        EventList.bindSubMenuClickEvent();
    }

    static firstCommunication() {
        EventLogic.getLockPointData();
    }
}

class Dynamic {
    static createCashbeeSearchBox() {
        View.createCashbeeSearchBox();
    }
    static createCashbeeList(data) {
        View.createCashbeeList(data);
    }

    static createLockPointList(data) {
        View.createLockPointList(data);
    }
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindSubMenuClickEvent() {
        const subMenuButton = document.querySelectorAll('.distribute-content-box > button');

        for(const button of subMenuButton) {
            button.addEventListener('click', EventLogic.subMenuColorChange);
        }
    }
    
    static bindCashbeeSearchEvent() {
        const searchButton = document.querySelector('.btn-search-id');

        searchButton.addEventListener('click', EventLogic.cashbeeSearch);
    }

    static bindSearchInputEnterEvent() {
        const searchInput = document.getElementById('personal-id');

        searchInput.addEventListener('keydown', (e) => {
            if( e.keyCode === 13 ) {
                const searchButton = document.querySelector('.btn-search-id');
                searchButton.dispatchEvent(new Event('click'));
            }
        })
    }

    static bindLockPointClearEvent() {
        const clearButton = document.querySelectorAll('.btn-point-confirm');

        for(const button of clearButton) {
            button.addEventListener('click', EventLogic.lockPointClear);
        }
    }
}

export { Init, Dynamic, EventList };