import { Dynamic, EventList } from "./controller.js";

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

// 신규 답변 객체
class newAnswerObject {
    constructor(qid, text) {
        return {
            questionId : qid,
            content : text
        }
    }
}

// 수정 답변 객체
class modifyAnswerObject {
    constructor(qid, aid, text) {
        return {
            questionId : qid,
            id : aid,
            content : text
        }
    }
}

// 삭제 답변 객체
class deleteAnswerObject {
    constructor(aid) {
        return {
            id : aid
        }
    }
}

class Handler {
    // 등록 길이체크 및 사용자확인
    static confirmRegister() {
        const answerLength = document.querySelector('.note-editable').textContent.trim().length;
        if(answerLength <= 0) {
            Dynamic.catchError('내용을 입력해주세요.');
            return false;
        }
        if(confirm('이 답변을 등록하시겠습니까?')) {
            return true;
        } else {
            return false;
        }
    }
}

class EventLogic {
    // 신규등록 서버 송신
    static registerAnswerSend() {
        if(Handler.confirmRegister()) {
            const qid = document.querySelector('.myq-content-title').dataset.id;
            const answerContent = document.querySelector('.note-editable').innerHTML;
    
            const sendObject = new newAnswerObject(qid, answerContent);
            const promiseResult = Communication.asyncPromise('http://192.168.0.24:8080/myQ/answers/create', sendObject);
            promiseResult.then((result)=>{
                const resultData = JSON.parse(result);
                if(resultData.errorCode === 0) {
                    Dynamic.catchError(resultData.msg);
                    window.location.reload();
                } else {
                    Dynamic.catchError(resultData.msg);
                }
            },()=>{
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            });
        }
    }

    // 수정버튼 클릭시 summernote toggle
    static toggleAnswerEditor(e) {
        const answerText = e.target.parentNode.previousSibling.previousSibling.innerHTML;
        if(e.target.innerText === '수정') {
            e.target.innerText = '취소';
            Dynamic.showAnswerEditor(answerText);
            EventList.bindModifyAnswerRegClickEvent();
        } else {
            e.target.innerText = '수정';
            Dynamic.hideAnswerEditor();
        }
    }

    // 수정 답변 서버 송신
    static modifyAnswerSend() {
        if(Handler.confirmRegister()){
            const qid = document.querySelector('.myq-content-title').dataset.id;
            const aid = document.querySelector('.myq-content-r').dataset.id;
            const answerContent = document.querySelector('.note-editable').innerHTML;
    
            const sendObject = new modifyAnswerObject(qid, aid, answerContent);
            const promiseResult = Communication.asyncPromise('http://192.168.0.24:8080/myQ/answers/modify', sendObject);
            promiseResult.then((result)=>{
                const resultData = JSON.parse(result);
                if(resultData.errorCode === 0) {
                    Dynamic.catchError(resultData.msg);
                    window.location.reload();
                } else {
                    Dynamic.catchError(resultData.msg);
                }
            },()=>{
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            });
        }
    }

    // 삭제 확인
    static confirmDelete() {
        if(confirm('정말로 삭제하시겠습니까?')) {
            EventLogic.deleteAnswerSend();
        }
    }

    // 답변삭제 서버 송신
    static deleteAnswerSend() {
        const aid = document.querySelector('.myq-content-title').dataset.id;
        const sendObject = new deleteAnswerObject(aid);
        const promiseResult = Communication.asyncPromise('http://192.168.0.24:8080/myQ/answers/delete', sendObject);
        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                Dynamic.catchError(resultData.msg);
                window.location.reload();
            } else {
                Dynamic.catchError(resultData.msg);
            }
        },()=>{
            Dynamic.catchError('서버와 통신이 원활하지않습니다.');
        });
    }
}

export { EventLogic };