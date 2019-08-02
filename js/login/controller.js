import { Handler, EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static setWindowHeight() {
        EventLogic.resizeEvent();
    }

    static bindEvent() {
        EventList.bindResizeEvent();
        EventList.bindIdInputEvent();
        EventList.bindPwInputEvent();
        EventList.bindPwKeydownEvent();
        EventList.bindSubmitEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.showAlert(msg)
    }
}

class EventList {
    static bindResizeEvent() {
        window.addEventListener('resize', EventLogic.resizeEvent);
    }

    // ID INPUT EVENT -> CHECK LENGTH -> SHOW CHECK IMAGE
    static bindIdInputEvent() {
        const inputId = document.querySelector('.input-id');
        inputId.addEventListener('input', function() {
            View.showCheckImg(this, EventLogic.checkIdLength());
        });
    }

    // PASSWORD INPUT EVENT -> CHECK LENGTH -> SHOW CHECK IMAGE
    static bindPwInputEvent() {
        const inputPw = document.querySelector('.input-pw');
        inputPw.addEventListener('input', function() {
            View.showCheckImg(this, EventLogic.checkPasswordLength());
        });
    }

    // PASSWORD KEYDOWN EVENT -> CHECK CAPSLOCK -> SHOW TOOLTIP
    static bindPwKeydownEvent() {
        const inputPw = document.querySelector('.input-pw');
        inputPw.addEventListener('keydown', (event) => {
            View.showTooltipText(EventLogic.checkCapslock(event));

            if (event.keyCode == 13) {
                try {
                    document.querySelector('.submit-btn').dispatchEvent(new Event('click'));
                } catch (error) {
                    const event = document.createEvent('Event');
                    event.initEvent('click', true, true);
                    document.querySelector('.submit-btn').dispatchEvent(event);
                }
            } 
        })
    }

    // SUBMIT CLICK EVENT
    static bindSubmitEvent() {
        const submitButton = document.querySelector('.submit-btn');
        submitButton.addEventListener('click', function() {
            const msg = EventLogic.checkInputBox();
            if(msg === true) {
                Handler.loginPromiseStart();
            }else {
                Dynamic.catchError(msg);
            }
        });
    }
}


export { Init, Dynamic };