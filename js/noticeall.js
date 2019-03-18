'use strict;'

const noticeContent = document.querySelector('.notice-content');
const pageNum = document.querySelectorAll('.page-number');

Array.from(pageNum).forEach((el)=>{
    el.addEventListener('click', function(){ console.log('a'); })
})

let lastPage;
let nowPage;

profitAsync('js/noticeall.json');

function AsyncValidateFnc(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
};

async function profitAsync(url) {
    try {
        let data = await AsyncValidateFnc(url);
        setProfitData(data);
    } catch (error) {
        console.log(error);
    }
};


function setProfitData(data){

    let myData = JSON.parse(data);
    myData = myData.notice;
    let contentLength = myData.length;

    if((contentLength % 5)> 0) {
        lastPage = Math.floor(contentLength / 5) + 1;
    } else {
        lastPage = Math.floor(contentLength / 5);
    }
    console.log(lastPage);
/*
    if(contentLength <= 20) {

    }*/
};

function pagination() {

}