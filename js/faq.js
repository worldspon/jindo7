'use strict;'

const faqContent = document.querySelector('.faq-content');
const faqContentWrap = document.querySelector('.faq-content-wrap');
const pagenationInner = document.querySelector('.pagination-inner');
const firstBtn = document.querySelector('.first-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const lastBtn = document.querySelector('.last-btn');
const faqUrl = 'js/noticeall.json';


let pageNum, lastPage, startPage, endPage, contentLength;
let nowPage=1;
const maxContent = 20;
const countPage = 5;


firstLoadAsync(faqUrl, 1);

firstBtn.addEventListener('click', ()=>{
    setPageAsync(faqUrl, 1);
});

prevBtn.addEventListener('click', ()=>{
    if(nowPage-countPage >= 1) {
        nowPage -= countPage;
        setPageAsync(faqUrl, nowPage);
    } else {
        nowPage = 1;
        setPageAsync(faqUrl, 1);
    }
});

nextBtn.addEventListener('click', ()=>{
    console.log(lastPage);
    if(nowPage+countPage < lastPage) {
        nowPage += countPage;
        setPageAsync(faqUrl, nowPage);
    } else {
        nowPage = lastPage;
        setPageAsync(faqUrl, lastPage);
    }
});

lastBtn.addEventListener('click', ()=>{
    setPageAsync(faqUrl, lastPage);
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
            tempHtml+= `<div class='faq-content border-bottom'>
            <div class='faq-content-hl'>
                <a href='faqcontent.html'><span class='question-span'>Q.</span> ${myData[i].title}</a>
            </div>
        </div>`;
        }
    } else {
        for(let i=0; i<maxContent; i++) {
            tempHtml+= `<div class='faq-content border-bottom'>
            <div class='faq-content-hl'>
                <a href='faqcontent.html'><span class='question-span'>Q.</span> ${myData[i].title}</a>
            </div>
        </div>`;
        }
    }

    faqContentWrap.innerHTML = tempHtml;
    tempHtml='';


    for(let i = startPage; i<=endPage; i++){
        viewPage==i ? tempHtml += `<li class='page-number' style='font-weight:700;'>${i}</li>` : tempHtml += `<li class='page-number'>${i}</li>`;
        
    }


    pagenationInner.innerHTML = tempHtml;

    pageNum = document.querySelectorAll('.page-number');

    Array.from(pageNum).forEach((el)=>{
        el.addEventListener('click', function() {
            viewPage = parseInt(this.innerText);
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


    let tempHtml='';

    if(endContent >= contentLength) {
        for(let i=startContent; i<contentLength; i++) {
            tempHtml+= `<div class='faq-content border-bottom'>
            <div class='faq-content-hl'>
                <a><span class='question-span'>Q.</span> ${myData[i].title}</a>
            </div>
        </div>`;
        }
    } else {
        for(let i=startContent; i<endContent; i++) {
            tempHtml+= `<div class='faq-content border-bottom'>
            <div class='faq-content-hl'>
                <a><span class='question-span'>Q.</span> ${myData[i].title}</a>
            </div>
        </div>`;
        }
    }

    faqContentWrap.innerHTML = tempHtml;
    tempHtml ='';

    for(let i = startPage; i<=endPage; i++){
        viewPage==i ? tempHtml += `<li class='page-number' style='font-weight:700;'>${i}</li>` : tempHtml += `<li class='page-number'>${i}</li>`;
        
    }


    pagenationInner.innerHTML = tempHtml;

    pageNum = document.querySelectorAll('.page-number');

    Array.from(pageNum).forEach((el)=>{
        el.addEventListener('click', function() {
            viewPage = parseInt(this.innerText);
            setPageAsync(faqUrl, viewPage);
        });
    });
    nowPage=viewPage;
};
