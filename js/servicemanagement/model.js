import { Dynamic, EventList } from './controller.js';

const pointListState = {
    state : null
}

const pointChangeState = {
    uniqueId : null, 
	state : null
}

const communicationURL = {
    point : 'http://192.168.0.24:8080/management/point',
    pointChange : 'http://192.168.0.24:8080/management/point/change'
}

class Communication {
    static pointPostPromise(sendObject, url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(sendObject));
        });
    }

    static pointChangePostPromise(sendObject, url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(sendObject));
        });
    }
}

class Handler {
}

class EventLogic {
    static pointButtonClickEvent(e) {
        pointListState.state = parseInt(e.target.dataset.state);
        const promiseResult = Communication.pointPostPromise(pointListState, communicationURL.point);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.pointBox(resultData.pointList, pointListState.state);
            EventList.bindPointListCheckBoxClickEvent();
            EventList.bindPointListButtonClickEvent();
            EventList.bindPointStateChangeEvent()
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static pointListButtonClickEvent(e) {

        for(const allButton of e.target.parentNode.children) {
            allButton.classList.remove('active');
        }
        e.target.classList.add('active');

        pointListState.state = parseInt(e.target.dataset.state);
        const promiseResult = Communication.pointPostPromise(pointListState, communicationURL.point);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.pointTable(resultData.pointList, pointListState.state);
            EventList.bindPointListCheckBoxClickEvent();
            if( pointListState.state === 0 ) EventList.bindPointStateChangeEvent();
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        })
    }

    static pointListCheckBoxClickEvent(e) {
        const tableTR = e.target.parentNode.parentNode;
        e.target.checked ? tableTR.classList.add('point-list-on-hover') : tableTR.classList.remove('point-list-on-hover');
    }

    static pointConfirmClickEvent(e) {
        const targetTR = e.target.parentNode.parentNode;
        const uniqueId = targetTR.children[1].innerText;
        const id = targetTR.children[3].innerText;
        const point = targetTR.children[5].innerText;
        const bank = targetTR.children[6].innerText;
        const bankuser = targetTR.children[7].innerText;

        if(confirm(`정말로 승인하시겠습니까?\n${id} ${point}\n${bank} ${bankuser}`)) {
            pointChangeState.uniqueId = uniqueId;
            pointChangeState.state = 1;

            const promiseResult = Communication.pointChangePostPromise(pointChangeState, communicationURL.pointChange);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                if( resultData.errorCode === 4 ) {
                    Dynamic.catchError(resultData.msg);
                    window.location.reload();
                } else {
                    Dynamic.catchError(resultData.msg);
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            });
        }
    }

    static pointRejectClickEvent(e) {
        const targetTR = e.target.parentNode.parentNode;
        const uniqueId = targetTR.children[1].innerText;
        const id = targetTR.children[3].innerText;
        const point = targetTR.children[5].innerText;
        const bank = targetTR.children[6].innerText;
        const bankuser = targetTR.children[7].innerText;

        if(confirm(`정말로 거절하시겠습니까?\n${id} ${point}\n${bank} ${bankuser}`)) {
            pointChangeState.uniqueId = uniqueId;
            pointChangeState.state = 2;

            const promiseResult = Communication.pointChangePostPromise(pointChangeState, communicationURL.pointChange);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                if( resultData.errorCode === 5 ) {
                    Dynamic.catchError(resultData.msg);
                    window.location.reload();
                } else {
                    Dynamic.catchError(resultData.msg);
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            });
        }

    }
}

export { EventLogic };