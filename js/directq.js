'use strict';

const selectBox = document.getElementById('dq-find');
const selectOption = document.querySelectorAll('#dq-find option');
const phType = document.getElementById('phone-type');
const dqSubject = document.getElementById('dq-subject');
const textArea = document.getElementById('describe-dq');
const hiddenDiv = document.getElementById('hidden-div');
const btnHelp = document.querySelector('.btn-help');

let optionVal = '';


selectBox.addEventListener('change', selectOptionFnc);

btnHelp.addEventListener('click', ()=>{  
    asyncFnc(checkFlag());
});



/**
 * @brief select box의 선택된 옵션 값 추출
 * @author JJH
 */
function selectOptionFnc(){
    Array.from(selectOption).forEach((el)=>{
        if(el.selected) {
            optionVal = el.value;
        }
    });
}



/**
 * @brief 모든 항목이 작성돼있는지 확인
 * @author JJH
 * @return ture / false
 */
function checkFlag() {
    if(optionVal.trim() != '' && phType.value.trim() != '' &&  dqSubject.value.trim() != '' && textArea.value.trim() != '') {
        return true;
    } else {
        return false;
    }
}



/**
 * @brief 모든 항목이 작성돼있는지 확인
 * @author JJH
 * @param flag 모든 항목이 작성되었는지 여부(bool)
 */
async function asyncFnc(flag) {

    if(flag) {
        let qJson = {
            'type' : optionVal.trim(),
            'phoneType' : phType.value.trim(),
            'title' : dqSubject.value.trim(),
            'content' : hiddenDiv.innerHTML.trim()
        }

        qJson = JSON.stringify(qJson);

        let data = await AsyncValidateFnc('POST', 'http://192.168.0.24:8080/myQ/directQ', qJson);
        data = JSON.parse(data);
        if(data.errorCode > 0) {
            alert('오류가 발생하였습니다. 다시 시도해주세요.');
        } else {
            alert('문의가 정상적으로 접수되었습니다.');
            window.location.href='/myq.html';
        }
    } else {
        alert('모든 항목을 입력해주십시오.');
    }
}



/**
 * @brief promise 객체 생성
 * @author JJH
 * @param type 통신 type
 * @param url 통신 할 url 주소
 * @param param 문의 데이터 JSON 객체
 */
function AsyncValidateFnc(type,url,param) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(type, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(param);
    });
}