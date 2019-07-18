import { Dynamic, EventList } from './controller.js';

const communicationURL = {
    list : 'http://192.168.0.24:8080/blockUser/list',
    search : 'http://192.168.0.24:8080/blockUser/',
    memo : 'http://192.168.0.24:8080/blockUser/memo',
    clear : 'http://192.168.0.24:8080/blockUser/clear/'
}

class Communication {
    static getPromise(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

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
    static getBanUserData() {
        const promiseResult = Communication.getPromise(communicationURL.list);

        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.createBanUserBox(resultData.blockUserList);
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지않습니다.');
        })
    }

    static searchBanUser() {
        const searchValue = document.getElementById('suspend-user-id').value.trim().toUpperCase();

        if( searchValue === '' ) {
            Dynamic.catchError('유저 아이디를 입력해주세요.');
        } else {
            const promiseResult = Communication.getPromise(communicationURL.search+`${searchValue}`);

            promiseResult.then((result) => {
                const resultData = JSON.parse(result);

                if( Object.keys(resultData.blockUser).length === 0 ){
                    Dynamic.catchError('정지회원이 아닙니다.');
                } else {
                    const sendData = [];
                    sendData.push(resultData.blockUser);
                    Dynamic.createBanUserTable(sendData);
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            })
        }
    }

    static searchInputEnter(e) {
        if( e.keyCode === 13 ){
            EventLogic.searchBanUser();
        }
    }

    static tableDataEdit(e) {
        const targetTable = document.querySelectorAll('.editable-data');
        for(const table of targetTable) {
            table.contentEditable = 'false';
        }
        e.target.contentEditable = 'true';
        e.target.focus();
        EventList.bindReasonFocusOutEvent(e.target);
        EventList.bindReasonEditEvent(e.target);
    }

    static reasonFocusOut(e) {
        const target = e.path[0];
        target.innerText = target.dataset.memo;
    }

    static reasonEdit(event) {
        if( event.keyCode === 13 ) {
            event.preventDefault();
            const target = event.path[0];       
            if( target.innerText === '' ) {
                Dynamic.catchError('사유를 입력해주세요.');
            } else {
                const sendObject = {
                    id : target.dataset.id,
                    memo : target.innerText
                };

                const promiseResult = Communication.postPromise(communicationURL.memo, sendObject);

                promiseResult.then((result) => {
                    target.dataset.memo = target.innerText;
                    const resultData = JSON.parse(result);
                    target.contentEditable = 'false';
                    Dynamic.catchError(resultData.msg);
                }, () => {
                    Dynamic.catchError('서버와 통신이 원활하지않습니다.');
                })
            }
        }
    }

    static banClear(e) {
        if( confirm('정말로 해제하시겠습니까?') ) {
            const userId = e.target.parentNode.parentNode.children[1].innerText.trim();

            const promiseResult = Communication.getPromise(communicationURL.clear + `${userId}`);

            promiseResult.then((result) => {
                const resultData = JSON.parse(result);

                Dynamic.catchError(resultData.msg);

                if( resultData.errorCode === 0 ) {
                    window.location.reload();
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');  
            })
        }
    }
}

export { EventLogic };