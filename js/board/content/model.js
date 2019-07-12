import { Dynamic } from './controller.js';

const communicationURL = {
    boardDelete : `http://192.168.0.24:8080/board/delete`,
    commentWrite : `http://192.168.0.24:8080/board/comment/write`,
    commentModify : `http://192.168.0.24:8080/board/comment/modify`,
    commentDelete : `http://192.168.0.24:8080/board/comment/delete`
}

class Communication {
    static postPromise(url, sendtargetect) {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(sendtargetect));
        });
    }

    static getPromise(url) {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }
}

class EventLogic {
    static locationPreviousPage() {
        const previousPage = document.referrer.split('/');
        if( previousPage.indexOf('write') === -1 && previousPage.indexOf('modify') === -1) {
            window.history.back();
        } else {
            window.location.href='/board';
        }
    }

    static deleteBoard() {
        if( confirm('정말로 삭제하시겠습니까?') ) {
            const sendtargetect = {
                boardId : document.querySelector('.individual-board-title').dataset.boardId,
                uniqueId : document.querySelector('.individual-board-title').dataset.uniqueId
            };

            const promiseResult = Communication.postPromise(communicationURL.boardDelete, sendtargetect);
            promiseResult.then((result) => {

                const resultData = JSON.parse(result);
                Dynamic.catchError(resultData.msg);
                if( resultData.errorCode === 0 ) {
                    window.location.href = './board.html';
                }

            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            })
        }
    }

    static commentSizeCheck(e) {
        const eventTarget = e.target;
        const tagName = eventTarget.tagName;
        let targetSizeBox;
        let commentLength;

        switch (tagName) {
            case 'P':
                targetSizeBox = eventTarget.parentNode.parentNode.children[0].children[1];
                commentLength = eventTarget.innerText.trim().length;
                if( commentLength <= 500 ) {
                    targetSizeBox.innerText = `( ${commentLength} / 500 )`;
                } else {
                    eventTarget.innerText = eventTarget.innerText.slice(0,500).trim();
                    commentLength = eventTarget.innerText.length;
                    targetSizeBox.innerText = `( ${commentLength} / 500 )`;
                    Dynamic.catchError('댓글은 500자 이하까지 허용됩니다.');
                }
                break;
            
            case 'TEXTAREA':
                targetSizeBox = eventTarget.parentNode.children[0].children[1];
                commentLength = eventTarget.value.trim().length;
                if( commentLength <= 500 ) {
                    targetSizeBox.innerText = `( ${commentLength} / 500 )`;
                } else {
                    eventTarget.value = eventTarget.value.slice(0,500).trim();
                    commentLength = eventTarget.value.length;
                    targetSizeBox.innerText = `( ${commentLength} / 500 )`;
                    Dynamic.catchError('댓글은 500자 이하까지 허용됩니다.');
                }
                break;
    
            default:
                break;
        }
    }

    static checkCommentLength() {
        const commentContent = document.querySelector('.reply-some-words');
        if( commentContent.value.trim().length <= 0 ) {
            Dynamic.catchError('내용을 입력하세요.');
        } else if( commentContent.value.trim().length >= 500 ) {
            Dynamic.catchError('댓글은 500자까지 허용됩니다.');
        } else {
            EventLogic.commentRegister();
        }

    }

