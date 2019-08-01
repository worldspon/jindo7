import { Dynamic } from './controller.js';

const communicationURL = '/board/write';


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
    static writeBoard() {
        const sendObject = EventLogic.checkNull();
        if( sendObject ) {
            const promiseResult = Communication.postPromise(communicationURL, sendObject);

            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                Dynamic.catchError(resultData.msg);
                if( resultData.errorCode === 0 ) {
                    window.location.href = `/board/content/${resultData.boardId}`;
                } else {
                    Dynamic.catchError(resultData.msg)
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            })
        } else {
            Dynamic.catchError('내용을 전부 입력해주세요.');
        }
    }

    static checkNull() {
        const sendObject = {
            title : null,
            content : null
        };

        const boardTitle = document.querySelector('.board-writing-title');
        const boardContent = document.querySelector('.board-writing-content');

        if(boardTitle.value.trim() === '' || boardContent.value.trim() === '') {
            return false;
        } else {
            sendObject.title = boardTitle.value.trim();
            sendObject.content = boardContent.value.trim();

            return sendObject;
        }
    }
}

export { EventLogic };