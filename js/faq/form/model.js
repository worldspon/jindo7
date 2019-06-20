import { Dynamic } from './controller.js';

const sendObject = {
    question : null,
	answer : null
};

class Communication {
    static asyncPostPromise(data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://192.168.0.24:8080/faq/write');
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
        const title = document.querySelector('.faq-writing-title').value.trim();
        const content = document.querySelector('.faq-writing-content').value.trim();

        if(title !== '' && content !== '') {
            Handler.createSendObject(title, content);
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
    static createSendObject(title, content) {
        sendObject.question = title;
        sendObject.answer = content;
    }
    
    static confirmRegister() {
        return confirm('정말로 등록하시겠습니까?') ? true : false;
    }
}

class EventLogic {
    static registerEvent() {
        if(Handler.checkNull() && Handler.confirmRegister()) {
            Handler.getPromiseResult();
        }
    }
}

export { EventLogic };