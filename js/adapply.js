'use strict';

const adSelect = document.querySelector('.ad-how-long');
const adSelectOpt = document.querySelectorAll('.ad-how-long > option');
const adColorSelectBox = document.querySelector('.ad-color');
const adColorOpt = document.querySelectorAll('.ad-color > option');
const adPrice = document.querySelector('.detail-price');
const applyBtn = document.querySelector('.applyad');
const cancelBtn = document.querySelector('.cancelad');
const adText = document.querySelector('.ad-text-space');

let dateFlag = false;
let colorFlag = false;


// 가격 변경 이벤트 적용
adSelect.addEventListener('change', ()=>{
    adSelectOpt.forEach((el)=>{
        if(el.selected == true){
            dateFlag = true;
            // 기본가격 * 선택 일수
            adPrice.innerText = el.value * adPrice.dataset.basicPrice;
        }
    })
});

// 색상 변경 이벤트 적용
adColorSelectBox.addEventListener('change', ()=>{
    adColorOpt.forEach((el)=>{
        if(el.selected == true) {
            colorFlag = true;
            adColorSelectBox.style.backgroundColor = el.style.backgroundColor;
            adColorSelectBox.style.color = 'white';

            // 광고내용 저장, 색상 변경 후 재입력
            let dummyText = adText.value;
            adText.value = '';
            adText.style.color = el.style.backgroundColor;
            adText.value = dummyText;

        }
    })
})

cancelBtn.addEventListener('click', ()=>{
    window.history.back();
});

// 통신 - 수정 예정
applyBtn.addEventListener('click', ()=>{
    if(dateFlag && colorFlag && adText.value.trim() != '') {
        let data = {'adContent':adText};
        data = JSON.stringify(data);
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://192.168.0.24:8080/game', true);
        xhr.send(data);
        if(xhr.readyState === 4 && xhr.status === 200) {
            alert('등록되었습니다.');
            window.location.href= '././adlist.html';
        } else {
            alert('등록에 실패하였습니다.\n다시 시도해주세요.');
        }
    } else {
        alert('전부입력!')
    }
});