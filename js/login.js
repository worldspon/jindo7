'use strict';

// Model Class
class User {
    constructor(encryptId, encryptPw) {
        return {
            'username' : encryptId,
            'userpw' : encryptPw
        }
    }
}

// Controller Class
class Handler {

    static setWindowHeight() {
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
    
        window.addEventListener('resize', function() {
            if(window.innerHeight <= (main.offsetHeight+100)) {
                body.style.height = 'auto';
                html.style.height = 'auto';
            } else {
                body.style.height = '100%';
                html.style.height = '100%';
            }
        });
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

    static encrypt(key) {
        const plainId = document.querySelector('.input-id').value.trim();
        const plainPw = document.querySelector('.input-pw').value.trim();

        const rsaObject = new JSEncrypt();
        rsaObject.setPrivateKey(key);

        return [rsaObject.encrypt(plainId), rsaObject.encrypt(plainPw)];
    }

    static createUserObject(userEncryptData) {
        return new User(...userEncryptData);
    }
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

// View Class
class UI {

    static showCheckImg(target, showBoolean) {
        target.style.backgroundImage = showBoolean ? 'url("./images/login_check.png")' : 'none';
    }

    static showTooltipText(showBoolean) {
        document.querySelector('.tooltiptext').style.display = showBoolean ? 'block' : 'none';
    }

    static showAlert(msg = '서버와 통신이 원활하지 않습니다.') {
        alert(msg);
    }
}

Handler.setWindowHeight();

// ID INPUT EVENT -> CHECK LENGTH -> SHOW CHECK IMAGE
document.querySelector('.input-id').addEventListener('input', function(e) {
    UI.showCheckImg(this, Handler.checkIdLength());
});

// PASSWORD INPUT EVENT -> CHECK LENGTH -> SHOW CHECK IMAGE
document.querySelector('.input-pw').addEventListener('input', function(){
    UI.showCheckImg(this, Handler.checkPasswordLength());
});

// PASSWORD KEYDOWN EVENT -> CHECK CAPSLOCK -> SHOW TOOLTIP
document.querySelector('.input-pw').addEventListener('keydown', (event) => {
    UI.showTooltipText(Handler.checkCapslock(event));

    if (event.keyCode == 13) {
        document.querySelector('.submit-btn').dispatchEvent(new Event('click'));
    }
});

// SUBMIT CLICK EVENT
document.querySelector('.submit-btn').addEventListener('click', function(){
    const msg = Handler.checkInputBox();
    if(msg === true) {
        Communication.getPublicKeyPromise('http://192.168.0.24:8080/login/getPublicKey')
        .then( data => {
            const publicKey = JSON.parse(data).publicKey;
            const userObject = JSON.stringify(Handler.createUserObject(Handler.encrypt(publicKey)));
            Communication.postPromise('http://192.168.0.24:8080/login', userObject)
            .then( data => {
                const communicationResult = JSON.parse(data);
                if(communicationResult.errorCode === 0) {
                    window.location.href = communicationResult.location;
                } else {
                    UI.showAlert(communicationResult.msg);
                    document.querySelector('.input-pw').focus();
                    document.querySelector('.input-pw').value = '';
                    document.querySelector('.input-pw').dispatchEvent(new Event('input'));
                }
            })
        }, () => {
            UI.showAlert();
        });
    }else {
        UI.showAlert(msg);
    }
});