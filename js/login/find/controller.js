import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindSendMailEvent();
    }
}

class Dynamic {

    static catchError(msg) {
        View.viewAlert(msg);
    }

    static disabledButton(button) {
        View.disabledButton(button);
    }

    static abledButton(button) {
        View.abledButton(button);
    }

    static showSuccessBox(email) {
        View.showSuccessBox(email);
    }
    
}

class EventList {
    static bindSendMailEvent() {
        const sendButton = document.querySelector('.send-email');

        sendButton.addEventListener('click', EventLogic.sendMail);
    }
}

export { Init, Dynamic };