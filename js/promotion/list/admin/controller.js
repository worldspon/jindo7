import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindStateChange();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {

    // 한줄광고 상태변경 EVENT BIND
    static bindStateChange() {
        const changeButton = document.querySelectorAll('.check-confirm');

        for(const button of changeButton) {
            button.addEventListener('click', EventLogic.stateChange);
        }
    }
}

export { Init, Dynamic, EventList };