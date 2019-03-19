'use strict;'

const noticeContent = document.querySelector('.notice-content');
const pageNum = document.querySelectorAll('.page-number');
let lastPage;
let last
let nowPage = 1;
let nowPhrase = 1;

/*
표현할 phrase 범위(phrase page n)

*/

Array.from(pageNum).forEach((el)=>{
    el.addEventListener('click', function() {
        console.log(this.innerText);
    });
})

function a(some){
    console.log(some);
}

firstLoadAsync('js/noticeall.json');

function AsyncValidateFnc(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
};

async function firstLoadAsync(url) {
    try {
        let data = await AsyncValidateFnc(url);
        setPageData(data);
    } catch (error) {
        console.log(error);
    }
};


function setPageData(data){

    let myData = JSON.parse(data);
    myData = myData.notice;
    let contentLength = myData.length;

    lastPage = (contentLength % 5)> 0 ? Math.floor(contentLength / 5) + 1 : Math.floor(contentLength / 5);

    console.log(lastPage);

};

function pagination() {

}