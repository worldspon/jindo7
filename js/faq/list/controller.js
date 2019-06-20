import { View } from './view.js';
import { EventLogic } from './model.js';

class Init {
    static bindEvent() {
        EventList.bindSearchClickEvent();
        EventList.bindSearchEnterEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    // 검색 클릭 이벤트 등록
    static bindSearchClickEvent() {
        const searchBtn = document.querySelector('.faq-search-btn');
        searchBtn.addEventListener('click', EventLogic.searchClickEvent);
    }

    // input box enter 입력시 click 이벤트
    static bindSearchEnterEvent() {
        const searchInput = document.querySelector('.faq-search-input');
        searchInput.addEventListener('keyup', EventLogic.searchEnterEvent);
    }

    // 등록 이벤트
    static bindRegisterEvent() {
        const regButton = document.querySelector('.btn-add-faq');
        regButton.addEventListener('click', EventLogic.registerEvent);
    }
}

export { Init, Dynamic, EventList };