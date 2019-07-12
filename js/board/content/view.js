import { EventList } from './controller.js'

class View {
    static createCommentList(data) {
        let commentHTML = ``;
        for(const el of data.commentList) {
            commentHTML += `
            <div class='board-reply-history border-bottom'>
                <div class='own-smart-name' data-comment-id="${el.commentId}" data-comment-unique-id="${el.commentUniqueId}">
                    <span>${el.userName}</span>
                    <span class="reply-input-size">(0 / 500)</span>
                    ${el.commentBtnFlag ? '<button class="reply-del">삭제</button>' : ''}
                    ${el.commentBtnFlag ? '<button class="reply-mod">수정</button>' : ''}
                    ${el.commentBtnFlag ? '<button class="reply-cancel">취소</button>' : ''}
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