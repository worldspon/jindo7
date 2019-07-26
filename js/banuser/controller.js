import { View } from './view.js';
import { EventLogic } from './model.js';

class Init {
    static getBanUserData() {
        EventLogic.getBanUserData();
    }
}

class Dynamic {
    static createBanUserBox(data) {
        View.createBanUserBox(data);
    }

    static createUserBlockModal() {
        View.createUserBlockModal();
    }

    static createBanUserTable(data) {
        View.createBanUserTable(data);
    }
    
    static destroyUserBlockModal(e) {
        View.destroyUserBlockModal(e.target);
    }

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindSearchBanUserEvent() {
        const searchButton = document.querySelector('.btn-suspend-id');
        searchButton.addEventListener('click', EventLogic.searchBanUser)
    }

    static bindSearchInputEnterEvent() {
        const searchInput = document.getElementById('suspend-user-id');
        searchInput.addEventListener('keydown', EventLogic.searchInputEnter);
    }

    static bindBlockUserRegisterEvent() {
        const blockRegisterButton = document.querySelector('.block-user-register');

        blockRegisterButton.addEventListener('click', Dynamic.createUserBlockModal);
    }

    static bindMemoPreventEnter() {
        const textArea = document.getElementById('memo');

        textArea.addEventListener('keydown', (e) => {
            if( e.keyCode === 13 ){
                e.preventDefault();
            }
        })
    }

    static bindModalCancelEvent() {
        const modalCancelButton = document.querySelector('.modal-cancel');
        modalCancelButton.addEventListener('click', Dynamic.destroyUserBlockModal);
    }

    static bindUserBlockEvent() {
        const modalConfirmButton = document.querySelector('.modal-confirm');
        modalConfirmButton.addEventListener('click', EventLogic.findUser);
    }

    static bindTableDataEditEvent() {
        const targetTable = document.querySelectorAll('.editable-data');

        for(const table of targetTable) {
            table.addEventListener('click', EventLogic.tableDataEdit);
        }
    }

    static bindReasonEditEvent(target) {
        target.addEventListener('keydown', EventLogic.reasonEdit);
    }

    static bindReasonFocusOutEvent(target) {
        target.addEventListener('focusout', EventLogic.reasonFocusOut)
    }

    static bindBanClearEvent() {
        const clearButton = document.querySelectorAll('.btn-clear');

        for(const button of clearButton) {
            button.addEventListener('click', EventLogic.banClear);
        }
    }
}

export { Init, Dynamic, EventList };