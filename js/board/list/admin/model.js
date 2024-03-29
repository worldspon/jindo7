import { Dynamic } from './controller.js'

const communicationURL = {
    block : '/blockUser/setBlock',
    clear : '/blockUser/clear/'
}

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

    static getPromise(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }
}

class EventLogic {

    // SUB MENU X, Y 좌표 추출 및 RENDER 함수 호출
    static userSubMenu(e) {
        const coordinate = {
            x : e.pageX,
            y : e.pageY
        }
        Dynamic.createSubMenu(coordinate, e.target);
    }

    // USER BLOCK EVENT
    static userBlock(e) {
        const sendObject = {
            trademark : null,
            blockDays : null,
            memo : null
        };
        const textAreaValue = document.getElementById('memo').value.trim();
        if( textAreaValue === '' ) {
            Dynamic.catchError('정지 사유를 입력해주세요.');
        } else if( confirm('정말로 정지하시겠습니까?') ) {
            sendObject.trademark = e.target.dataset.id;

            const radioButton = document.querySelectorAll('input[type=radio]');
            for(const radio of radioButton) {
                if(radio.checked) {
                    sendObject.blockDays = radio.value;
                }
            }

            sendObject.memo = textAreaValue;

            const promiseResult = Communication.postPromise(communicationURL.block, sendObject);

            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                Dynamic.catchError(resultData.msg);

                if( resultData.errorCode === 0 ) {
                    window.location.reload();
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            });
        }
    }

    // USER BLOCK CLEAR EVENT
    static userClear(e) {
        const userId = e.target.dataset.id;

        if( confirm(`${userId}님의 정지를 해제하시겠습니까?`) ) {
            const promiseResult = Communication.getPromise(communicationURL.clear + `${userId}`);

            promiseResult.then((result) => {
                const resultData = JSON.parse(result);

                Dynamic.catchError(resultData.msg);

                if( resultData.errorCode === 0 ) {
                    window.location.reload();
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다');
            })
        }
    }
}

export { EventLogic };