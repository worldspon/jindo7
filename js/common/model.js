import { Dynamic } from './controller.js';

const communicationURL = `/logout`;

class Communication {
    static getPromise(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        })
    }
}

class EventLogic {

    // 첫 접속, RESIZE 마다 화면 크기별 MENU EVENT BIND
    static commonEventReg() {
        const nav = document.querySelector('nav');
        const navBg = document.querySelector('.sub-nav-bg');
        const mobileMenuImg = document.querySelector('.mobile-menu-img');

        if(window.innerWidth <= 1040) {
            nav.removeEventListener('mouseover', EventLogic.showSubMenu);
            navBg.removeEventListener('mouseout', EventLogic.hideSubMenu);
            mobileMenuImg.addEventListener('click', EventLogic.showMobileMenu);
        } else {
            nav.addEventListener('mouseover', EventLogic.showSubMenu);
            navBg.addEventListener('mouseout', EventLogic.hideSubMenu);
            mobileMenuImg.removeEventListener('click', EventLogic.showMobileMenu);
        }
    };

    static showSubMenu() {
        const headerWrap = document.querySelector('.header-wrap');
        const navBg = document.querySelector('.sub-nav-bg');
        const subMenu = document.querySelectorAll('.sub-menu');

        if(window.innerWidth > 1450) {
            navBg.style.height = '150px';
        } else {
            navBg.style.height = '190px';
        }

        headerWrap.style.boxShadow = 'none';

        for(const menu of subMenu) {
            menu.style.display = 'block';
        }

        navBg.style.display = 'block';
    };

    static hideSubMenu() {
        const headerWrap = document.querySelector('.header-wrap');
        const navBg = document.querySelector('.sub-nav-bg');
        const subMenu = document.querySelectorAll('.sub-menu');

        headerWrap.style.boxShadow = '2px 5px 5px -1px #f0f4fb';

        for(const menu of subMenu) {
            menu.style.display = 'none';
        }

        navBg.style.display = 'none';
    };

    static showMobileMenu() {
        const mainWrap = document.querySelector('.main-wrap');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileAfterMenuImg = document.querySelector('.mobile-menu-after-img');
        mobileMenu.style.display = 'block';
        mobileMenu.style.right = '0px';
        mobileMenu.classList.remove('mobile-menu-slide-out');
        mobileMenu.classList.add('mobile-menu-slide-in');
        mainWrap.addEventListener('click', EventLogic.hideMobileMenu);
        mobileAfterMenuImg.addEventListener('click',EventLogic.hideMobileMenu);
    };

    static hideMobileMenu() {
        const mainWrap = document.querySelector('.main-wrap');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileAfterMenuImg = document.querySelector('.mobile-menu-after-img');
        mobileMenu.style.right = '-9999px';
        mobileMenu.classList.remove('mobile-menu-slide-in');
        mobileMenu.classList.add('mobile-menu-slide-out');
        mainWrap.removeEventListener('click', EventLogic.hideMobileMenu);
        mobileAfterMenuImg.removeEventListener('click', EventLogic.hideMobileMenu);
    };

    
    // MOBILE MENU 제목 클릭 시 하위 CATEGORY TOGGLE
    static showMobileSubMenu(e) {
        const eventTarget = e.target;
        if(eventTarget.nextSibling.nextSibling!=null) {
            if(eventTarget.nextSibling.nextSibling.style.display=='') {
                eventTarget.nextSibling.nextSibling.style.display = 'block'
            }else if(eventTarget.nextSibling.nextSibling.style.display=='block') {
                eventTarget.nextSibling.nextSibling.style.display = 'none'
            }else if(eventTarget.nextSibling.nextSibling.style.display=='none') {
                eventTarget.nextSibling.nextSibling.style.display = 'block'
            }
        }
    };

    static logoutEvent() {
        const promiseResult = Communication.getPromise(communicationURL);

        promiseResult.then((result) => {
            const resultData = JSON.parse(result);
            Dynamic.catchError(resultData.msg);
            window.location.href = resultData.location;
        }, () => {
            Dynamic.catchError('통신이 원활하지 않습니다. 다시 시도해주세요.');
            window.location.reload();
        });
    }

    // SCROLL DOWN -> SHOW TOP BUTTON
    static showTopButtonEvent() {
        const btnTop = document.querySelector('.btn-top');

        window.addEventListener('scroll', ()=>{
            if(window.scrollY > 200) {
                btnTop.style.display = 'block';
            }
        
            if(window.scrollY < 200) {
                btnTop.style.display = 'none';
            }
        });
    }

    // CLICK TOP BUTTON EVENT
    static scrollTopEvent() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // RESIZE시 화면 별 MENU EVNET BIND
    static resizeFnc() {
        // resize시 열려있는 모든 서브 메뉴를 닫음 //
        EventLogic.hideSubMenu();
        EventLogic.hideMobileMenu();
        //--------------------------------------//

        if(window.innerWidth <= 500 ){
            EventLogic.commonEventReg();
        }else if(window.innerWidth <= 960 ){
            EventLogic.commonEventReg();
        }else {
            EventLogic.commonEventReg();
        }
    }
}

export { EventLogic };