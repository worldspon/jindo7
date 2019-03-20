'use strict;'

const noticeContent = document.querySelector('.notice-content');
const noticeContentWrap = document.querySelector('.notice-content-wrap');
const pagenationInner = document.querySelector('.pagination-inner');
const firstBtn = document.querySelector('.first-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const lastBtn = document.querySelector('.last-btn');
const noticeUrl = 'js/noticeall.json';


let pageNum, lastPage, startPage, endPage, contentLength;
let nowPage=1;
const maxContent = 20;
const countPage = 5;
let nowPhrase = 1;
let pagePhrase = 5;


firstLoadAsync(noticeUrl, 1);

firstBtn.addEventListener('click', ()=>{
    setPageAsync(noticeUrl, 1);
});

prevBtn.addEventListener('click', ()=>{
    if(nowPage-countPage >= 1) {
        nowPage -= countPage;
        setPageAsync(noticeUrl, nowPage);
    } else {
        nowPage = 1;
        setPageAsync(noticeUrl, 1);
    }
});

nextBtn.addEventListener('click', ()=>{
    console.log(lastPage);
    if(nowPage+countPage < lastPage) {
        nowPage += countPage;
        setPageAsync(noticeUrl, nowPage);
    } else {
        nowPage = lastPage;
        setPageAsync(noticeUrl, lastPage);
    }
});

lastBtn.addEventListener('click', ()=>{
    setPageAsync(noticeUrl, lastPage);
})

function AsyncValidateFnc(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
};

async function firstLoadAsync(url, nowPage) {
    try {
        let data = await AsyncValidateFnc(url);
        firstPageLoad(data, nowPage);
    } catch (error) {
        console.log(error);
    }
};

async function setPageAsync(url, nowPage) {
    try {
        let data = await AsyncValidateFnc(url);
        setPageData(data, nowPage);
    } catch (error) {
        console.log(error);
    }
};

function firstPageLoad(data, viewPage) {

    let myData = JSON.parse(data);
    myData = myData.notice;
    contentLength = myData.length;

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
                    <span class='preface-head'>${myData[i].preface}</span>
                    <span class='preface-num'>No.${myData[i].num}</span>
                </div>
                <a href='javascript:void(0);'>${myData[i].title}</a>
            </div>
            <div class='notice-content-date-box'>
                <span class='notice-content-date'>${myData[i].date}</span>
            </div>
        </div>`;
        }
    } else {
        for(let i=0; i<maxContent; i++) {
            tempHtml+= `<div class='notice-content border-bottom'>
            <div class='notice-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].preface}</span>
                    <span class='preface-num'>No.${myData[i].num}</span>
                </div>
                <a href='javascript:void(0);'>${myData[i].title}</a>
            </div>
            <div class='notice-content-date-box'>
                <span class='notice-content-date'>${myData[i].date}</span>
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
            console.log(viewPage);
            setPageAsync('js/noticeall.json', viewPage);
        });
    });


}


function setPageData(data, viewPage){

    let myData = JSON.parse(data);
    myData = myData.notice;

    let startContent, endContent;
    startPage = Math.floor((viewPage-1)/countPage)*countPage + 1
    endPage = startPage+countPage-1;
    endPage>lastPage ? endPage=lastPage : endPage=endPage;

    startContent = (viewPage-1)*maxContent;
    endContent = viewPage*maxContent;

    console.log(`start : ${startContent}, end : ${endContent}, len : ${contentLength}`);

    let tempHtml='';

    if(endContent >= contentLength) {
        for(let i=startContent; i<contentLength; i++) {
            tempHtml+= `<div class='notice-content border-bottom'>
            <div class='notice-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].preface}</span>
                    <span class='preface-num'>No.${myData[i].num}</span>
                </div>
                <a>${myData[i].title}</a>
            </div>
            <div class='notice-content-date-box'>
                <span class='notice-content-date'>${myData[i].date}</span>
            </div>
        </div>`;
        }
    } else {
        for(let i=startContent; i<endContent; i++) {
            tempHtml+= `<div class='notice-content border-bottom'>
            <div class='notice-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].preface}</span>
                    <span class='preface-num'>No.${myData[i].num}</span>
                </div>
                <a href='javascript:void(0);'>${myData[i].title}</a>
            </div>
            <div class='notice-content-date-box'>
                <span class='notice-content-date'>${myData[i].date}</span>
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
            console.log(viewPage);
            setPageAsync(noticeUrl, viewPage);
        });
    });
    nowPage=viewPage;
    console.log(nowPage);
};

function pagination(getPage) {
    console.log(getPage);
}