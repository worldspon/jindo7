import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindSendMailEvent();
        EventList.bindInputEnterEvent();
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

    static bindInputEnterEvent() {
        const inputBox = document.querySelector('.smart-id');

        inputBox.addEventListener('keydown', (e) => {
            if( e.keyCode === 13 ) {
                const sendButton = document.querySelector('.send-email');
                sendButton.dispatchEvent(new Event('click'));
            }
        })
    }
}

export { Init, Dynamic };