'use strict;'

import {noticeType} from './common.js';

const noticeContent = document.querySelector('.notice-content');
const noticeContentWrap = document.querySelector('.notice-content-wrap');
const pagenationInner = document.querySelector('.pagination-inner');
const firstBtn = document.querySelector('.first-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const lastBtn = document.querySelector('.last-btn');



let pageNum, lastPage, startPage, endPage, contentLength;
//현재 페이지
let nowPage=1;
// 한 페이지 최대 게시물
const maxContent = 20;
// 한 phrase에 표현 될 게시판 수
const countPage = 5;

// 첫 로드시 1페이지 마크업
firstLoadAsync(`/notice/fetch?page=${nowPage-1}&type=${noticeType}`, nowPage);

// 처음 버튼 클릭시 첫 페이지로
firstBtn.addEventListener('click', ()=>{
    setPageAsync(`/notice/fetch?page=${0}&type=${noticeType}`, 1);
});

// 이전 버튼 클릭시 1phrase 이전 페이지로 이동
prevBtn.addEventListener('click', ()=>{
    if(nowPage-countPage >= 1) {
        nowPage -= countPage;
        setPageAsync(`/notice/fetch?page=${nowPage-1}&type=${noticeType}`, nowPage);
    } else {
        nowPage = 1;
        setPageAsync(`/notice/fetch?page=${nowPage-1}&type=${noticeType}`, 1);
    }
});


// 다음 버튼 클릭시 1phrase 다음 페이지로 이동
nextBtn.addEventListener('click', ()=>{
    console.log(lastPage);
    if(nowPage+countPage < lastPage) {
        nowPage += countPage;
        setPageAsync(`/notice/fetch?page=${nowPage-1}&type=${noticeType}`, nowPage);
    } else {
        nowPage = lastPage;
        setPageAsync(`/notice/fetch?page=${nowPage-1}&type=${noticeType}`, nowPage);
    }
});


// 마지막 버튼 클릭시 마지막으로
lastBtn.addEventListener('click', ()=>{
    setPageAsync(`/notice/fetch?page=${lastPage-1}&type=${noticeType}`, lastPage);
});



/**
 * @brief promise 객체 생성
 * @author JJH
 * @see url만 바꿔서 쓰면 된다.
 */
function AsyncValidateFnc(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
};



/**
 * @brief 페이지 최초 로드시 비동기 통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 * @param nowPage 현재 페이지
 */
async function firstLoadAsync(url, nowPage) {
    try {
        let data = await AsyncValidateFnc(url);
        firstPageLoad(data, nowPage);
    } catch (error) {
        console.log(error);
    }
};



/**
 * @brief 현재 페이지 값을 받아 해당 페이지를 로드하는 비동기 통신
 * @author JJH
 * @param url 통신할 url
 * @param nowPage 현재 페이지
 */
async function setPageAsync(url, nowPage) {
    try {
        let data = await AsyncValidateFnc(url);
        setPageData(data, nowPage);
    } catch (error) {
        console.log(error);
    }
};



/**
 * @brief 페이지 최초 로드시 비동기 통신, promise 생성 후 검증
 * @author JJH
 * @param data json 데이터
 * @param viewPage 보여줄 페이지, nowPage 기본값으로 제어 가능
 */
function firstPageLoad(data, viewPage) {

    let myData = JSON.parse(data);
    contentLength = myData.totalElement
    myData = myData.notice;

    lastPage = (contentLength % maxContent)> 0 ? Math.floor(contentLength / maxContent) + 1 : Math.floor(contentLength / maxContent);

    startPage = Math.floor((viewPage-1)/countPage)*countPage + 1
    endPage = startPage+countPage-1;
    endPage>lastPage ? endPage=lastPage : endPage=endPage;

    let tempHtml='';

    if(contentLength<=maxContent) {
        for(let i=0; i<contentLength; i++) {
            tempHtml+= `<div class='notice-content border-bottom'>
            <div class='notice-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].typeToKorean}</span>
                    <span class='preface-num'>No.${myData[i].id}</span>
                </div>
                <a href='noticecontent.html'>${myData[i].title}</a>
            </div>
            <div class='notice-content-date-box'>
                <span class='notice-content-date'>${myData[i].created}</span>
            </div>
        </div>`;
        }
    } else {
        for(let i=0; i<maxContent; i++) {
            tempHtml+= `<div class='notice-content border-bottom'>
            <div class='notice-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].typeToKorean}</span>
                    <span class='preface-num'>No.${myData[i].id}</span>
                </div>
                <a href='noticecontent.html'>${myData[i].title}</a>
            </div>
            <div class='notice-content-date-box'>
                <span class='notice-content-date'>${myData[i].created}</span>
            </div>
        </div>`;
        }
    }

    noticeContentWrap.innerHTML = tempHtml;
    tempHtml='';


    for(let i = startPage; i<=endPage; i++){
        viewPage==i ? tempHtml += `<li class='page-number' style='font-weight:700;'>${i}</li>` : tempHtml += `<li class='page-number'>${i}</li>`;
        
    }


    pagenationInner.innerHTML = tempHtml;

    pageNum = document.querySelectorAll('.page-number');

    Array.from(pageNum).forEach((el)=>{
        el.addEventListener('click', function() {
            viewPage = parseInt(this.innerText);
            setPageAsync(`/notice/fetch?page=${viewPage-1}&type=${noticeType}`, viewPage);
        });
    });
}



/**
 * @brief 버튼으로 이동한 페이지 로드
 * @author JJH
 * @param data json 데이터
 * @param viewPage 보여줄 페이지
 */
function setPageData(data, viewPage){

    let myData = JSON.parse(data);
    myData = myData.notice;

    let startContent, endContent;
    startPage = Math.floor((viewPage-1)/countPage)*countPage + 1
    endPage = startPage+countPage-1;
    endPage>lastPage ? endPage=lastPage : endPage=endPage;

    startContent = (viewPage-1)*maxContent;
    endContent = viewPage*maxContent;


    let tempHtml='';

    if(endContent >= contentLength) {
        for(let i=startContent; i<contentLength; i++) {
            tempHtml+= `<div class='notice-content border-bottom'>
            <div class='notice-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].typeToKorean}</span>
                    <span class='preface-num'>No.${myData[i].id}</span>
                </div>
                <a href='noticecontent.html'>${myData[i].title}</a>
            </div>
            <div class='notice-content-date-box'>
                <span class='notice-content-date'>${myData[i].created}</span>
            </div>
        </div>`;
        }
    } else {
        for(let i=startContent; i<endContent; i++) {
            tempHtml+= `<div class='notice-content border-bottom'>
            <div class='notice-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].typeToKorean}</span>
                    <span class='preface-num'>No.${myData[i].id}</span>
                </div>
                <a href='noticecontent.html'>${myData[i].title}</a>
            </div>
            <div class='notice-content-date-box'>
                <span class='notice-content-date'>${myData[i].created}</span>
            </div>
        </div>`;
        }
    }

    noticeContentWrap.innerHTML = tempHtml;
    tempHtml ='';

    for(let i = startPage; i<=endPage; i++){
        viewPage==i ? tempHtml += `<li class='page-number' style='font-weight:700;'>${i}</li>` : tempHtml += `<li class='page-number'>${i}</li>`;
        
    }

    pagenationInner.innerHTML = tempHtml;

    pageNum = document.querySelectorAll('.page-number');

    Array.from(pageNum).forEach((el)=>{
        el.addEventListener('click', function() {
            viewPage = parseInt(this.innerText);
            setPageAsync(`/notice/fetch?page=${viewPage-1}&type=${noticeType}`, viewPage);
        });
    });
    nowPage=viewPage;
};