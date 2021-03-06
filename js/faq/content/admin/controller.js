import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindDeleteEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindDeleteEvent() {
        const deleteButton = document.querySelector('.delete-btn');
        deleteButton.addEventListener('click', EventLogic.deleteEvent);
    }
}

export { Init, Dynamic };