    static commentRegister() {
        const commentContent = document.querySelector('.reply-some-words');
        const sendObject = {
            board : {
                boardId : document.querySelector('.individual-board-title').dataset.boardId,
                uniqueId : document.querySelector('.individual-board-title').dataset.uniqueId
            },
            content : commentContent.value.trim()
        };
        
        const promiseResult = Communication.postPromise(communicationURL.commentWrite, sendObject);
    
        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            Dynamic.catchError(resultData.msg);
            if(resultData.errorCode === 0) {
                location.reload(true);
            }
        }, ()=>{
            Dynamic.catchError('서버와 통신이 원활하지않습니다.');
        });
    }

    static commentList(page) {
        const boardId = document.querySelector('.individual-board-title').dataset.boardId;
        const boardUniqueId = document.querySelector('.individual-board-title').dataset.uniqueId
        const promiseResult = Communication.getPromise(`http://192.168.0.24:8080/board/${boardId}/${boardUniqueId}/commentList/${page}`);

        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            Dynamic.createCommentList(resultData);
        }, () => {
            console.log('err');
        })
    }

    static commentModify(e) {
        const eventTarget = e.target;
        const modifyCommentId = eventTarget.parentNode.dataset.commentId;
        const commentContent = eventTarget.parentNode.nextSibling.nextSibling.children[0];
        const commentSizeCountBox = eventTarget.parentNode.children[1];
        const cancelButton = eventTarget.parentNode.children[4];

        if( eventTarget.innerText === '수정' ) {

            commentContent.style.border = '1px solid black';
            // 이전 데이터 저장
            commentContent.dataset.temp = commentContent.innerText.trim();
            // size 표시 부분 계산 및 활성화
            commentSizeCountBox.style.display = 'inline-block';
            commentSizeCountBox.innerText = `( ${commentContent.innerText.trim().length} / 500 )`;
            // 버튼 내부 내용변경
            eventTarget.innerText = '등록';
            // 댓글 수정 활성화
            commentContent.contentEditable = true;


            // input 이벤트 등록
            commentContent.addEventListener('input', EventLogic.commentSizeCheck);
            commentContent.focus();
            // 취소버튼 활성화
            cancelButton.style.display = 'inline-block';
        } else if( eventTarget.innerText === '등록' ) {
            if( commentContent.innerText.trim().length <= 0 || commentContent.innerText.trim().length > 500) {
                Dynamic.catchError('댓글은 1자 이상 500자 이하여야합니다.');
            } else if( commentContent.dataset.temp === commentContent.innerText.trim()) {
                Dynamic.catchError('수정된 내용이 없습니다.');
            } else {
                commentContent.style.border = 'none';

                const sendObject = {
                    commentId : modifyCommentId,
                    content : commentContent.innerText.trim(), 
                    commentUniqueId : eventTarget.parentNode.dataset.commentUniqueId
                    // 관리자 기능 완료 시 삭제 요망
                }
                
                const promiseResult = Communication.postPromise(communicationURL.commentModify, sendObject);
            
                promiseResult.then((result)=>{
                    const resultData = JSON.parse(result);
                    Dynamic.catchError(resultData.msg);
                    if(resultData.errorCode === 0) {
                        location.reload(true);
                    }
                }, ()=>{
                    Dynamic.catchError('서버와 통신이 원활하지않습니다.');
                });
            }
        }
    }

    static commentModifyCancel(e) {
        const eventTarget = e.target;

        const commentSizeCountBox = eventTarget.parentNode.children[1];
        const modifyButton = eventTarget.parentNode.children[3];
        const commentContent = eventTarget.parentNode.nextSibling.nextSibling.children[0];

        commentContent.style.border = 'none';
        // size 표시 비활성화
        commentSizeCountBox.style.display = 'none';
        // 수정버튼 표시
        modifyButton.innerText = '수정';
        // 취소버튼 비활성화
        eventTarget.style.display = 'none';
        // 이전 데이터로 되돌림
        commentContent.innerText = commentContent.dataset.temp;
        // 데이터 초기화
        commentContent.dataset.temp = '';
        // 댓글수정 비활성화
        commentContent.contentEditable = false;
    }

    static commentDelete(e) {
        const eventTarget = e.target;

        if(confirm('정말로 삭제하시겠습니까?')) {

            const sendObject = {
                commentId : eventTarget.parentNode.dataset.commentId,
                commentUniqueId : eventTarget.parentNode.dataset.commentUniqueId
            }
            
            const promiseResult = Communication.postPromise(communicationURL.commentDelete, sendObject);
        
            promiseResult.then((result)=>{
                const resultData = JSON.parse(result);
                Dynamic.catchError(resultData.msg);
                if(resultData.errorCode === 0) {
                    location.reload(true);
                }
            }, ()=>{
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            });
        }
    }

    static paginationEvent(e) {
        const pageNumber = e.target.dataset.pageNo;
        EventLogic.commentList(pageNumber);
    }
}

export { EventLogic };