'use strict';

const mainWrap = document.querySelector('.main-wrap');
const headerWrap = document.querySelector('.header-wrap');
const nav = document.querySelector('nav');
const navBg = document.querySelector('.sub-nav-bg');
const subMenu = document.querySelectorAll('.sub-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuImg = document.querySelector('.mobile-menu-img');
const mobileAfterMenuImg = document.querySelector('.mobile-menu-after-img');
const mobileMenuList = document.querySelectorAll('.mobile-menu-main-list');



// 접속시 screen size에 따른 event 등록/제거
commonEventReg();

window.addEventListener('resize', resizeFnc);


/**
 * @brief resize event 발생시 화면에 맞는 event로 갱신
 * @author JJH
 */
function resizeFnc() {
    // resize시 열려있는 모든 서브 메뉴를 닫음 //
    hideSubMenu();
    hideMobileMenu();
    //--------------------------------------//

    if(window.innerWidth <= 500 ){
        commonEventReg();
    }else if(window.innerWidth <= 960 ){
        commonEventReg();
    }else {
        commonEventReg();
    }
}

/**
 * @brief 첫접속 또는 resize시 현재 화면 크기에 따라 nav event, mobile menu event를 추가/제거하는 함수
 * @author JJH
 */
function commonEventReg() {
    if(window.innerWidth <= 960) {
        nav.removeEventListener('mouseover',showSubMenu);
        navBg.removeEventListener('mouseout', hideSubMenu);
        mobileMenuImg.addEventListener('click', showMobileMenu);
    } else {
        nav.addEventListener('mouseover', showSubMenu);
        navBg.addEventListener('mouseout', hideSubMenu);
        mobileMenuImg.removeEventListener('click', showMobileMenu);
    }
};

/**
 * @brief nav mouseover시 menu가 나타나게하는 함수
 * @author JJH
 */
function showSubMenu() {
    if(window.innerWidth > 1300) {
        navBg.style.height = '140px';
    } else {
        navBg.style.height = '180px';
    }

    headerWrap.style.boxShadow = 'none';
    Array.from(subMenu).forEach((el)=>{
        el.style.display = 'block';
    });

    navBg.style.display = 'block';
};


/**
 * @brief sub nav bg에 mouseout시 menu를 숨기는 함수
 * @author JJH
 */
function hideSubMenu() {
    headerWrap.style.boxShadow = '2px 5px 5px -1px #f0f4fb';
    Array.from(subMenu).forEach((el)=>{
        el.style.display = 'none';
    });
    navBg.style.display = 'none';
};


/**
 * @brief mobile menu img click시 mobile menu를 보여주는 함수
 * @author JJH
 */
function showMobileMenu() {
    mobileMenu.style.display = 'block';
    mobileMenu.style.right = '0px';
    mobileMenu.classList.remove('mobile-menu-slide-out');
    mobileMenu.classList.add('mobile-menu-slide-in');
    mainWrap.addEventListener('click', hideMobileMenu, true);
    mobileAfterMenuImg.addEventListener('click',hideMobileMenu, true);
};


/**
 * @brief mobile after menu img click시 mobile menu를 숨기는 함수
 * @author JJH
 */
function hideMobileMenu() {
    mobileMenu.style.right = '-9999px';
    mobileMenu.classList.remove('mobile-menu-slide-in');
    mobileMenu.classList.add('mobile-menu-slide-out');
    mainWrap.removeEventListener('click', hideMobileMenu, true);
    mobileAfterMenuImg.removeEventListener('click',hideMobileMenu, true);
};


Array.from(mobileMenuList).forEach((el) => {
    el.addEventListener('click',()=>{showMobileSubMenu(el)}, true);
});

function showMobileSubMenu(el) {
    if(el.nextSibling.nextSibling!=null) {
        if(el.nextSibling.nextSibling.style.display=='') {
            el.nextSibling.nextSibling.style.display = 'block'
        }else if(el.nextSibling.nextSibling.style.display=='block') {
            el.nextSibling.nextSibling.style.display = 'none'
        }else if(el.nextSibling.nextSibling.style.display=='none') {
            el.nextSibling.nextSibling.style.display = 'block'
        }
    }
};