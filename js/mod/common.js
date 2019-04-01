'use strict';

var headerWrap = document.querySelector('.header-wrap');
headerWrap.innerHTML = "<header>\n<div class='logo-box'>\n    <a href='./index.html'><img src='./images/header_logo.png' alt='main-logo'></a>\n</div>\n<!-- nav start -->\n<nav>\n    <!-- mobile menu image -->\n    <img src=\"./images/menu.png\" alt=\"mobile-menu-image\" class='mobile-menu-img'>\n\n    <!-- nav main menu list start -->\n    <ul class='main-menu'>\n        <li>\n            <a href='./adprofit.html' class='ad-profit-nav'>\uAD11\uACE0\uC218\uC775</a>\n        </li>\n        <li class='pc-notice-menu'>\n            <a href='noticeall.html'>\uACF5\uC9C0\uC0AC\uD56D</a>\n            <ul class='notice-sub-menu sub-menu'>\n                <li>\n                    <a href='javscript:void(0);' data-notice=\"notice\">\uACF5\uC9C0\uC0AC\uD56D</a>\n                </li>\n                <li>\n                    <a href='javscript:void(0);' data-notice=\"update\">\uC5C5\uB370\uC774\uD2B8</a>\n                </li>\n                <li>\n                    <a href='javscript:void(0);' data-notice=\"event\">\uC774\uBCA4\uD2B8</a>\n                </li>\n            </ul>\n        </li>\n        <li>\n            <a href='./faq.html' class='faq-nav'>FAQ</a>\n        </li>\n        <li>\n            <a href='directq.html' class='support-nav'>1:1\uBB38\uC758</a>\n            <ul class='support-sub-menu sub-menu'>\n                <li>\n                    <a href='directq.html'>\uBB38\uC758\uD558\uAE30</a>\n                </li>\n                <li>\n                    <a href='myq.html'>\uB0B4\uBB38\uC758</a>\n                </li>\n            </ul>\n        </li>\n        <li>\n            <a href='result.html' class='game-result-nav'>\uAC8C\uC784\uACB0\uACFC</a>\n        </li>\n    </ul>\n    <!-- nav main menu list end -->\n</nav>\n<!-- nav end -->\n\n\n<div class='user-info'>\n    <span class='user-name'>WS1234\uB2D8</span>\n    <button class='login-info'>\uB85C\uADF8\uC544\uC6C3</button>\n</div>\n\n\n<!-- mobile menu start -->\n<div class='mobile-menu'>\n    <img src='./images/menu_after.png' alt='mobile-menu-after-img' class='mobile-menu-after-img'>\n    <ul class='mobile-menu-main'>\n        <li>\n            <a href='adprofit.html' class='mobile-menu-main-list'>\uAD11\uACE0\uC218\uC775</a>\n        </li>\n        <li>\n            <a class='mobile-menu-main-list'>\uACF5\uC9C0\uC0AC\uD56D</a>\n            <ul class='mobile-menu-sub'>\n                <li>\n                    <a href='noticeall.html'>\uC804\uCCB4</a>\n                </li>\n                <li>\n                    <a href='javscript:void(0);' data-notice=\"notice\">\uACF5\uC9C0\uC0AC\uD56D</a>\n                </li>\n                <li>\n                    <a href='javscript:void(0);' data-notice=\"update\">\uC5C5\uB370\uC774\uD2B8</a>\n                </li>\n                <li>\n                    <a href='javscript:void(0);' data-notice=\"event\">\uC774\uBCA4\uD2B8</a>\n                </li>\n            </ul>\n        </li>\n        <li>\n            <a href='faq.html' class='mobile-menu-main-list'>FAQ</a>\n        </li>\n        <li>\n            <a class='mobile-menu-main-list'>1:1\uBB38\uC758</a>\n            <ul class='mobile-menu-sub'>\n                <li>\n                    <a href='directq.html'>\uBB38\uC758\uD558\uAE30</a>\n                </li>\n                <li>\n                    <a href='myq.html'>\uB0B4 \uBB38\uC758</a>\n                </li>\n            </ul>\n        </li>\n        <li>\n            <a href='result.html' class='mobile-menu-main-list'>\uAC8C\uC784\uACB0\uACFC</a>\n        </li>\n    </ul>\n</div>\n<!-- mobile menu end -->\n<button class=\"btn-top\">TOP</button>\n</header>";
var btnTop = document.querySelector('.btn-top');
var mainWrap = document.querySelector('.main-wrap');
var nav = document.querySelector('nav');
var navBg = document.querySelector('.sub-nav-bg');
var subMenu = document.querySelectorAll('.sub-menu');
var mobileMenu = document.querySelector('.mobile-menu');
var mobileMenuImg = document.querySelector('.mobile-menu-img');
var mobileAfterMenuImg = document.querySelector('.mobile-menu-after-img');
var mobileMenuList = document.querySelectorAll('.mobile-menu-main-list'); // 접속시 screen size에 따른 event 등록/제거

