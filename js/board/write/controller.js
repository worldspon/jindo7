import { EventLogic } from './model.js';
import { View } from './/view.js';

class Init {
    static bindEvent() {
        EventList.bindWriteButtonClickEnvet();
        EventList.bindCancelButtonClickEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg)
    }
}


class EventList {
    static bindWriteButtonClickEnvet() {
        const writeButton = document.querySelector('.btn-writing');

        writeButton.addEventListener('click', EventLogic.writeBoard);
    }

    static bindCancelButtonClickEvent() {
        const cancelButton = document.querySelector('.btn-cancel');

        cancelButton.addEventListener('click', () => {
            window.history.back();
        });
    }
}

export { Init, Dynamic };