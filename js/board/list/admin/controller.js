import { EventLogic } from './model.js'
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindUserSubMenuEvent();
    }
}

class Dynamic {
    static createSubMenu(coordinate, target) {
        View.createSubMenu(coordinate, target);
    }

    static destroySubMenu(e) {
        View.destroySubMenu(e);
    }

    static createUserBlockModal(e) {
        View.createUserBlockModal(e.target);
    }

    static destroyUserBlockModal(e) {
        View.destroyUserBlockModal(e.target);
    }

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindUserSubMenuEvent() {
        const users = document.querySelectorAll('.board-content-writer');

        for( const user of users ) {
            user.addEventListener('click', EventLogic.userSubMenu);
        }
    }

    static bindCloseSubMenuEvent() {
        const closeSubMenu = document.querySelector('.close-sub-menu');

        closeSubMenu.addEventListener('click', Dynamic.destroySubMenu);
    }

    static bindUserClear() {
        const userClearButton = document.querySelector('.user-clear');

        userClearButton.addEventListener('click', EventLogic.userClear);
    }

    static bindUserBlockModalEvent() {
        const userBlockButton = document.querySelector('.user-block');       
        userBlockButton.addEventListener('click', Dynamic.createUserBlockModal);
    }

    static bindMemoPreventEnter() {
        const textArea = document.getElementById('memo');

        textArea.addEventListener('keydown', (e) => {
            if( e.keyCode === 13 ){
                e.preventDefault();
            }
        })
    }

    static bindUserBlockEvent() {
        const modalConfirmButton = document.querySelector('.modal-confirm');
        modalConfirmButton.addEventListener('click', EventLogic.userBlock);
    }

    static bindModalCancelEvent() {
        const modalCancelButton = document.querySelector('.modal-cancel');
        modalCancelButton.addEventListener('click', Dynamic.destroyUserBlockModal);
    }
}

export { Init, Dynamic, EventList };