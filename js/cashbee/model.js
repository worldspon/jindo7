import { Dynamic } from './controller.js';

const communicationURL = {
    lockPointList : '/cashbee/lockpoint',
    cashbeeList : '/cashbee/list',
    lockPointClear : '/cashbee/lockpoint/lift/'
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
    static subMenuColorChange(e) {
        const eventTarget = e.target;
        for(const button of eventTarget.parentNode.children) {
            button.classList.remove('on');
        }
        eventTarget.classList.add('on');

        if(eventTarget.innerText === '락포인트') {
            EventLogic.getLockPointData();
        } else if(eventTarget.innerText === '충전기록') {
            Dynamic.createCashbeeSearchBox();
        }
    }

    static getLockPointData() {
        const promiseResult = Communication.getPromise(communicationURL.lockPointList);

        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.createLockPointList(resultData.cashbeeList);
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지않습니다.');
        })
    }

    static lockPointClear(e) {
        const targetUniqueId = e.target.dataset.id;
        
        if( confirm('정말로 해제하시겠습니까?') ) {
            const promiseResult = Communication.getPromise(communicationURL.lockPointClear + `/${targetUniqueId}`);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                Dynamic.catchError(resultData.msg);
    
                if( resultData.errorCode === 0 ) {
                    EventLogic.getLockPointData();
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            })
        }
    }

    static cashbeeSearch() {
        const userId = document.getElementById('personal-id').value.trim();
        if( userId.length >= 4 ) {
            EventLogic.getCashbeeData(userId);
        }else {
            Dynamic.catchError('4글자 이상 사용자 아이디를 입력해주세요.');
        }
    }

    static getCashbeeData(userId) {
        const sendObject = {
            trademark : userId
        }
        const promiseResult = Communication.postPromise(communicationURL.cashbeeList, sendObject);

        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.createCashbeeList(resultData.cashbeeList);
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지않습니다.');
        })
    }
}

export { EventLogic };