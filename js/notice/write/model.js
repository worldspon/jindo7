import { Dynamic } from './controller.js';

const communicationURL = '/notice/write';

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
    static writeButtonClickEvent() {
        const sendObject = {
            type : document.querySelector('.notice-editor-tab').selectedOptions[0].value,
            title : document.querySelector('.edit-title').value,
            content : document.querySelector('#summernote').value
        }

        const sendResult = Communication.postPromise(communicationURL, sendObject);
        sendResult.then((result) => {
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                Dynamic.catchError(resultData.msg);
                location.href = '/notice';
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError(`서버와 통신에 실패했습니다. 다시 시도해주세요.`);
        })
    }
}

export { EventLogic };