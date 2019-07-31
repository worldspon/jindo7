import { Dynamic } from './controller.js';

const communicationURL = {
    promotionStateChange : 'http://192.168.0.24:8080/promotion/state/change'
};

class Communication {
    static postPromise(url, sendObject) {
        return new Promise((resolve, reject)=>{
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

    // 한줄광고 상태변경 EVENT
    static stateChange(e) {
        const eventTarget = e.target
        const selectBox = eventTarget.previousSibling.previousSibling;
        if( EventLogic.selectBoxNullCheck(eventTarget) ) {

            if( EventLogic.confirmStateChange(selectBox) ) {
                const sendObject = {
                    uniqueId : eventTarget.parentNode.parentNode.dataset.uniqueId,
                    state : selectBox.options[selectBox.selectedIndex].value
                }
    
                const promiseResult = Communication.postPromise(communicationURL.promotionStateChange, sendObject);
    
                promiseResult.then((result) => {
                    const resultData = JSON.parse(result);
                    Dynamic.catchError(resultData.msg);
    
                    if( resultData.errorCode === 0 ) {
                        window.location = './adlist.html';
                    }
    
                }, () => {
                    Dynamic.catchError('서버와 통신이 원활하지않습니다.');
                })
            }
        } else {
            Dynamic.catchError('옵션을 선택해주세요.');
        }
    }


    // SELECT BOX 선택 여부 CHECK
    static selectBoxNullCheck(eventTarget) {
        const selectBox = eventTarget.previousSibling.previousSibling;
        return selectBox.options[selectBox.selectedIndex].value === '' ? false : true;
    }

    // 상태변경 재확인
    static confirmStateChange(selectBox) {
        const selectOptionText = selectBox.options[selectBox.selectedIndex].innerText

        return confirm(`정말로 ${selectOptionText}하시겠습니까?`);
    }
}

export { EventLogic };