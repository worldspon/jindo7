import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {

    // 이벤트 바인딩
    static bindEvent() {
        EventList.bindHistoryBack();
        EventList.bindRegisterEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindHistoryBack() {
        const cancelButton = document.querySelector('.btn-cancel');
        cancelButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    // 등록 이벤트 바인딩
    static bindRegisterEvent() {
        const registerButton = document.querySelector('.btn-writing');
        registerButton.addEventListener('click', EventLogic.registerEvent);
    }
}

export { Init, Dynamic };