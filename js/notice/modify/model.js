import { Dynamic } from './controller.js';

const communicationURL = 'http://192.168.0.24:8080/notice/modify';

class Communication {
    static postPromise(url, sendObject) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(sendObject));
        });
    }
}

class EventLogic {
    static modifyContent() {
        const sendObject = {
            id : document.querySelector('.notice-editor-title').dataset.id,
            type : document.querySelector('.notice-editor-tab').selectedOptions[0].value,
            title : document.querySelector('.edit-title').value,
            content : document.querySelector('#summernote').value
        }
    
        const sendResult = Communication.postPromise(communicationURL, sendObject);
        sendResult.then((result) => {
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                Dynamic.catchError(resultData.msg);
                // window.location.href = 'http://worldspon.net/notice/0/ALL/';
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError(`서버와 통신에 실패했습니다. 다시 시도해주세요.`);
        })
    }
}

export { EventLogic };