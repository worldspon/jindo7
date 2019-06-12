import View from './view.js';
import { newAnswerObject, modifyAnswerObject, deleteAnswerObject } from './model.js';

class Communication {
    static asyncPromise(url, sendObject) {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(sendObject));
        })
    }
}

class Handler {

    // 목록 클릭시 뒤로각 이벤트 등록
    static historyBack() {
        document.querySelector('.list-btn').addEventListener('click', ()=>{
            window.history.back();
        })
    }

    // 신규 등록 클릭이벤트 등록
    static bindRegisterClickEvent() {
        document.querySelector('.btn-myq-confirm').addEventListener('click', this.confirmRegister);
    }

    // 신규등록 확인
    static confirmRegister() {
        if(confirm('이 답변을 등록하시겠습니까?')) {
            Handler.registerAnswerSend();
        }
    }

    // 신규등록 서버 송신
    static registerAnswerSend() {
        const qid = document.querySelector('.myq-content-title').dataset.id;
        const answerContent = document.querySelector('.note-editable').innerHTML;

        const sendObject = new newAnswerObject(qid, answerContent);
        const promiseResult = Communication.asyncPromise('http://192.168.0.24:8080/myQ/answers/create', sendObject);
        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                View.viewAlert(resultData.msg);
                window.location.reload();
            } else {
                View.viewAlert(resultData.msg);
            }
        },()=>{
            View.viewAlert('서버와 통신이 원활하지않습니다.');
        });
    }

    // 수정 버튼 클릭이벤트 등록
    static bindModifyClickEvent() {
        document.querySelector('.btn-myq-mod').addEventListener('click', this.toggleAnswerEditor);
    }

    // 수정한 답변 등록버튼 클릭이벤트 등록
    static bindModifyAnswerRegClickEvent() {
        document.querySelector('.btn-myq-confirm').addEventListener('click', this.modifyAnswerSend);
    }

    // 수정 답변 서버 송신
    static modifyAnswerSend() {
        const qid = document.querySelector('.myq-content-title').dataset.id;
        const aid = document.querySelector('.myq-content-r').dataset.id;
        const answerContent = document.querySelector('.note-editable').innerHTML;

        const sendObject = new modifyAnswerObject(qid, aid, answerContent);
        const promiseResult = Communication.asyncPromise('http://192.168.0.24:8080/myQ/answers/modify', sendObject);
        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                View.viewAlert(resultData.msg);
                window.location.reload();
            } else {
                View.viewAlert(resultData.msg);
            }
        },()=>{
            View.viewAlert('서버와 통신이 원활하지않습니다.');
        });
    }

    // 수정버튼 클릭시 summernote toggle
    static toggleAnswerEditor(e) {
        const answerText = e.target.parentNode.previousSibling.previousSibling.innerHTML;
        if(e.target.innerText === '수정') {
            e.target.innerText = '취소';
            View.createAnswerEditor(answerText);
            Handler.bindModifyClickEvent();
            Handler.bindModifyAnswerRegClickEvent();
        } else {
            e.target.innerText = '수정';
            View.destroyAnswerEditor();
        }
    }

    //삭제 버튼 클릭이벤트 등록
    static bindDeleteClickEvent() {
        document.querySelector('.btn-myq-del').addEventListener('click', this.confirmDelete);
    }

    // 삭제 확인
    static confirmDelete() {
        if(confirm('정말로 삭제하시겠습니까?')) {
            Handler.deleteAnswerSend();
        }
    }

    // 답변삭제 서버 송신
    static deleteAnswerSend() {
        const aid = document.querySelector('.myq-content-r').dataset.id;
        const sendObject = new deleteAnswerObject(aid);
        const promiseResult = Communication.asyncPromise('http://192.168.0.24:8080/myQ/answers/delete', sendObject);
        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                View.viewAlert(resultData.msg);
                window.location.reload();
            } else {
                View.viewAlert(resultData.msg);
            }
        },()=>{
            View.viewAlert('서버와 통신이 원활하지않습니다.');
        });
    }
}

export default Handler;