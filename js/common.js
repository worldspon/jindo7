'use strict';


const headerWrap = document.querySelector('.header-wrap');

headerWrap.innerHTML = `<header>
<div class='logo-box'>
    <a href='./index.html'><img src='./images/header_logo.png' alt='main-logo'></a>
</div>
<!-- nav start -->
<nav>
    <!-- mobile menu image -->
    <img src="./images/menu.png" alt="mobile-menu-image" class='mobile-menu-img'>

    <!-- nav main menu list start -->
    <ul class='main-menu'>
        <li>
            <a href='./adprofit.html' class='ad-profit-nav'>광고수익</a>
        </li>
        <li class='pc-notice-menu'>
            <a href='noticeall.html'>공지사항</a>
            <ul class='notice-sub-menu sub-menu'>
                <li>
                    <a href='javscript:void(0);' data-notice="notice">공지사항</a>
                </li>
                <li>
                    <a href='javscript:void(0);' data-notice="update">업데이트</a>
                </li>
                <li>
                    <a href='javscript:void(0);' data-notice="event">이벤트</a>
                </li>
            </ul>
        </li>
        <li>
            <a href='./faq.html' class='faq-nav'>FAQ</a>
        </li>
        <li>
            <a href='directq.html' class='support-nav'>1:1문의</a>
            <ul class='support-sub-menu sub-menu'>
                <li>
                    <a href='directq.html'>문의하기</a>
                </li>
                <li>
                    <a href='myq.html'>내문의</a>
                </li>
            </ul>
        </li>
        <li>
            <a href='result.html' class='game-result-nav'>게임결과</a>
        </li>
    </ul>
    <!-- nav main menu list end -->
</nav>
<!-- nav end -->


<div class='user-info'>
    <span class='user-name'>WS1234님</span>
    <button class='login-info'>로그아웃</button>
</div>


<!-- mobile menu start -->
<div class='mobile-menu'>
    <img src='./images/menu_after.png' alt='mobile-menu-after-img' class='mobile-menu-after-img'>
    <ul class='mobile-menu-main'>
        <li>
            <a href='./adprofit.html' class='mobile-menu-main-list'>광고수익</a>
        </li>
        <li>
            <a class='mobile-menu-main-list'>공지사항</a>
            <ul class='mobile-menu-sub'>
                <li>
                    <a href='noticeall.html'>전체</a>
                </li>
                <li>
                    <a href='javscript:void(0);' data-notice="notice">공지사항</a>
                </li>
                <li>
                    <a href='javscript:void(0);' data-notice="update">업데이트</a>
                </li>
                <li>
                    <a href='javscript:void(0);' data-notice="event">이벤트</a>
                </li>
            </ul>
        </li>
        <li>
            <a href='./faq.html' class='mobile-menu-main-list'>FAQ</a>
        </li>
        <li>
            <a class='mobile-menu-main-list'>1:1문의</a>
            <ul class='mobile-menu-sub'>
                <li>
                    <a href='directq.html'>문의하기</a>
                </li>
                <li>
                    <a href='javascript:void(0);'>내 문의</a>
                </li>
            </ul>
        </li>
        <li>
            <a href='result.html' class='mobile-menu-main-list'>게임결과</a>
        </li>
    </ul>
</div>
<!-- mobile menu end -->
</header>`;




const mainWrap = document.querySelector('.main-wrap');
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

// mobile sub menu 펼침 이벤트
Array.from(mobileMenuList).forEach((el) => {
    el.addEventListener('click',()=>{showMobileSubMenu(el)}, true);
});


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


/**
 * 
 * @brief mobile 메뉴 클릭시 서브메뉴 펼침/숨김
 * @author JJH
 * @param el click한 객체의 node id
 */
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



const noticeMenu = document.querySelectorAll('.notice-sub-menu > li > a');
const mobileNoticeMenu = document.querySelectorAll('.mobile-menu-sub > li > a');

Array.from(noticeMenu).forEach((el)=>{
    el.addEventListener('click', function() {
        console.log(el.dataset.notice);
        window.location = `noticeall?noticeType/${el.innerText}`;
    });
});

Array.from(mobileNoticeMenu).forEach((el)=>{
    el.addEventListener('click', function() {
        console.log(el.dataset.notice);
        window.location = `noticeall?noticeType/${el.innerText}`;
    });
});
