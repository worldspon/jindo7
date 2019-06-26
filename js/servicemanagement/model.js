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
    pointChange : 'http://192.168.0.24:8080/management/point/change',
    p2p : 'http://192.168.0.24:8080/management/p2p',
    p2pConflict : 'http://192.168.0.24:8080/management/p2p/conflict',
    p2pResolution : 'http://192.168.0.24:8080/management/p2p/conflict/resolution',
    findPw : 'http://192.168.0.24:8080/management/find/password'
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

    static p2pGetPromise(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

    static p2pResolvePostPromise(sendObject, url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(sendObject));
        });
    }

    static findPwPostPromise(sendObject, url) {
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

    static categoryButtonColorEvent(e) {
        const categoryButton = document.querySelectorAll('.sorted-content-box > button');
        for(const button of categoryButton) {
            button.classList.remove('on');
        }
        e.target.classList.add('on');
    }

    static windowResizeEvent(e) {
        const contentBox = document.querySelector('.serviceadmin-content-box');
        contentBox.style.height = 'auto';

        const headerHeight = document.querySelector('.header-wrap').offsetHeight;
        const subHeaderHeight = document.querySelector('.serviceadmin-common-box').offsetHeight;
        const categoryButtonBoxHeight = document.querySelector('.sorted-content-box').offsetHeight;
        const contentBoxHeight = document.querySelector('.serviceadmin-content-box').offsetHeight;
        const allContentHeight = headerHeight + subHeaderHeight + categoryButtonBoxHeight + contentBoxHeight + 120;
        const windowHeight = e.target.innerHeight;
        const maximumTableHeight = windowHeight - (headerHeight + subHeaderHeight + categoryButtonBoxHeight + 150);

        if( windowHeight < allContentHeight ) {
            contentBox.style.height = maximumTableHeight+'px';
        } else {
            contentBox.style.height = 'auto';
        }
    }

    // POINT EVENT LOGIC
    static pointButtonClickEvent(e) {
        pointListState.state = parseInt(e.target.dataset.state);
        const promiseResult = Communication.pointPostPromise(pointListState, communicationURL.point);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.pointBox(resultData.pointList, pointListState.state);
            EventList.bindPointListCheckBoxClickEvent();
            EventList.bindPointListButtonClickEvent();
            EventList.bindPointStateChangeEvent();
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
    // POINT EVENT LOGIC

    // P2P EVENT LOGIC
    static p2pButtonClickEvent() {
        const promiseResult = Communication.p2pGetPromise(communicationURL.p2p);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.p2pBox(resultData.p2pList);
            EventList.bindP2PAllButtonClickEvent();
            EventList.bindP2PDisputeClickEvent();
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static p2pButtonColorChange(buttonList, target) {
        for(const button of buttonList) {
            button.classList.remove('alive');
        }
        target.classList.add('alive');
    }

    static p2pAllListButtonClickEvent(e) {
        EventLogic.p2pButtonColorChange(e.target.parentNode.children, e.target);
        const promiseResult = Communication.p2pGetPromise(communicationURL.p2p);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.p2pTable(resultData.p2pList);
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static p2pDisputeClickEvent(e) {
        EventLogic.p2pButtonColorChange(e.target.parentNode.children, e.target);
        const promiseResult = Communication.p2pGetPromise(communicationURL.p2pConflict);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.p2pTable(resultData.p2pConflictList);
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static p2pDisputeResolveClickEvent(e) {
        if(confirm('정말로 분쟁을 처리하시겠습니까?')) {
            const uid = e.target.dataset.uid;
            const sendObject = {
                uniqueId : uid
            };
    
            const promiseResult = Communication.p2pResolvePostPromise(sendObject, communicationURL.p2pResolution);
            promiseResult.then((result) => {
    
                const resultData = JSON.parse(result);
                Dynamic.catchError(resultData.msg);
    
                const buttonList = document.querySelector('.state-btn-box').children;
                for(const button of buttonList) {
                    if(button.classList.contains('alive')) {
                        button.dispatchEvent(new Event('click'));
                    }
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            });
        }
    }

    static adminFindPwButtonClickEvent() {
        Dynamic.adminFindPwBox();
        EventList.bindFindPwCategoryClickEvent();
    }

    static findPwByInput(e) {
        const inputBox = document.getElementById('busy-hands');
        const inputValue = inputBox.value.trim();
        const sendObject = {};

        if( inputValue === '' ) {
            Dynamic.catchError('아이디 혹은 전화번호를 입력해주세요.');
        } else if( e.target.dataset.type === 'id' ) {
            sendObject.id = inputValue;
            
            const promiseResult = Communication.findPwPostPromise(sendObject, communicationURL.findPw);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                if( resultData.errorCode === 0 ) {
                    Dynamic.adminFindPwParagraph(inputValue, resultData.msg);
                    inputBox.value = '';
                } else {
                    Dynamic.catchError(resultData.msg);
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            });
        } else if( e.target.dataset.type === 'phone' ) {
            sendObject.phone = inputValue;
            
            const promiseResult = Communication.findPwPostPromise(sendObject, communicationURL.findPw);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                if( resultData.errorCode === 0 ) {
                    Dynamic.adminFindPwParagraph(inputValue, resultData.msg);
                    inputBox.value = '';
                } else {
                    Dynamic.clearParagraph();
                    Dynamic.catchError(resultData.msg);
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            });
        } else {
            Dynamic.catchError('알수없는 오류');
        }
    }
}

export { EventLogic };