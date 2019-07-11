import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindListButtonClickEvent();
        EventList.bindDeleteButtonClickEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindListButtonClickEvent() {
        const listBtn = document.querySelector('.list-btn');
        listBtn.addEventListener('click', function() {
            window.history.back();
        });
    }

    static bindDeleteButtonClickEvent() {
        const deleteButton = document.querySelector('.btn-del');
        if( deleteButton !== null ) {
            deleteButton.addEventListener('click', EventLogic.deleteContent);
        }
    }
}

export { Init, Dynamic };