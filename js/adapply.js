'use strict';

const adSelect = document.querySelector('.ad-how-long');
const adSelectOpt = document.querySelectorAll('.ad-how-long > option');
const adPrice = document.querySelector('.detail-price');
const applyBtn = document.querySelector('.applyad');
const cancelBtn = document.querySelector('.cancelad');
const adText = document.querySelector('.ad-text-space');

adSelect.addEventListener('change', ()=>{
    adSelectOpt.forEach((el)=>{
        if(el.selected == true){
            adPrice.innerText = el.value * 17;
        }
    })
});

cancelBtn.addEventListener('click', ()=>{
    window.history.back();
});

applyBtn.addEventListener('click', ()=>{
    let data = {'adContent':adText};
    data = JSON.stringify(data);
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://192.168.0.24:8080/game', false);
    xhr.send(data);
    if(xhr.readyState === 4 && xhr.status === 200) {
        alert('등록되었습니다.');
        window.location.href= '././adlist.html';
    } else {
        alert('등록에 실패하였습니다.\n다시 시도해주세요.');
    }
});