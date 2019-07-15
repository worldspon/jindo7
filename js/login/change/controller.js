import { View } from './view.js';
import { EventLogic } from './model.js';

class Init {
    static bindEvent() {
        EventList.bindChangePasswordEvent();
        EventList.bindInputBoxEnterEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }

    static disabledButton(button) {
        View.disabledButton(button);
    }

    static ableButton(button) {
        View.ableButton(button);
    }

    static showSuccessDivision() {
        View.showSuccessDivision();
    }
}

class EventList {
    static bindChangePasswordEvent() {
        const changeButton = document.querySelector('.btn-change-pw');

        changeButton.addEventListener('click', EventLogic.changePassword);
    }

    static bindInputBoxEnterEvent() {
        const confirmInput = document.querySelector('.recheck-personal-pw');

        confirmInput.addEventListener('keydown', (e) => {
            if(e.keyCode === 13) {
                const changeButton = document.querySelector('.btn-change-pw');
                changeButton.dispatchEvent(new Event('click'));
            }
        })
    }
}

export { Init, Dynamic, EventList };