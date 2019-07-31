import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindSearchEvent();
        EventList.bindSearchEnterEvent();
        EventList.bindPromotionModify();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindSearchEvent() {
        const searchButton = document.querySelector('.search-btn');

        searchButton.addEventListener('click', EventLogic.searchEvent);
    }

    static bindSearchEnterEvent() {
        const searchInput = document.querySelector('.search-input');

        searchInput.addEventListener('keydown', EventLogic.searchEnterEvent);
    }

    static bindPromotionModify() {
        const promotionModifyButton = document.querySelectorAll('.adjust-check');

        for(const button of promotionModifyButton) {
            button.addEventListener('click', EventLogic.promotionModify);
        }
    }

    // 광고 내용 80자 제한 경고 EVENT BIND
    static bindCheckLength(target) {
        target.addEventListener('keydown', EventLogic.checkPromotionLength);
    }

}

export { Init, Dynamic, EventList };