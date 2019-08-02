import { Dynamic } from './controller.js';

const sendObject = {
    id : null
}

class Communication {
    static postPromise(data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/faq/delete');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(data));
        })
    }
}

class Handler {

    static getPromiseResult() {
        const promiseResult = Communication.postPromise(sendObject);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                Dynamic.catchError(resultData.msg);
                window.location.href = '/faq';
            } else {
                Dynamic.catchError(resultData.msg);
            }
        })
    }
    
    static confirmDelete() {
        return confirm('정말로 삭제하시겠습니까?') ? true : false;
    }
}

class EventLogic {
    static deleteEvent() {
        if(Handler.confirmDelete()) {
            const contentId = document.querySelector('.faq-content-title').dataset.id;
            sendObject.id = contentId;
            Handler.getPromiseResult();
        }
    }
}

export { EventLogic };