import { Dynamic, EventList } from './controller.js';

const pointListState = {
    state : null
}

const pointChangeState = {
    uniqueId : null, 
	state : null
}

const communicationURL = {
    point : 'http://192.168.0.24:8081/management/point',
    pointChange : 'http://192.168.0.24:8081/management/point/change',
    p2p : 'http://192.168.0.24:8081/management/p2p',
    p2pConflict : 'http://192.168.0.24:8081/management/p2p/conflict',
    p2pResolution : 'http://192.168.0.24:8081/management/p2p/conflict/resolution',
    findPw : 'http://192.168.0.24:8081/management/find/password',
    adList : 'http://192.168.0.24:8081/management/ad',
    adFindAccount : 'http://192.168.0.24:8081/management/ad/find/account',
    adListAdd : 'http://192.168.0.24:8081/management/ad/add',
    adListDelete : 'http://192.168.0.24:8081/management/ad/delete',
    adModifyRead : 'http://192.168.0.24:8081/management/ad/read',
    adModify : 'http://192.168.0.24:8081/management/ad/modify',
    server : 'http://192.168.0.24:8081/management/server',
    serverAdd : 'http://192.168.0.24:8081/management/server/add',
    serverModifyRead : 'http://192.168.0.24:8081/management/server/read',
    serverModify : 'http://192.168.0.24:8081/management/server/modify',
    serverListDelete : 'http://192.168.0.24:8081/management/server/delete'
}

