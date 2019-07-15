import { Dynamic } from './controller.js';

const communicationURL = 'http://192.168.0.24:8080/find/password';

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
    static sendMail(e) {
        if( EventLogic.checkUserIdNull() ){
            Dynamic.disabledButton(e.target);
            const userId = document.querySelector('.smart-id').value.trim();
            const sendObject = {
                username : userId
            };

            const promiseResult = Communication.postPromise(communicationURL, sendObject);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result);

                if( resultData.errorCode === 0 ) {
                    Dynamic.showSuccessBox(resultData.msg);
                } else {
                    Dynamic.catchError(resultData.msg);
                    Dynamic.abledButton(e.target);
                    document.querySelector('.smart-id').focus();
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
                Dynamic.abledButton(e.target);
            })
        } else {
            Dynamic.catchError('아이디를 입력해주세요.');
        }
    }

    static checkUserIdNull() {
        const userId = document.querySelector('.smart-id').value.trim();

        return userId === '' ? false : true;
    }
}

export { EventLogic };