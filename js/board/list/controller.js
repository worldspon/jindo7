import { View } from './view.js';
import { EventLogic } from './model.js';

class Init {
    static bindEvent() {
        EventList.bindSearchButtonClickEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindSearchButtonClickEvent() {
        const searchButton = document.querySelector('.search-btn');

        searchButton.addEventListener('click', EventLogic.searchEvent);
    }

    static bindSearchInputEnterEvent() {
        const searchInput = document.querySelector('.search-input');

        searchInput.addEventListener('keydown', EventLogic.inputEnterEvent);
    }
}

export { Init, Dynamic };