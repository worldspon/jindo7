import { Dynamic, EventList } from './controller.js';

const communicationURL = {
    promotionModify : '/promotion/modify',
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
    static searchEvent() {
        const searchInput = document.querySelector('.search-input');
        const searchKeyword = encodeURIComponent(searchInput.value.trim());

        if( searchKeyword === '' ) {
            Dynamic.catchError('검색어를 입력해주세요.');
        } else {
            location.href = `/promotion/0/${searchKeyword}`;
        }
    }

    static searchEnterEvent(e) {
        if( e.keyCode === 13 ) {
            EventLogic.searchEvent();
        }
    }

    // 한줄광고 수정
    static promotionModify(e) {
        const eventTarget = e.target;
        const targetContent = eventTarget.parentNode.parentNode.children[2].children[2];
        if( eventTarget.innerText === '수정' ) {

            targetContent.dataset.previousText = targetContent.innerText;
            eventTarget.classList.remove('ad-adjust-box');
            eventTarget.classList.add('ad-done-box');
            targetContent.contentEditable = true;
            targetContent.focus();
            eventTarget.innerText = '완료';
            EventList.bindCheckLength(targetContent);

        } else if ( eventTarget.innerText === '완료' ) {

            const promotionModifyConfirm = confirm('정말 변경하시겠습니까?');
            if( promotionModifyConfirm && targetContent.innerText.trim() === '' ) {
                Dynamic.catchError('광고내용이 없습니다.');
            } else if( promotionModifyConfirm ) {
                const sendObject = {
                    uniqueId : eventTarget.parentNode.dataset.uniqueId, 
                    chat : targetContent.innerText
                }
        
                targetContent.innerText = '통신중입니다. 잠시만 기다려주세요.';

                const promiseResult = Communication.postPromise(communicationURL.promotionModify, sendObject);
                promiseResult.then((result)=>{
                    const resultData = JSON.parse(result);
                    Dynamic.catchError(resultData.msg);
                    if(resultData.errorCode === 0) {
                        location.href = '/promotion';
                    }
                    targetContent.innerText = targetContent.dataset.previousText;
        
                }, ()=>{
                    Dynamic.catchError('서버와 통신이 원활하지않습니다.');
                    targetContent.innerText = targetContent.dataset.previousText;
                });
            } else {
                eventTarget.classList.remove('ad-done-box');
                eventTarget.classList.add('ad-adjust-box');
                targetContent.contentEditable = false;
                targetContent.innerText = targetContent.dataset.previousText;
                targetContent.dataset.previousText = '';
                eventTarget.innerText = '수정';
            }
        }
    }

    // 한줄광고 80자 LENGTH CHECK
    static checkPromotionLength(e) {
        const keyCode = e.keyCode;
        if(e.target.innerText.length > 80 && EventLogic.functionalKeyCodeValidation(keyCode) ) {
            Dynamic.catchError('광고 내용은 80자 이하여야합니다.');
            e.target.innerText = e.target.innerText.slice(0,80);
        }
    }

    // 방향키, BACKSPACE, CAPSLOCK, HOME, END, DELETE 제외
    static functionalKeyCodeValidation(keyCode) {
        if(keyCode === 8 || keyCode === 16 || keyCode === 17 || keyCode === 20 || (keyCode >= 35 && keyCode <= 40) || keyCode === 46) {
            return false;
        }
        return true;
    }
}

export { EventLogic };