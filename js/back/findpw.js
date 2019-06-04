'use strict';

// Model Class
class User {
    static createUserObject(id) {
        return { username : id };
    }
}


class Communication {
    static convertJSON(userObject) {
        return typeof userObject === 'string' ? JSON.parse(userObject) : JSON.stringify(userObject);
    }

    static asyncCommunication(type, url, userJSON) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(type, url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(userJSON)
        });
    }

    static asyncValidation(asyncResult, button) {
        asyncResult.then((result) => {
            const resultObject = this.convertJSON(result);
            resultObject.errorCode === 0 ? UI.successView(resultObject.msg) : UI.alertMessage(resultObject.msg);
            UI.ableButton(button);
        }, () => {
            UI.ableButton(button);
            UI.alertMessage();
        })
    }
}

// View Class
class UI {

    static clearInput() {
        document.querySelector('.smart-id').value = '';
    }

    static disabledButton(button) {
        button.disabled = true;
        button.classList.remove('send-email');
        button.classList.add('disabled-button');
        button.innerText = '통신중입니다.';
    }

    static ableButton(button) {
        button.disabled = false;
        button.classList.remove('disabled-button');
        button.classList.add('send-email');
        button.innerText = '메일발송';
    }


    static successView(email) {
        const div = document.createElement('div');
        div.classList.add('success-div');
        div.innerHTML = `${email}<br>메일이 발송되었습니다.<br>메일을 확인해주세요.`;
        document.querySelector('.findpw-content-box').innerHTML = '';
        document.querySelector('.findpw-content-box').appendChild(div);
    }

    static alertMessage(msg = '서버와 통신이 원활하지않습니다.\n잠시후 다시 시도해주세요.') {
        this.clearInput();
        alert(msg);
    }
}


// Click Event
document.querySelector('.send-email').addEventListener('click', (e) => {

    const userId = document.querySelector('.smart-id').value.trim();

    if(userId !== '') {
        UI.disabledButton(e.target)
        const userObject = User.createUserObject(userId);
        const userJSON = Communication.convertJSON(userObject);
        const asyncResult = Communication.asyncCommunication('POST', 'http://168.0.24:8080/find/password', userJSON);
        Communication.asyncValidation(asyncResult, e.target);
    } else {
        UI.alertMessage('아이디를 입력해주세요.');
        UI.clearInput();
    }
})


// Enter Event
document.querySelector('.smart-id').addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        document.querySelector('.send-email').dispatchEvent(new Event('click'));
    }
})