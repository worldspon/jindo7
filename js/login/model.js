import { Dynamic } from './controller.js';

const user = {
    username : null,
    userpw : null
}

// Async Communication Class
class Communication {

    static getPublicKeyPromise(url) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onload = () => resolve(xhr.responseText);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();
        });
    }

    static postPromise(url,userData) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = () => resolve(xhr.responseText);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send(userData);
        });
    }
}

// Controller Class
class Handler {

    static loginPromiseStart() {
        Communication.getPublicKeyPromise('/login/getPublicKey')
        .then( data => {
            const publicKey = JSON.parse(data).publicKey;
            Handler.encrypt(publicKey);
            Communication.postPromise('/login', JSON.stringify(user))
            .then( data => {
                const communicationResult = JSON.parse(data);
                if(communicationResult.errorCode === 0) {
                    window.location.href = communicationResult.location;
                } else {
                    Dynamic.catchError(communicationResult.msg);
                    document.querySelector('.input-pw').focus();
                    document.querySelector('.input-pw').value = '';
                    document.querySelector('.input-pw').dispatchEvent(new Event('input'));
                }
            })
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static encrypt(key) {
        const plainId = document.querySelector('.input-id').value.trim();
        const plainPw = document.querySelector('.input-pw').value.trim();
        const rsaObject = new JSEncrypt();
        rsaObject.setPrivateKey(key);
        user.username = rsaObject.encrypt(plainId);
        user.userpw = rsaObject.encrypt(plainPw);
    }
}

class EventLogic {
    static resizeEvent() {
        const body = document.body;
        const html = document.documentElement;
        const main = document.querySelector('main');

        if(window.innerHeight <= (main.offsetHeight+100)) {
            body.style.height = 'auto';
            html.style.height = 'auto';
        } else {
            body.style.height = '100%';
            html.style.height = '100%';
        }
    }

    static checkIdLength() {
        const idInputTag = document.querySelector('.input-id');
        return idInputTag.value.length >= 2 ? true : false;
    }
    
    static checkPasswordLength() {
        const pwInputTag = document.querySelector('.input-pw');
        return pwInputTag.value.length >= 4 ? true : false;
    }

    static checkCapslock(keyEvent) {
        return keyEvent.getModifierState("CapsLock");
    }

    static checkInputBox() {
        if(!this.checkIdLength()) {
            return '아이디를 입력해주세요.';
        } else if(!this.checkPasswordLength()) {
            return '비밀번호를 입력해주세요.';
        } else {
            return true;
        }
    }
}

export { Handler, EventLogic };