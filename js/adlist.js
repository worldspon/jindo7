'use strict';

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const adjustCheck = document.querySelectorAll('.adjust-check');
const adProgressBox = document.querySelectorAll('.ad-progress-box');
const adContent = document.querySelectorAll('.ad-oneline-content-box a');
let prevText;


searchBtn.addEventListener('click', function() {
    let searchKeyword = encodeURIComponent(searchInput.value);
    console.log(searchKeyword);
});

searchInput.addEventListener('keyup', function(e) {
    if(e.keyCode==13) {
        let clickEventObject = new Event('click');
        searchBtn.dispatchEvent(clickEventObject);
    }
});

adjustCheck.forEach((el, index)=>{
    el.addEventListener('click', ()=>{
        if(adProgressBox[index].innerText == '종료') {
            alert('이미 종료된 광고입니다.');
        } else if(adProgressBox[index].innerText == '광고중') {
            alert('광고중입니다. 관리자에게 문의하세요.');
        } else if(adProgressBox[index].innerText == '대기중' && el.innerText == '수정') {
            editAd(el, index);
        } else if(adProgressBox[index].innerText == '대기중' && el.innerText == '완료') {
            editDone(el, index);
        }
    })
});

function editAd(el, index) {
    el.classList.remove('ad-adjust-box');
    el.classList.add('ad-done-box');
    prevText = adContent[index].innerText;
    adContent[index].contentEditable = true;
    adContent[index].focus();
    el.innerText = '완료';

    adContent[index].addEventListener('keydown', function(e){
        if(this.innerText.length >= 80) {
            e.preventDefault();
        }
    });
}

function editDone(el, index) {
    let doneBoolean = confirm('변경하시겠습니까?');

    if(!doneBoolean) {
        el.classList.remove('ad-done-box');
        el.classList.add('ad-adjust-box');
        adContent[index].contentEditable = false;
        adContent[index].innerText = prevText;
        el.innerText = '수정';
        return 0;
    }

    el.classList.remove('ad-done-box');
    el.classList.add('ad-adjust-box');
    adContent[index].contentEditable = false;
    el.innerText = '수정';

    let data = {'adContent':adContent[index].innerText};
    data = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.0.24:8080/game', false);

    xhr.send(data);

    if(xhr.readyState === 4 && xhr.status === 200) {
        alert('등록되었습니다.');
        window.location.reload();
    } else {
        alert('등록에 실패하였습니다.\n다시 시도해주세요.');
        adContent[index].innerText = prevText;
    }
}