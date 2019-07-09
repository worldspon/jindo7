import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindHistoryBackEvent();
        EventList.bindDeleteEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindHistoryBackEvent() {
        const listBtn = document.querySelector('.list-btn');
        listBtn.addEventListener('click', ()=>{
            window.location.href = '/faq';
        });
    }

    static bindDeleteEvent() {
        const deleteButton = document.querySelector('.delete-btn');
        deleteButton.addEventListener('click', EventLogic.deleteEvent);
    }
}

export { Init, Dynamic };