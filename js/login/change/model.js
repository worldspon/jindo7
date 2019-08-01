import { Dynamic } from './controller.js';

const communicationURL = '/change/password';

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
    static changePassword(e) {
        Dynamic.disabledButton(e.target);
        if( EventLogic.checkPassword() ) {
            const sendObject = {
                appid : EventLogic.filterUserId(),
                userpw : document.querySelector('.check-personal-pw').value
            }

            const promiseResult = Communication.postPromise(communicationURL, sendObject);

            promiseResult.then((result)=>{
                const resultData = JSON.parse(result);

                if( resultData.errorCode === 0 ){
                    Dynamic.showSuccessDivision();
                } else {
                    Dynamic.catchError(resultData.msg);
                    document.querySelector('.check-personal-pw').focus();
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            })
        }

        Dynamic.ableButton(e.target);
    }
    
    static checkPassword() {
        const passwordValue = document.querySelector('.check-personal-pw').value;

        const passwordConfirm = document.querySelector('.recheck-personal-pw').value;

        if( passwordValue.search(/\s/g) >= 0 ) {
            Dynamic.catchError('비밀번호에는 공백이 포함될 수 없습니다.');
            return false;
        } else if( passwordValue < 4 ) {
            Dynamic.catchError('비밀번호를 4자리 이상 입력해주세요.');
            return false;
        } else if( passwordValue !== passwordConfirm ) {
            Dynamic.catchError('비밀번호가 다릅니다. 확인해주세요.');
            return false;
        } else {
            return true;
        }
    }

    static filterUserId() {
        const url = window.location.href;
        const firstSlash = url.indexOf('password') + 9;
        const lastSlash = url.indexOf('/', firstSlash);
        return url.slice(firstSlash,lastSlash);
    }
}

export { EventLogic };