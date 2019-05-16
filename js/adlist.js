'use strict';

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const adjustCheck = document.querySelectorAll('.adjust-check');
const adProgressBox = document.querySelectorAll('.ad-progress-box');
const adContent = document.querySelectorAll('.ad-oneline-content-box a');
let prevText;


// 관리자 접속시 함수 추가
if(document.querySelectorAll('.management-mode-check-box').length > 0) {
    regAdminFnc();
}



/**
 * 
 * @brief 광고 승인여부 통신함수
 * @author JJH
 * @see 참고사항
 * 
 */
function regAdminFnc() {
    document.querySelectorAll('.check-confirm').forEach((el)=>{
        el.addEventListener('click', ()=>{

            let selectCheck = el.previousSibling.previousSibling;

            // 옵션 선택 여부 확인
            if(selectCheck.options[selectCheck.selectedIndex].value) {

                let obj = {
                    "uniqueId" : el.parentNode.dataset.uniqueId, 
                    "state" : parseInt(selectCheck.options[selectCheck.selectedIndex].value)
                }

                obj = JSON.stringify(obj);
                let data = adPromise('POST', 'http://192.168.0.24:8080/promotion/state/change', obj);
                data.then((data)=>{
                    data = JSON.parse(data);
                    alert(data.msg);
                    window.location.href = './adlist.html';
                }, (err)=>{
                    alert(err);
                });
            } else {
                alert('옵션을 선택해주세요');
            }

        })
    })
}

// 검색 이벤트
searchBtn.addEventListener('click', function() {
    let searchKeyword = encodeURIComponent(searchInput.value);
});

// 검색창 enter 입력시 검색 이벤트 방출
searchInput.addEventListener('keyup', function(e) {
    if(e.keyCode==13) {
        let clickEventObject = new Event('click');
        searchBtn.dispatchEvent(clickEventObject);
    }
});

// 광고 상태에 따른 함수 호출
adjustCheck.forEach((el, index)=>{
    el.addEventListener('click', ()=>{
        if(adProgressBox[index].innerText == '종료') {
            alert('이미 종료된 광고입니다.');
        } else if(adProgressBox[index].innerText == '광고중') {
            alert('광고중입니다. 관리자에게 문의하세요.');
        } else if(adProgressBox[index].innerText == '대기중' && el.innerText == '수정') {
            // 광고 수정 함수
            editAd(el, index);
        } else if(adProgressBox[index].innerText == '대기중' && el.innerText == '완료') {
            // 광고 정보 서버통신 함수
            editDone(el, index);
        }
    })
});


/**
 * 
 * @brief 광고 수정 함수
 * @author JJH
 * @param el 버튼 node id
 * @param index 해당 버튼 index
 * 
 */
function editAd(el, index) {
    el.classList.remove('ad-adjust-box');
    el.classList.add('ad-done-box');
    adContent[index].contentEditable = true;
    adContent[index].focus();
    el.innerText = '완료';


    // 광고 제목에 이벤트리스너 추가
    adContent[index].addEventListener('keydown', function(e){

        // 80자 이상일시 경고창 / backspace, delete, 방향키, shift 허용
        if(this.innerText.length > 80) {

            if(e.shiftKey) {
                if(!(e.keyCode <= 40 && e.keyCode >= 37) && e.keyCode != 16) {
                    alert('80자 이하로 입력하세요.');
                }
            } else {
                if(e.keyCode != 8 && e.keyCode != 46 && !(e.keyCode <= 40 && e.keyCode >= 37)) {
                    alert('80자 이하로 입력하세요.');
                }
            }
        }
    });
}


/**
 * 
 * @brief 광고내용 서버통신 함수
 * @author JJH
 * @param el 광고제목 node id
 * @param index 광고제목 index
 * 
 */
function editDone(el, index) {

    let doneBoolean = confirm('변경하시겠습니까?');

    if(doneBoolean) {
        // 빈문자열 검증
        if(adContent[index].innerText.trim() == '') {
            doneBoolean = false;
            alert('광고내용이 없습니다.');
        }
    }

    // 검증 통과 실패시 원상태로 되돌림
    if(!doneBoolean) {
        el.classList.remove('ad-done-box');
        el.classList.add('ad-adjust-box');
        adContent[index].contentEditable = false;
        adContent[index].innerText = prevText;
        el.innerText = '수정';
        return 0;
    } else {
        el.classList.remove('ad-done-box');
        el.classList.add('ad-adjust-box');
        adContent[index].contentEditable = false;
        el.innerText = '수정';

        let obj = {
            "uniqueId" : el.parentNode.dataset.uniqueId, 
            "chat" : adContent[index].innerText
        }

        adContent[index].innerText = '통신중입니다. 잠시만 기다려주세요.';

        obj = JSON.stringify(obj);

        let data = adPromise('POST', 'http://192.168.0.24:8080/promotion/modify', obj);
        data.then((data)=>{
            data = JSON.parse(data);
            alert(data.msg);
            if(data.errorCode == 0) {
                window.location.href = './adlist.html';
            }
            adContent[index].innerText = prevText;

        }, (err)=>{
            alert(err);
            adContent[index].innerText = prevText;
        });

    }
}


/**
 * 
 * @brief 비동기 함수
 * @author JJH
 * @param type 통신 타입
 * @param url 통신 url
 * @param obj 보낼 객체
 * 
 */
function adPromise(type, url, obj) {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj);
    })
}