class Communication {
    static postPromise(sendObject, url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
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
        const promiseResult = Communication.postPromise(pointListState, communicationURL.point);
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
        const promiseResult = Communication.postPromise(pointListState, communicationURL.point);
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

            const promiseResult = Communication.postPromise(pointChangeState, communicationURL.pointChange);
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

            const promiseResult = Communication.postPromise(pointChangeState, communicationURL.pointChange);
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
        const promiseResult = Communication.getPromise(communicationURL.p2p);
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
        const promiseResult = Communication.getPromise(communicationURL.p2p);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.p2pTable(resultData.p2pList);
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static p2pDisputeClickEvent(e) {
        EventLogic.p2pButtonColorChange(e.target.parentNode.children, e.target);
        const promiseResult = Communication.getPromise(communicationURL.p2pConflict);
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
    
            const promiseResult = Communication.postPromise(sendObject, communicationURL.p2pResolution);
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
        Dynamic.showLoadingIcon();
        const inputBox = document.getElementById('busy-hands');
        const inputValue = inputBox.value.trim();
        const sendObject = {};

        if( inputValue === '' ) {
            Dynamic.hideLoadingIcon();
            Dynamic.catchError('아이디 혹은 전화번호를 입력해주세요.');
        } else if( e.target.dataset.type === 'id' ) {
            sendObject.id = inputValue;
            
            const promiseResult = Communication.postPromise(sendObject, communicationURL.findPw);
            promiseResult.then((result) => {
                Dynamic.hideLoadingIcon();
                const resultData = JSON.parse(result);
                if( resultData.errorCode === 0 ) {
                    Dynamic.adminFindPwParagraph(inputValue, resultData.msg);
                    inputBox.value = '';
                } else {
                    Dynamic.catchError(resultData.msg);
                }
            }, () => {
                Dynamic.hideLoadingIcon();
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            });
        } else if( e.target.dataset.type === 'phone' ) {
            sendObject.phone = inputValue;
            
            const promiseResult = Communication.postPromise(sendObject, communicationURL.findPw);
            promiseResult.then((result) => {
                Dynamic.hideLoadingIcon();
                const resultData = JSON.parse(result);
                if( resultData.errorCode === 0 ) {
                    Dynamic.adminFindPwParagraph(inputValue, resultData.msg);
                    inputBox.value = '';
                } else {
                    Dynamic.catchError(resultData.msg);
                }
            }, () => {
                Dynamic.hideLoadingIcon();
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            });
        } else {
            Dynamic.hideLoadingIcon();
            Dynamic.catchError('알수없는 오류');
        }
    }
    // P2P EVENT LOGIC

    // AD SUPPLIER EVENT
    static adSupplierButtonClickEvent() {
        const promiseResult = Communication.getPromise(communicationURL.adList);

        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.adListBox(resultData.adList);
            EventList.bindAdSupplierAddClickEvent();
            EventList.bindAdAccountFind();
            EventList.bindAdListModify();
            EventList.bindAdListDelete();
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static adSupplierAddClickEvent() {
        Dynamic.adAddModal();
        // MODAL REGISTER EVENT
        EventList.bindAdListAdd();
        // MODAL DESTROY EVENT
        EventList.bindDestroyModal();
        // MODAL RESET EVENT
        EventList.bindResetModal();
    }

    static adAccountFind(e) {
        e.target.innerText = '전송중';
        const contentId = e.target.dataset.id;
        const sendObject = {
            no : contentId
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.adFindAccount);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( resultData.errorCode === 0 ) {
                e.target.innerText = '계정확인';
                Dynamic.catchError(resultData.msg);
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static adListModify(e) {
        const sendObject = {
            no : e.target.dataset.id
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.adModifyRead);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.adModifyModal(resultData.ad);
            // MODAL REGISTER EVENT
            EventList.bindAdModifyReg();
            // MODAL DESTROY EVENT
            EventList.bindDestroyModal();
            // MODAL RESET EVENT
            EventList.bindResetModal();
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static adListDelete(e) {
        if(!confirm('정말로 삭제하시겠습니까?')) {
            return false;
        }

        const sendObject = {
            no : e.target.dataset.id
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.adListDelete);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( resultData.errorCode === 0 ) {
                Dynamic.catchError(resultData.msg);
                EventLogic.adSupplierButtonClickEvent();
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    // AD MODAL에서 등록버튼 클릭시 이벤트
    static adListAdd() {
        const name = document.getElementById('company-name');
        const url = document.getElementById('company-site-info');
        const id = document.getElementById('one-identification');
        const pw = document.getElementById('one-pass');
        const location = document.getElementById('company-location');
        const companyNote = document.getElementById('some-more-blahblah');

        if( name.value === '' || url.value === '' || id.value === '' || pw.value === ''  || location.value === '')
        {
            Dynamic.catchError('필수 정보가 누락되었습니다.');
            return false;
        }

        const sendObject = {
            companyName : name.value,
            siteAddress : url.value,
            loginId : id.value,
            loginPw : pw.value,
            partName : location.value,
            note : companyNote.value
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.adListAdd);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( resultData.errorCode === 0 ) {
                Dynamic.catchError(resultData.msg);
                EventLogic.adSupplierButtonClickEvent();
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static adModifyReg(e) {
        const contentId = e.target.dataset.no;
        const name = document.getElementById('company-name');
        const url = document.getElementById('company-site-info');
        const id = document.getElementById('one-identification');
        const pw = document.getElementById('one-pass');
        const location = document.getElementById('company-location');
        const companyNote = document.getElementById('some-more-blahblah');

        if( name.value === '' || url.value === '' || id.value === '' || pw.value === ''  || location.value === '')
        {
            Dynamic.catchError('필수 정보가 누락되었습니다.');
            return false;
        }

        const sendObject = {
            no : contentId,
            companyName : name.value,
            siteAddress : url.value,
            loginId : id.value,
            loginPw : pw.value,
            partName : location.value,
            note : companyNote.value
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.adModify);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( resultData.errorCode === 0 ) {
                Dynamic.catchError(resultData.msg);
                EventLogic.adSupplierButtonClickEvent();
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        }); 
    }
    // AD SUPPLIER EVENT

    // SERVER MANAGEMENT EVENT
    static serverManageButtonClickEvent() {
        const promiseResult = Communication.getPromise(communicationURL.server);

        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.serverListBox(resultData.serverList);
            EventList.bindServerAddClickEvent();
            EventList.bindServerListModify();
            EventList.bindServerListDelete();
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static serverAddClickEvent() {
        Dynamic.serverAddModal();
        // MODAL REGISTER EVENT
        EventList.bindServerListAdd();
        // MODAL DESTROY EVENT
        EventList.bindDestroyModal();
        // MODAL RESET EVENT
        EventList.bindResetModal();
    }

    static serverListAdd() {
        const inputIp = document.getElementById('srvr-place');
        const inputPort = document.getElementById('srvr-port');
        const inputLocation = document.getElementById('srvr-come-from');
        const inputId = document.getElementById('srvr-nickname');
        const inputPayment = document.getElementById('srvr-payment-day');
        const inputNote = document.getElementById('srvr-more-things');

        if( inputIp.value === '' || inputPort.value === '' || inputLocation.value === '' || inputId.value === ''  || inputPayment.value === '' || inputNote.value === '')
        {
            Dynamic.catchError('필수 정보가 누락되었습니다.');
            return false;
        }

        const sendObject = {
            ip : inputIp.value,
            port : inputPort.value,
            location : inputLocation.value,
            loginId : inputId.value,
            note : inputNote.value,
            payment : inputPayment.value
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.serverAdd);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( resultData.errorCode === 0 ) {
                Dynamic.catchError(resultData.msg);
                EventLogic.serverManageButtonClickEvent();
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static serverListModify(e) {
        const sendObject = {
            no : e.target.dataset.id
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.serverModifyRead);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.serverModifyModal(resultData.server);
            // MODAL REGISTER EVENT
            EventList.bindServerModifyReg();
            // MODAL DESTROY EVENT
            EventList.bindDestroyModal();
            // MODAL RESET EVENT
            EventList.bindResetModal();
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static serverModifyReg(e) {
        const inputIp = document.getElementById('srvr-place');
        const inputPort = document.getElementById('srvr-port');
        const inputLocation = document.getElementById('srvr-come-from');
        const inputId = document.getElementById('srvr-nickname');
        const inputPayment = document.getElementById('srvr-payment-day');
        const inputNote = document.getElementById('srvr-more-things');

        if( inputIp.value === '' || inputPort.value === '' || inputLocation.value === '' || inputId.value === ''  || inputPayment.value === '' || inputNote.value === '')
        {
            Dynamic.catchError('필수 정보가 누락되었습니다.');
            return false;
        }

        const sendObject = {
            no : e.target.dataset.no,
            ip : inputIp.value,
            port : inputPort.value,
            location : inputLocation.value,
            loginId : inputId.value,
            note : inputNote.value,
            payment : inputPayment.value
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.serverModify);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( resultData.errorCode === 0 ) {
                Dynamic.catchError(resultData.msg);
                EventLogic.serverManageButtonClickEvent();
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        }); 
    }

    static serverListDelete(e) {
        if(!confirm('정말로 삭제하시겠습니까?')) {
            return false;
        }

        const sendObject = {
            no : e.target.dataset.id
        }

        const promiseResult = Communication.postPromise(sendObject, communicationURL.serverListDelete);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( resultData.errorCode === 0 ) {
                Dynamic.catchError(resultData.msg);
                EventLogic.serverManageButtonClickEvent();
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }
    // SERVER MANAGEMENT EVENT
}

export { EventLogic };