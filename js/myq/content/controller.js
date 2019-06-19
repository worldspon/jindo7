import{ View } from './view.js';
import { EventLogic } from './model.js';

class Init {
    static bindEventAnswerExist() {
        EventList.historyBack();
        EventList.bindModifyClickEvent();
        EventList.bindDeleteClickEvent();
    }

    static bindEventAnswerNoExist() {
        EventList.historyBack();
        $('#summernote').summernote({
            placeholder: '답변을 작성하세요.'
        });
        EventList.bindRegisterClickEvent();
    }
}

class Dynamic {
    static showAnswerEditor(answerText) {
        View.createAnswerEditor(answerText);
    }
    static hideAnswerEditor() {
        View.destroyAnswerEditor();
    }
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    // 목록 클릭시 뒤로가기 이벤트 등록
    static historyBack() {
        document.querySelector('.list-btn').addEventListener('click', ()=>{
            window.history.back();
        });
    }

    // 수정 버튼 클릭이벤트 등록
    static bindModifyClickEvent() {
        document.querySelector('.btn-myq-mod').addEventListener('click', EventLogic.toggleAnswerEditor);
    }
    // 수정한 답변 등록버튼 클릭이벤트 등록
    static bindModifyAnswerRegClickEvent() {
        document.querySelector('.btn-myq-confirm').addEventListener('click', EventLogic.modifyAnswerSend);
    }
    //삭제 버튼 클릭이벤트 등록
    static bindDeleteClickEvent() {
        document.querySelector('.btn-myq-del').addEventListener('click', EventLogic.confirmDelete);
    }

    // 신규 등록 클릭이벤트 등록
    static bindRegisterClickEvent() {
        document.querySelector('.btn-myq-confirm').addEventListener('click', EventLogic.registerAnswerSend);
    }
}


export { Init, Dynamic, EventList };