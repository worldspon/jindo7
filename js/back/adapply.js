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
            // select box에 선택된 옵션과 동일한 색상 부여
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


// 등록버튼 클릭시 통신
applyBtn.addEventListener('click', ()=>{
    // 모든 내용이 입력 되었을시 실행
    if(dateFlag && colorFlag && adText.value.trim() != '') {

        let obj = createObj();
        let data = adApplyPromise('POST', 'http://192.168.0.24:8080/promotion/request', obj);

        data.then((data)=>{
            data = JSON.parse(data);
            alert(data.msg);
            if(data.errorCode == 0) {
                window.location.href = './adlist.html';
            }
        }, (err)=>{
            alert('서버와 통신이 원활하지않습니다.');
        });
        
    } else {
        alert('내용을 전부 입력해주세요.')
    }
});

cancelBtn.addEventListener('click', ()=>{
    window.history.back();
});


/**
 * 
 * @brief 비동기 통신 객체 생성
 * @author JJH
 * @param type 통신 타입
 * @param url 통신 url
 * @param obj 송신할 JSON 객체
 * 
 */
function adApplyPromise(type, url, obj) {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj);
    })
}


/**
 * 
 * @brief 비동기 통신 객체 생성
 * @author JJH
 * @return 문자열 변환된 JSON 객체
 * 
 */
function createObj() {
    let obj =  {
        // 광고내용 개행문자 제거
        "chat" : adText.value.trim().replace(/\n/g, ''), 
        "colorKey" : parseInt(adColorSelectBox.options[adColorSelectBox.options.selectedIndex].value), 
        "state" : 0,
        "useDate" : parseInt(adSelect.options[adSelect.options.selectedIndex].value)
    };
    obj = JSON.stringify(obj);

    return obj;
}