commonEventReg();
window.addEventListener('resize', resizeFnc); // mobile sub menu 펼침 이벤트

Array.from(mobileMenuList).forEach(function (el) {
  el.addEventListener('click', function () {
    showMobileSubMenu(el);
  }, true);
});
btnTop.addEventListener('click', function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
window.addEventListener('scroll', function () {
  if (window.scrollY > 200) {
    btnTop.style.display = 'block';
  }

  if (window.scrollY < 200) {
    btnTop.style.display = 'none';
  }
});
/**
 * @brief resize event 발생시 화면에 맞는 event로 갱신
 * @author JJH
 */

function resizeFnc() {
  // resize시 열려있는 모든 서브 메뉴를 닫음 //
  hideSubMenu();
  hideMobileMenu(); //--------------------------------------//

  if (window.innerWidth <= 500) {
    commonEventReg();
  } else if (window.innerWidth <= 960) {
    commonEventReg();
  } else {
    commonEventReg();
  }
}
/**
 * @brief 첫접속 또는 resize시 현재 화면 크기에 따라 nav event, mobile menu event를 추가/제거하는 함수
 * @author JJH
 */


function commonEventReg() {
  if (window.innerWidth <= 960) {
    nav.removeEventListener('mouseover', showSubMenu);
    navBg.removeEventListener('mouseout', hideSubMenu);
    mobileMenuImg.addEventListener('click', showMobileMenu);
  } else {
    nav.addEventListener('mouseover', showSubMenu);
    navBg.addEventListener('mouseout', hideSubMenu);
    mobileMenuImg.removeEventListener('click', showMobileMenu);
  }
}

;
/**
 * @brief nav mouseover시 menu가 나타나게하는 함수
 * @author JJH
 */

function showSubMenu() {
  if (window.innerWidth > 1300) {
    navBg.style.height = '140px';
  } else {
    navBg.style.height = '180px';
  }

  headerWrap.style.boxShadow = 'none';
  Array.from(subMenu).forEach(function (el) {
    el.style.display = 'block';
  });
  navBg.style.display = 'block';
}

;
/**
 * @brief sub nav bg에 mouseout시 menu를 숨기는 함수
 * @author JJH
 */

function hideSubMenu() {
  headerWrap.style.boxShadow = '2px 5px 5px -1px #f0f4fb';
  Array.from(subMenu).forEach(function (el) {
    el.style.display = 'none';
  });
  navBg.style.display = 'none';
}

;
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
  mobileAfterMenuImg.addEventListener('click', hideMobileMenu, true);
}

;
/**
 * @brief mobile after menu img click시 mobile menu를 숨기는 함수
 * @author JJH
 */

function hideMobileMenu() {
  mobileMenu.style.right = '-9999px';
  mobileMenu.classList.remove('mobile-menu-slide-in');
  mobileMenu.classList.add('mobile-menu-slide-out');
  mainWrap.removeEventListener('click', hideMobileMenu, true);
  mobileAfterMenuImg.removeEventListener('click', hideMobileMenu, true);
}

;
/**
 * 
 * @brief mobile 메뉴 클릭시 서브메뉴 펼침/숨김
 * @author JJH
 * @param el click한 객체의 node id
 */

function showMobileSubMenu(el) {
  if (el.nextSibling.nextSibling != null) {
    if (el.nextSibling.nextSibling.style.display == '') {
      el.nextSibling.nextSibling.style.display = 'block';
    } else if (el.nextSibling.nextSibling.style.display == 'block') {
      el.nextSibling.nextSibling.style.display = 'none';
    } else if (el.nextSibling.nextSibling.style.display == 'none') {
      el.nextSibling.nextSibling.style.display = 'block';
    }
  }
}

;
/*
공지사항 메뉴 클릭 시 서버에 공지사항 type을 보내줌
*/

var noticeMenu = document.querySelectorAll('.notice-sub-menu > li > a');
var mobileNoticeMenu = document.querySelectorAll('.mobile-menu-sub > li > a');
Array.from(noticeMenu).forEach(function (el) {
  el.addEventListener('click', function () {
    console.log(el.dataset.notice);
    window.location = "noticeall?noticeType/".concat(el.innerText);
  });
});
Array.from(mobileNoticeMenu).forEach(function (el) {
  el.addEventListener('click', function () {
    console.log(el.dataset.notice);
    window.location = "noticeall?noticeType/".concat(el.innerText);
  });
});
/*
공지사항 메뉴 클릭 시 서버에 공지사항 type을 보내줌
*/