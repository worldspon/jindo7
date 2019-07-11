import { Dynamic } from './controller.js';

const communicationURL = 'http://192.168.0.24:8080/myQ/directQ';

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
    static helpButtonClickEvent() {
        // NULL CHECK => JSON OBJECT or FALSE
        const sendObject = EventLogic.checkNull();
        if( sendObject ) {
            const promiseResult = Communication.postPromise(communicationURL, sendObject);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                if( resultData.errorCode === 0 ) {
                    Dynamic.catchError(resultData.msg);
                    // window.location.href='/myq.html';
                } else {
                    Dynamic.catchError(resultData.msg);
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            })
        } else {
            Dynamic.catchError('모든 항목을 입력해주세요.');
        }
    }
    static checkNull() {
        const selectBox = document.getElementById('dq-find');
        const phInput = document.getElementById('phone-type');
        const titleInput = document.getElementById('dq-subject');
        const textArea = document.getElementById('describe-dq');

        const phName = phInput.value.trim();
        const titleValue = titleInput.value.trim();
        const textAreaValue = textArea.value.trim();

        if( selectBox.selectedOptions[0].index !== 0 && phName !== '' && titleValue !== '' && textAreaValue !== '') {

            // TEXTAREA TEXT => HTML MARKUP TEXT
            const hiddenDiv = document.getElementById('hidden-div');
            hiddenDiv.innerText = textAreaValue;

            const sendObject = {
                type : selectBox.selectedOptions[0].value.trim(),
                phoneType : phName,
                title : titleValue,
                content : hiddenDiv.innerHTML.trim()
            };

            return sendObject;

        } else {
            return false;
        }
    }
}

export { EventLogic };