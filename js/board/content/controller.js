import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindListButtonClickEvent();
        EventList.bindDeleteButtonClickEvent();
        EventList.bindCommentInputEvent();
        EventList.bindCommentRegisterClickEvent();
        EventList.setCommentList();
    }
}

class Dynamic {
    static createCommentList(data) {
        View.createCommentList(data);
    }

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindListButtonClickEvent() {
        const listButton = document.querySelector('.btn-board-list');
        listButton.addEventListener('click', EventLogic.locationPreviousPage);
    }

    static bindDeleteButtonClickEvent() {
        const deleteButton = document.querySelector('.btn-del');

        if( deleteButton !== null ) {
            deleteButton.addEventListener('click', EventLogic.deleteBoard);
        }
    }

    static bindCommentInputEvent() {
        const commentInputBox = document.querySelector('.reply-some-words');

        commentInputBox.addEventListener('input', EventLogic.commentSizeCheck);
    }

    static bindCommentRegisterClickEvent() {
        const commentRegisterButton = document.querySelector('.board-reply-upload');

        commentRegisterButton.addEventListener('click', EventLogic.checkCommentLength);
    }

    static setCommentList(page = 0) {
        EventLogic.commentList(page);
    }

    static bindCommentModifyEvent() {
        const commentModifyButton = document.querySelectorAll('.reply-mod');

        for(const button of commentModifyButton) {
            button.addEventListener('click', EventLogic.commentModify);
        }
    }

    static bindCommentModifyCancelEvent() {
        const commentModifyCancelButton = document.querySelectorAll('.reply-cancel');

        for(const button of commentModifyCancelButton) {
            button.addEventListener('click', EventLogic.commentModifyCancel);
        }
    }

    static bindCommentDeleteEvent() {
        const commentDeleteButton = document.querySelectorAll('.reply-del');
        
        for(const button of commentDeleteButton) {
            button.addEventListener('click', EventLogic.commentDelete);
        }
    }

    static bindPaginationEvent() {
        const paginationElement = document.getElementsByClassName('pagination-element');

        for(const pageButton of paginationElement) {
            pageButton.addEventListener('click', EventLogic.paginationEvent);
        }
    }
}

export { Init, Dynamic, EventList };