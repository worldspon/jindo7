import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindHelpButtonClickEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindHelpButtonClickEvent() {
        const helpButton = document.querySelector('.btn-help');

        helpButton.addEventListener('click', EventLogic.helpButtonClickEvent);
    }
}

export { Init, Dynamic };