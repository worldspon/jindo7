import { View } from './view.js';
import { EventLogic } from './model.js';


class Init {
    static createSummerNote() {
        $('#summernote').summernote({
            fontSize : 40,
            placeholder: '내용을 입력해주시기 바랍니다.',
            tabsize: 2,
            height: 700
        });
    }

    static bindEvent() {
        EvnetList.bindCancelButtonClickEvent();
        EvnetList.bindModifyButtonClickEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EvnetList {
    static bindCancelButtonClickEvent() {
        const cancelButton = document.querySelector('.btn-back');
        cancelButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    static bindModifyButtonClickEvent() {
        const modifyButton = document.querySelector('.btn-gogo');
        modifyButton.addEventListener('click', EventLogic.modifyContent);

    }
}

export { Init, Dynamic };