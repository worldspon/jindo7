import { EventList } from './controller.js'

class View {
    static createSubMenu(coordinate, target) {
        const prevSubMenu = document.querySelector('.user-sub-menu');
        const isBlocked = Boolean(parseInt(target.dataset.blocked));

        if( prevSubMenu !== null ) {
            prevSubMenu.remove();
        }
        const body = document.querySelector('body');
        const subMenu = document.createElement('div');
        subMenu.classList.add('user-sub-menu');
        subMenu.style.top = coordinate.y + 'px';
        subMenu.style.left = coordinate.x + 'px';

        const firstDiv = document.createElement('div');
        
        if( isBlocked ) {
            firstDiv.classList.add('user-clear');
            firstDiv.innerText = '정지해제';
        } else {
            firstDiv.classList.add('user-block');
            firstDiv.innerText = '회원정지';
        }

        firstDiv.dataset.id = target.innerText.trim().toUpperCase();

        const secondDiv = document.createElement('div');
        secondDiv.classList.add('close-sub-menu');
        secondDiv.innerText = '닫기';
    
        subMenu.appendChild(firstDiv);
        subMenu.appendChild(secondDiv);
        body.appendChild(subMenu);

        EventList.bindCloseSubMenuEvent();
        isBlocked ? EventList.bindUserClear() : EventList.bindUserBlockModalEvent();
    }

    static destroySubMenu(e) {
        e.target.parentNode.remove();
    }

    static createUserBlockModal(target) {
        const subMenu = document.querySelector('.user-sub-menu');
        const prevModal = document.querySelector('.user-modal-background');

        if( subMenu !== null ) {
            subMenu.remove();
        }

        if(prevModal !== null) {
            prevModal.remove();
        }

        const body = document.querySelector('body');
        const blockModal = document.createElement('div')
        blockModal.classList.add('user-modal-background');

        blockModal.innerHTML = 
        `<div class="user-block-modal">
            <div class="radio-box">
                <span>정지기간 : </span>
                <input type="radio" id="block-day" name="block-period" value="1" checked="true">
                <label for="block-day">1일</label>
            
                <input type="radio" id="block-week" name="block-period" value="7">
                <label for="block-week">7일</label>
            
                <input type="radio" id="block-month" name="block-period" value="30">
                <label for="block-month">30일</label>
            </div>
            <p class="block-user">대상유저 : ${target.dataset.id}</p>
            <label for="memo">재제사유</label>
            <textarea id="memo" placeholder="사유를 적어주세요." maxlength="600"></textarea>
            <div class="user-block-button-box">
                <button class="modal-cancel">취소</button>
                <button class="modal-confirm" data-id="${target.dataset.id}">확인</button>
            </div>
        </div>`;

        body.appendChild(blockModal);
        EventList.bindMemoPreventEnter();
        EventList.bindUserBlockEvent();
        EventList.bindModalCancelEvent();
    }

    static destroyUserBlockModal(target) {
        target.parentNode.parentNode.parentNode.remove();
    }

    static createCommentList(data) {
        let commentHTML = ``;
        for(const el of data.commentList) {
            commentHTML += `
            <div class='board-reply-history border-bottom'>
                <div class='own-smart-name' data-comment-id="${el.commentId}" data-comment-unique-id="${el.commentUniqueId}">
                    <span class="user-smart-id" data-blocked="${el.block}">${el.userName}</span>
                    <span class="reply-input-size">(0 / 500)</span>
                    ${el.commentBtnFlag && !el.block ? '<button class="reply-del">삭제</button>' : ''}
                    ${el.commentBtnFlag && !el.block ? '<button class="reply-mod">수정</button>' : ''}
                    ${el.commentBtnFlag && !el.block ? '<button class="reply-cancel">취소</button>' : ''}
                </div>
                <div class='board-view-reply'>
                    <p>${el.content}</p>
                </div>
            </div>`;
        }

        commentHTML += View.createCommentPagination(data);

        document.querySelector('.see-reply-box').innerHTML = commentHTML;

        EventList.bindCommentModifyEvent();
        EventList.bindCommentModifyCancelEvent();
        EventList.bindCommentDeleteEvent();
        EventList.bindPaginationEvent();
        EventList.bindUserSubMenuEvent();
    }

    static createCommentPagination(data) {
        const paginationObject = data.pagination;
        let paginationHTML = ``;

        paginationHTML = `
        <div class='pagination'>
            <img class="first-btn page-btn pagination-element" id="first-btn" src="/images/first.png" alt="" data-page-no='${paginationObject.firstPage}'>
            <img class="prev-btn page-btn pagination-element" id="prev-btn" src="/images/prev.png" alt="" data-page-no='${paginationObject.prevPage}'>
            <ul class='pagination-inner'>`;

        for(const page of paginationObject.pages) {
            paginationHTML += 
            `<a class='page-number pagination-element' data-page-no='${page - 1}'>
                <li style="${page === (paginationObject.nowPage + 1) ? 'font-weight: bold;' : ''}" data-page-no='${page - 1}'>${page}</li>
            </a>`;
        }

        paginationHTML += `
            </ul>
            <img class="next-btn page-btn pagination-element" id="next-btn" src="/images/next.png" alt="" data-page-no='${paginationObject.nextPage}'>
            <img class="last-btn page-btn pagination-element" id="last-btn" src="/images/last.png" alt="" data-page-no='${paginationObject.lastPage}'>
        </div>`;

        return paginationHTML;
    }
    static viewAlert(msg) {
        alert(msg);
    }
}

export { View };