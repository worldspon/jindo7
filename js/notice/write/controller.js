import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static createSummerNote() {
        $('#summernote').summernote({
            fontSize : 40,
            placeholder: '내용을 입력해주시기 바랍니다.',
            tabsize: 2,
            height: 700
        });
        $('#summernote').summernote('fontSize', 18);
    }

    static bindEvent() {
        EventList.bindWriteButtonClickEvent();
        EventList.bindCancelButtonClickEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindWriteButtonClickEvent() {
        const writeButton = document.querySelector('.btn-gogo');
        writeButton.addEventListener('click', EventLogic.writeButtonClickEvent);
    }

    static bindCancelButtonClickEvent() {
        const cancelButton = document.querySelector('.btn-back');
        cancelButton.addEventListener('click', () => {
            window.history.back();
        })
    }
}

export { Init, Dynamic };