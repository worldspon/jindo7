import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventLogic.commonEventReg();
        EventList.bindLogoutEvent();
        EventList.bindShowTopButtonEvent();
        EventList.bindScrollTopEvent();
        EventList.bindSlideSubMenu();
        EventList.bindResizeHideMenuEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {

    static bindLogoutEvent() {
        const logoutButton = document.querySelector('.logout');
        logoutButton.addEventListener('click', EventLogic.logoutEvent);
    }

    static bindShowTopButtonEvent() {
        window.addEventListener('scroll', EventLogic.showTopButtonEvent);
    }

    static bindScrollTopEvent() {
        const btnTop = document.querySelector('.btn-top');
        btnTop.addEventListener('click', EventLogic.scrollTopEvent);
    }

    // mobile sub menu 펼침 이벤트
    static bindSlideSubMenu() {
        const mobileMenuList = document.querySelectorAll('.mobile-menu-main-list');
        for(const menu of mobileMenuList) {
            menu.addEventListener('click', EventLogic.showMobileSubMenu);
        }
    }
    static bindResizeHideMenuEvent() {
        window.addEventListener('resize', EventLogic.resizeFnc);
    }
}

export { Init, Dynamic };