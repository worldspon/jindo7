import { Dynamic } from './controller.js';

const sendObject = {
    id : null,
    question : null,
	answer : null
};

class Communication {
    static asyncPostPromise(data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://192.168.0.24:8080/faq/modify');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(data));
        });
    }
}

class Handler {

    // 내용 null check
    static checkNull() {
        const contentId = document.querySelector('.faq-mod-writing-title-box').dataset.id;
        const title = document.querySelector('.faq-mod-writing-title').value.trim();
        const content = document.querySelector('.faq-mod-writing-content').value.trim();

        if(title !== '' && content !== '') {
            Handler.createSendObject(contentId, title, content);
            return true;
        } else {
            Dynamic.catchError('내용을 전부 입력해주세요.');
            return false;
        }
    }

    static getPromiseResult() {
        const promiseResult = Communication.asyncPostPromise(sendObject);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                Dynamic.catchError(resultData.msg);
                window.location.href = 'http://127.0.0.1:8887/faq.html';
            } else {
                Dynamic.catchError(resultData.msg);
            }
        })
    }

    // send object 변경
    static createSendObject(contentId, title, content) {
        sendObject.id = contentId;
        sendObject.question = title;
        sendObject.answer = content;
        console.log(sendObject);
    }
    
    static confirmModify() {
        return confirm('정말로 수정하시겠습니까?') ? true : false;
    }
}

class EventLogic {
    static modifyEvent() {
        if(Handler.checkNull() && Handler.confirmModify()) {
            Handler.getPromiseResult();
        }
    }
}

export { EventLogic };