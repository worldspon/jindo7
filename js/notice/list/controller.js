import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindSearchButtonClickEvent();
        EventList.bindSearchInputKeyEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindSearchButtonClickEvent() {
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.addEventListener('click', EventLogic.searchButtonClickEvent);
    }

    static bindSearchInputKeyEvent() {
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('keydown', EventLogic.searchInputKeyEvent);
    }
}

export { Init, Dynamic };