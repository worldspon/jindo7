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

window.addEventListener('resize', () => {
    hideSubMenu();
    hideMobileMenu();
    if(window.innerWidth <= 500 ){
        commonEventReg();
    }else if(window.innerWidth <= 960 ){
        commonEventReg();
    }else {
        commonEventReg();
    }
});


function commonEventReg() {
    if(window.innerWidth <= 960) {
        nav.removeEventListener('mouseover',showSubMenu, true);
        navBg.removeEventListener('mouseout', hideSubMenu, true);
        mobileMenuImg.addEventListener('click', showMobileMenu, true);
    } else {
        nav.addEventListener('mouseover', showSubMenu, true);
        navBg.addEventListener('mouseout', hideSubMenu, true);
        mobileMenuImg.removeEventListener('click', showMobileMenu, true);
    }
};

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

function hideSubMenu() {
    headerWrap.style.boxShadow = '2px 5px 5px -1px #f0f4fb';
    Array.from(subMenu).forEach((el)=>{
        el.style.display = 'none';
    });
    navBg.style.display = 'none';
};

function showMobileMenu() {
    mobileMenu.style.display = 'block';
    mobileMenu.style.right = '0px';
    mobileMenu.classList.remove('mobile-menu-slide-out');
    mobileMenu.classList.add('mobile-menu-slide-in');
    mainWrap.addEventListener('click', hideMobileMenu, true);
    mobileAfterMenuImg.addEventListener('click',hideMobileMenu, true);
};

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