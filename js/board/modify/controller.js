import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindModifyButtonClickEnvet();
        EventList.bindCancelButtonClickEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg)
    }
}


class EventList {
    static bindModifyButtonClickEnvet() {
        const modifyButton = document.querySelector('.btn-writing');

        modifyButton.addEventListener('click', EventLogic.modifyBoard);
    }

    static bindCancelButtonClickEvent() {
        const cancelButton = document.querySelector('.btn-cancel');

        cancelButton.addEventListener('click', () => {
            window.history.back();
        });
    }
}

export { Init, Dynamic };