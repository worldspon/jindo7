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
                try {
                    sendButton.dispatchEvent(new Event('click'));
                } catch (error) {
                    const event = document.createEvent('Event');
                    event.initEvent('click', true, true);
                    sendButton.dispatchEvent(event);
                }
            }
        })
    }
}

export { Init, Dynamic };