import { Dynamic, EventList } from './controller.js';

const pointListState = {
    state : null
}

const pointChangeState = {
    uniqueId : null, 
	state : null
}

const communicationURL = {
    point : '/management/point',
    pointChange : '/management/point/change',
    memo : '/management/point/memo',
    p2p : '/management/p2p',
    p2pConflict : '/management/p2p/conflict',
    p2pResolution : '/management/p2p/conflict/resolution',
    findPw : '/management/find/password',
    adList : '/management/ad',
    adFindAccount : '/management/ad/find/account',
    adListAdd : '/management/ad/add',
    adListDelete : '/management/ad/delete',
    adModifyRead : '/management/ad/read',
    adModify : '/management/ad/modify',
    server : '/management/server',
    serverAdd : '/management/server/add',
    serverModifyRead : '/management/server/read',
    serverModify : '/management/server/modify',
    serverListDelete : '/management/server/delete'
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

class EventLogic {
    // 카테고리 버튼 클릭시 색상변경
    static categoryButtonColorEvent(e) {
        const categoryButton = document.querySelectorAll('.sorted-content-box > button');
        for(const button of categoryButton) {
            button.classList.remove('on');
        }
        e.target.classList.add('on');
    }

    // 창 크기에 맞게 TABLE 크게 조정
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
    // 포인트 테이블 데이터 통신
    static pointButtonClickEvent(e) {
        pointListState.state = parseInt(e.target.dataset.state);
        const promiseResult = Communication.postPromise(pointListState, communicationURL.point);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.pointBox(resultData.pointList, pointListState.state);
            EventList.bindChangeDateButtonClickEvent();
            EventList.bindSearchButtonClickEvent();
            EventList.bindSearchButtonEnterKeyEvent();
            EventList.bindPointListCheckBoxClickEvent();
            EventList.bindMemoSectionClickEvent();
            EventList.bindPointListButtonClickEvent();
            EventList.bindPointStateChangeEvent();
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    // 포인트 상세내역 버튼 클릭시 통신
    static pointListButtonClickEvent(e) {

        for(const allButton of e.target.parentNode.children) {
            allButton.classList.remove('active');
        }
        e.target.classList.add('active');

        const parentNode = document.querySelector('.serviceadmin-content-box');
        const memoBox = document.querySelector('.memo-box');

        if( memoBox !== null ) {
            parentNode.removeChild(memoBox);
        }

        pointListState.state = parseInt(e.target.dataset.state);
        const promiseResult = Communication.postPromise(pointListState, communicationURL.point);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result).pointList;
            Dynamic.pointTable(resultData, pointListState.state);
            EventList.bindPointListCheckBoxClickEvent();
            EventList.bindMemoSectionClickEvent();
            if( pointListState.state === 0 ) EventList.bindPointStateChangeEvent();
            else {
                EventList.bindPointRestoreClickEvent();
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        })
    }

    static changeDateClickEvent() {
        const dateCategory = document.querySelector('.date-select');
        const selectOption = document.querySelectorAll('.date-select > option');
        const selectedOption = selectOption[dateCategory.selectedIndex].value;
        const dateInput = document.querySelector('.date-input');
        const dateInputValue = dateInput.value;

        const active = document.querySelector('.active');
        pointListState.state = parseInt(active.dataset.state);

        if( dateInputValue === '' ) {
            active.dispatchEvent(new Event('click'));
        } else if( selectedOption === 'request' ) {
            const promiseResult = Communication.postPromise(pointListState, communicationURL.point);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result).pointList;
                let dateFilter;

                dateFilter = resultData.filter(resultData => resultData.dateTime.slice(0,10) === dateInputValue);
                Dynamic.pointTable(dateFilter, pointListState.state);
                EventList.bindPointListCheckBoxClickEvent();
                EventList.bindMemoSectionClickEvent();

                if( pointListState.state === 0 ) {
                    EventList.bindPointStateChangeEvent();
                } else {
                    EventList.bindPointRestoreClickEvent();
                }
            
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            })
        } else if( selectedOption === 'action' ) {
            if( pointListState.state === 0 ) {
                Dynamic.catchError('실행일 검색은 승인/거절내역에서 가능합니다.');
            } else {
                const promiseResult = Communication.postPromise(pointListState, communicationURL.point);
                promiseResult.then((result) => {
                    const resultData = JSON.parse(result).pointList;
                    const year = dateInputValue.slice(0, dateInputValue.indexOf('-'));
                    const month = dateInputValue.slice(dateInputValue.indexOf('-')+1, dateInputValue.lastIndexOf('-'));
                    const day = dateInputValue.slice(dateInputValue.lastIndexOf('-')+1);
                    const selectedDate = `${year}년 ${month}월 ${day}일`;

                    let dateFilter;
    
                    dateFilter = resultData.filter(resultData => resultData.resultTime.slice(0,13) === selectedDate);
                    Dynamic.pointTable(dateFilter, pointListState.state);
                    EventList.bindPointListCheckBoxClickEvent();
                    EventList.bindMemoSectionClickEvent();
    
                    if( pointListState.state === 0 ) {
                        EventList.bindPointStateChangeEvent();
                    } else {
                        EventList.bindPointRestoreClickEvent();
                    }
                
                }, () => {
                    Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
                })
            }
        }
    }

    static searchButtonClickEvent() {
        const searchCategory = document.querySelector('.search-select');
        const selectOption = document.querySelectorAll('.search-select > option');
        const selectedOption = selectOption[searchCategory.selectedIndex].value;
        const searchInput = document.querySelector('.search-input');
        const searchInputValue = searchInput.value;
        const active = document.querySelector('.active');
        pointListState.state = parseInt(active.dataset.state);

        if( searchInputValue === '' ) {
            Dynamic.catchError('검색어를 입력해주세요.');
        } else {
            const promiseResult = Communication.postPromise(pointListState, communicationURL.point);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result).pointList;
                let searchFilter;

                if(selectedOption === 'id') {
                    searchFilter = resultData.filter(resultData => resultData.trademark === searchInputValue.toUpperCase());
                } else if(selectedOption === 'phone') {
                    searchFilter = resultData.filter(resultData => resultData.phone === searchInputValue);
                } else if(selectedOption === 'accountHolder') {
                    searchFilter = resultData.filter(resultData => resultData.bankUser === searchInputValue);
                }
                searchInput.value = '';
                Dynamic.pointTable(searchFilter, pointListState.state);
                EventList.bindPointListCheckBoxClickEvent();
                EventList.bindMemoSectionClickEvent();
                if( pointListState.state === 0 ) {
                    EventList.bindPointStateChangeEvent();
                } else {
                    EventList.bindPointRestoreClickEvent();
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
            })

        }
    }

    // CHECKBOX 선택시 색상 변경
    static pointListCheckBoxClickEvent(e) {
        const tableTR = e.target.parentNode.parentNode;
        e.target.checked ? tableTR.classList.add('point-list-on-hover') : tableTR.classList.remove('point-list-on-hover');
    }

    // 메모박스 추가
    static memoSectionClickEvent(e) {
        const targetNo = e.target.parentNode.children[1].innerText;
        const parentNode = document.querySelector('.serviceadmin-content-box');
        const prevMemoBox = document.querySelector('.memo-box');
        if( prevMemoBox === null ) {
            const memoText = e.target.dataset.memo;
            const memoBox = document.createElement('div');
            memoBox.classList.add('memo-box');
            memoBox.style.top = e.clientY+'px';
            memoBox.style.left = e.clientX + 'px';
            memoBox.innerHTML = 
            `<textarea class="memo-textarea">${memoText}</textarea>
            <button class="memo-button memo-register" data-no="${targetNo}">등록</button>
            <button class="memo-button memo-destroy">취소</button>
            <span style="float:right; color: black; font-size: 1.2rem; font-weight: bold;">No.${targetNo} MEMO</span>`;
            parentNode.appendChild(memoBox);
            EventList.bindMemoRegister();
            EventList.bindMemoBoxDestroy();
        }
    }

    static memoRegister(e) {
        const active = document.querySelector('.active');
        pointListState.state = parseInt(active.dataset.state);

        const sendObject = {
            uniqueId : e.target.dataset.no,
            memo : e.target.previousSibling.previousSibling.value
        }
        const promiseResult = Communication.postPromise(sendObject, communicationURL.memo);
        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            if( resultData.errorCode === 0 ) {
                Dynamic.catchError(resultData.msg);
                EventLogic.memoBoxDestroy(e);
                if( pointListState.state === 0 ) {
                    document.querySelector('.apply-list').dispatchEvent(new Event('click'));
                } else if( pointListState.state === 1 ) {
                    document.querySelector('.confirm-list').dispatchEvent(new Event('click'));
                } else if( pointListState.state === 2 ) {
                    document.querySelector('.cancel-list').dispatchEvent(new Event('click'));
                }
            } else {
                Dynamic.catchError(resultData.msg);
            }
        }, () => {
            Dynamic.catchError('서버와 통신이 원활하지 않습니다.');
        });
    }

    static memoBoxDestroy(e) {
        const parentNode = e.target.parentNode.parentNode;
        parentNode.removeChild(e.target.parentNode);
    }

    // 승인 버튼 클릭시 통신
    static pointConfirmClickEvent(e) {
        const targetTR = e.target.parentNode.parentNode;
        const uniqueId = targetTR.children[1].innerText;
        const requestDate = targetTR.children[2].innerText;
        const id = targetTR.children[3].innerText;
        const point = targetTR.children[5].innerText;
        const bank = targetTR.children[6].innerText;
        const bankuser = targetTR.children[7].innerText;

        if(confirm(`정말로 승인하시겠습니까?\n${uniqueId}번 ${requestDate}\n${id} ${point}\n${bankuser} ${bank}`)) {
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

    // 거절 버튼 클릭시 통신
    static pointRejectClickEvent(e) {
        const targetTR = e.target.parentNode.parentNode;
        const uniqueId = targetTR.children[1].innerText;
        const requestDate = targetTR.children[2].innerText;
        const id = targetTR.children[3].innerText;
        const point = targetTR.children[5].innerText;
        const bank = targetTR.children[6].innerText;
        const bankuser = targetTR.children[7].innerText;

        if(confirm(`정말로 거절하시겠습니까?\n${uniqueId}번 ${requestDate}\n${id} ${point}\n${bankuser} ${bank}`)) {
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

    // 되돌리기 버튼 클릭시 통신
    static pointRestoreClickEvent(e) {
        const targetTR = e.target.parentNode.parentNode;
        const uniqueId = targetTR.children[1].innerText;
        const id = targetTR.children[3].innerText;
        const point = targetTR.children[5].innerText;
        const bank = targetTR.children[6].innerText;
        const bankuser = targetTR.children[7].innerText;

        if(confirm(`정말로 되돌리시겠습니까?\n${id} ${point}\n${bank} ${bankuser}`)) {
            pointChangeState.uniqueId = uniqueId;
            pointChangeState.state = 0;

            const promiseResult = Communication.postPromise(pointChangeState, communicationURL.pointChange);
            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                if( resultData.errorCode === 6 ) {
                    Dynamic.catchError(resultData.msg);
                    if( e.target.dataset.state === '1' ) {
                        document.querySelector('.confirm-list').dispatchEvent(new Event('click'));
                    } else if ( e.target.dataset.state === '2' ) {
                        document.querySelector('.cancel-list').dispatchEvent(new Event('click'));
                    }
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
    // P2P 테이블 데이터 통신
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

    // P2P list 버튼 색상 변경
    static p2pButtonColorChange(buttonList, target) {
        for(const button of buttonList) {
            button.classList.remove('alive');
        }
        target.classList.add('alive');
    }

    // P2P 모든 거래내역 데이터 통신
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

    // P2P 분쟁상태 내역 데이터 통신
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

    // P2P 분쟁 처리 데이터 통신
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
    // P2P EVENT LOGIC

    // ADMIN FIND PASSWORD EVENT LOGIC
    // 관리자용비밀번호 버튼 클릭시 HTML 표현
    static adminFindPwButtonClickEvent() {
        Dynamic.adminFindPwBox();
        EventList.bindFindPwCategoryClickEvent();
    }

    // 검색 버튼 클릭시 해당 데이터에 맞는 통신 호출
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
    // ADMIN FIND PASSWORD EVENT LOGIC

    // AD SUPPLIER EVENT
    // 광고공급자관리 버튼 클릭시 데이터 통신
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

    // 계정확인 버튼 클릭시 데이터 통신
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

    // 광고공급자 추가버튼 클릭시 모달 활성화 및 이벤트 등록
    static adSupplierAddClickEvent() {
        Dynamic.adAddModal();
        // MODAL REGISTER EVENT
        EventList.bindAdListAdd();
        // MODAL DESTROY EVENT
        EventList.bindDestroyModal();
        // MODAL RESET EVENT
        EventList.bindResetModal();
    }

    // MODAL 추가 등록버튼 클릭시 데이터 통신
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

    // 수정버튼 클릭시 모달 활성화 및 이벤트 등록
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

    // MODAL 수정 데이터 등록버튼 클릭시 데이터 통신
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

    // 삭제 버튼 클릭시 데이터 통신
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
    // AD SUPPLIER EVENT

    // SERVER MANAGEMENT EVENT
    // 서버관리 버튼 클릭시 데이터 통신
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

    // 서버관리 추가 버튼 클릭시 MODAL 활성화 및 이벤트 등록
    static serverAddClickEvent() {
        Dynamic.serverAddModal();
        // MODAL REGISTER EVENT
        EventList.bindServerListAdd();
        // MODAL DESTROY EVENT
        EventList.bindDestroyModal();
        // MODAL RESET EVENT
        EventList.bindResetModal();
    }

    // MODAL 서버 추가 등록버튼 클릭시 데이터 통신
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

    // 서버 리스트 수정 버튼 클릭시 MODAL 활성화 및 이벤트 등록
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

    // 서버 리스트 수정데이터 등록 버튼 클릭시 데이터 통신
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

    // 서버 리스트 삭제 버튼 클릭시 데이터 통신
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