import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {

    // 이벤트 바인딩
    static bindEvent() {
        EventList.bindHistoryBack();
        EventList.bindModifyEvent();
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
    static bindModifyEvent() {
        const registerButton = document.querySelector('.btn-writing');
        registerButton.addEventListener('click', EventLogic.modifyEvent);
    }
}

export { Init, Dynamic };