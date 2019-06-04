'use strict';

// Model
class User {
    constructor(password) {
        return {
            "appid": Handler.filterHref(),
            "userpw": password
        };
    }
}


class Handler {
    static filterHref() {
        const url = window.location.href;
        const firstSlash = url.indexOf('password') + 9;
        const lastSlash = url.indexOf('/', firstSlash);
        return url.slice(firstSlash,lastSlash);
    }

    static checkPassword() {
        const passwordInput = document.querySelector('.check-personal-pw').value;
        const passwordConfirm = document.querySelector('.recheck-personal-pw').value;

        if(passwordInput.search(/\s/g) >= 0) {
            return '비밀번호에는 공백이 포함될 수 없습니다.';
        }
        
        if((passwordInput.length < 4 || passwordConfirm.length < 4)) {
            return '비밀번호를 4자리 이상 입력해주세요.';
        } else if(passwordInput !== passwordConfirm) {
            return '비밀번호가 다릅니다. 확인해주세요.';
        } else {
            return true;
        }
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

    static convertJSON(userObject) {
        return typeof userObject === 'string' ? JSON.parse(userObject) : JSON.stringify(userObject);
    }


    static asyncValidation(asyncResult, button) {
        asyncResult.then(() => {
            UI.showSuccessDivision();
        }, () => {
            UI.ableButton(button);
            UI.showAlret();
        })
    }

}

// View
class UI {

    static showAlret(msg = '서버와 통신이 원활하지않습니다.\n다시 시도해주세요.') {
        alert(msg);
    }

    static disabledButton(button) {
        button.classList.add('disabled-button');
        button.classList.remove('btn-change-pw');
        button.innerText = '통신중입니다.'
        button.disabled = true;
    }

    static ableButton(button) {
        button.classList.remove('disabled-button');
        button.classList.add('btn-change-pw');
        button.innerText = '변경';
        button.disabled = false;
    }

    static showSuccessDivision() {
        const parentDivision = document.querySelector('.changepw-content-box');
        const div = document.createElement('div');
        div.classList.add('success-div');
        div.textContent = '비밀번호 변경이 완료되었습니다.';
        parentDivision.innerHTML = '';
        parentDivision.appendChild(div);
    }

    static clearPassword() {
        document.querySelector('.check-personal-pw').value = '';
        document.querySelector('.recheck-personal-pw').value = '';
        document.querySelector('.check-personal-pw').focus();
    }

}


// Click Event
document.querySelector('.btn-change-pw').addEventListener('click', (e) => {
    const checkPasswordMessage = Handler.checkPassword();
    if(checkPasswordMessage === true) {
        UI.disabledButton(e.target);
        const passwordInput = document.querySelector('.check-personal-pw').value;
        const userObject = new User(passwordInput);
        const userJSON = Handler.convertJSON(userObject);
        const asyncResult = Handler.asyncCommunication('POST', 'http://192.168.0.24:8080/change/password', userJSON);
        Handler.asyncValidation(asyncResult, e.target);

    } else {
        UI.showAlret(checkPasswordMessage);
        UI.clearPassword();
    }
});


// Enter Event
document.querySelector('.check-personal-pw').addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        document.querySelector('.recheck-personal-pw').focus();
    }
});

// Enter Event
document.querySelector('.recheck-personal-pw').addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        document.querySelector('.btn-change-pw').dispatchEvent(new Event('click'));
    }
})