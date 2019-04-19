'use strict;'

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const myqContent = document.querySelector('.myq-content');
const myqContentWrap = document.querySelector('.myq-content-wrap');
const pagenationInner = document.querySelector('.pagination-inner');
const firstBtn = document.querySelector('.first-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const lastBtn = document.querySelector('.last-btn');
const myqUrl = 'js/myq.json';



// 검색 기능
/////////////////////////////////////////////////////////////////////
searchBtn.addEventListener('click', function() {
    searchKeyword = encodeURIComponent(searchInput.value);
    console.log(searchKeyword);
});

searchInput.addEventListener('keyup', function(e) {
    if(e.keyCode==13) {
        let clickEventObject = new Event('click');
        searchBtn.dispatchEvent(clickEventObject);
    }
});
/////////////////////////////////////////////////////////////////////



let pageNum, lastPage, startPage, endPage, contentLength;
//현재 페이지
let nowPage=1;
// 한 페이지 최대 게시물
const maxContent = 20;
// 한 phrase에 표현 될 게시판 수
const countPage = 5;


// 첫 로드시 1페이지 마크업
firstLoadAsync(myqUrl, 1);


// 처음 버튼 클릭시 첫 페이지로
firstBtn.addEventListener('click', ()=>{
    setPageAsync(myqUrl, 1);
});


// 이전 버튼 클릭시 1phrase 이전 페이지로 이동
prevBtn.addEventListener('click', ()=>{
    if(nowPage-countPage >= 1) {
        nowPage -= countPage;
        setPageAsync(myqUrl, nowPage);
    } else {
        nowPage = 1;
        setPageAsync(myqUrl, 1);
    }
});


// 다음 버튼 클릭시 1phrase 다음 페이지로 이동
nextBtn.addEventListener('click', ()=>{
    console.log(lastPage);
    if(nowPage+countPage < lastPage) {
        nowPage += countPage;
        setPageAsync(myqUrl, nowPage);
    } else {
        nowPage = lastPage;
        setPageAsync(myqUrl, lastPage);
    }
});


// 마지막 버튼 클릭시 마지막으로
lastBtn.addEventListener('click', ()=>{
    setPageAsync(myqUrl, lastPage);
})



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
    myData = myData.myq;
    contentLength = myData.length;

    lastPage = (contentLength % maxContent)> 0 ? Math.floor(contentLength / maxContent) + 1 : Math.floor(contentLength / maxContent);

    startPage = Math.floor((viewPage-1)/countPage)*countPage + 1
    endPage = startPage+countPage-1;
    endPage>lastPage ? endPage=lastPage : endPage=endPage;

    let tempHtml='';

    if(contentLength<=maxContent) {
        for(let i=0; i<contentLength; i++) {
            tempHtml+= `<div class='myq-content border-bottom'>
            <div class='myq-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].preface}</span>
                    <span class='preface-num'>No.${myData[i].num}</span>
                </div>
                <a href="myqcontent.html">${myData[i].title}</a>
            </div>
            <div class='myq-content-date-box'>
                <span class='myq-content-date'>${myData[i].date}</span>
            </div>
            <div class='myq-content-answer-box'>
                <button class='myq-content-answer ${myData[i].answer ? '' : 'btn-dp-none'}'>답변완료</button>
            </div>
        </div>`;
        }
    } else {
        for(let i=0; i<maxContent; i++) {
            tempHtml+= `<div class='myq-content border-bottom'>
            <div class='myq-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].preface}</span>
                    <span class='preface-num'>No.${myData[i].num}</span>
                </div>
                <a href="myqcontent.html">${myData[i].title}</a>
            </div>
            <div class='myq-content-date-box'>
                <span class='myq-content-date'>${myData[i].date}</span>
            </div>
            <div class='myq-content-answer-box'>
                <button class='myq-content-answer ${myData[i].answer ? '' : 'btn-dp-none'}'>답변완료</button>
            </div>
        </div>`;
        }
    }

    myqContentWrap.innerHTML = tempHtml;
    tempHtml='';


    for(let i = startPage; i<=endPage; i++){
        viewPage==i ? tempHtml += `<li class='page-number' style='font-weight:700;'>${i}</li>` : tempHtml += `<li class='page-number'>${i}</li>`;
        
    }


    pagenationInner.innerHTML = tempHtml;

    pageNum = document.querySelectorAll('.page-number');

    Array.from(pageNum).forEach((el)=>{
        el.addEventListener('click', function() {
            viewPage = parseInt(this.innerText);
            setPageAsync('js/myq.json', viewPage);
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
    myData = myData.myq;

    let startContent, endContent;
    startPage = Math.floor((viewPage-1)/countPage)*countPage + 1
    endPage = startPage+countPage-1;
    endPage>lastPage ? endPage=lastPage : endPage=endPage;

    startContent = (viewPage-1)*maxContent;
    endContent = viewPage*maxContent;


    let tempHtml='';

    if(endContent >= contentLength) {
        for(let i=startContent; i<contentLength; i++) {
            tempHtml+= `<div class='myq-content border-bottom'>
            <div class='myq-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].preface}</span>
                    <span class='preface-num'>No.${myData[i].num}</span>
                </div>
                <a href="myqcontent.html">${myData[i].title}</a>
            </div>
            <div class='myq-content-date-box'>
                <span class='myq-content-date'>${myData[i].date}</span>
            </div>
            <div class='myq-content-answer-box'>
                <button class='myq-content-answer ${myData[i].answer ? '' : 'btn-dp-none'}'>답변완료</button>
            </div>
        </div>`;
        }
    } else {
        for(let i=startContent; i<endContent; i++) {
            tempHtml+= `<div class='myq-content border-bottom'>
            <div class='myq-content-hl'>
                <div class='preface'>
                    <span class='preface-head'>${myData[i].preface}</span>
                    <span class='preface-num'>No.${myData[i].num}</span>
                </div>
                <a href="myqcontent.html">${myData[i].title}</a>
            </div>
            <div class='myq-content-date-box'>
                <span class='myq-content-date'>${myData[i].date}</span>
            </div>
            <div class='myq-content-answer-box'>
                <button class='myq-content-answer ${myData[i].answer ? '' : 'btn-dp-none'}'>답변완료</button>
            </div>
        </div>`;
        }
    }

    myqContentWrap.innerHTML = tempHtml;
    tempHtml ='';

    for(let i = startPage; i<=endPage; i++){
        viewPage==i ? tempHtml += `<li class='page-number' style='font-weight:700;'>${i}</li>` : tempHtml += `<li class='page-number'>${i}</li>`;
        
    }


    pagenationInner.innerHTML = tempHtml;

    pageNum = document.querySelectorAll('.page-number');

    Array.from(pageNum).forEach((el)=>{
        el.addEventListener('click', function() {
            viewPage = parseInt(this.innerText);
            setPageAsync(myqUrl, viewPage);
        });
    });
    nowPage=viewPage;
};
