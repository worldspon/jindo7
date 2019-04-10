'use strict';

const body = document.body;
const html = document.documentElement;
const main = document.querySelector('main');
const inputId = document.querySelector('.input-id');
const inputPw = document.querySelector('.input-pw');
const submitBtn = document.querySelector('.submit-btn');
const pkValue = document.querySelector('.pk-value');
const encryptId = document.querySelector('.encrypt-id');
const encryptPw = document.querySelector('.encrypt-pw');

let idFlag = false;
let pwFlag = false;

// 접속 시 창 크기와 main height를 비교하여 body, html height 값 변경
if(window.innerHeight <= (main.offsetHeight+100)) {
    body.style.height = 'auto';
    html.style.height = 'auto';
} else {
    body.style.height = '100%';
    html.style.height = '100%';
}

// resize시 창 크기와 main height를 비교하여 body, html height 값 변경
window.addEventListener('resize', function() {
    if(window.innerHeight <= (main.offsetHeight+100)) {
        body.style.height = 'auto';
        html.style.height = 'auto';
    } else {
        body.style.height = '100%';
        html.style.height = '100%';
    }
});

// id 입력시 check img 표시
inputId.addEventListener('keyup', function(){
    if(inputId.value.length >= 2) {
        inputId.style.backgroundImage = 'url("./images/login_check.png")';
        idFlag = true;
    } else {
        inputId.style.backgroundImage = 'none';
        idFlag = false;
    }
});

// pw 입력시 check img 표시
inputPw.addEventListener('keyup', function(){
    if(inputPw.value.length >= 4) {
        inputPw.style.backgroundImage = 'url("./images/login_check.png")';
        pwFlag = true;
    } else {
        inputPw.style.backgroundImage = 'none';
        pwFlag = false;
    }
    
});

// 로그인 버튼 클릭시 검증 및 검증 완료시 비동기통신
submitBtn.addEventListener('click', function(){
    if(!idFlag) {
        alert('아이디를 입력하세요');
    } else if(!pwFlag) {
        alert('비밀번호를 입력하세요');
    } else {
        loginAsync();
    }
});



/**
 * @brief promise 객체 생성
 * @author JJH
 * @param type 통신 type
 * @param url 통신 할 url 주소
 * @param param 암호화된 값으로 이루어진 JSON 객체
 */
function AsyncValidateFnc(type,url,param=false) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(type, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      !param ? xhr.send() : xhr.send(param);
    });
};


/**
 * @brief 받아온 public key로 암호화 및 JSON객체 반환
 * @author JJH
 * @param data public key
 */
function encryptFnc(data) {

    pkValue.value = '';
    encryptId.value = '';
    encryptPw.value = '';
    let myData = JSON.parse(data);

    let crypt = new JSEncrypt();
    crypt.setPrivateKey(myData.publicKey);

    let plainId = inputId.value;
    let plainPw = inputPw.value;

    let encryptedId = crypt.encrypt(plainId);
    let encryptedPw = crypt.encrypt(plainPw);

    encryptId.value = encryptedId;
    encryptPw.value = encryptedPw;

    return JSON.stringify({'username' : encryptId.value , 'userpw' : encryptPw.value });
};


/**
 * @brief login 비동기통신(공개키 요청, 암호화, 암호화 객체 전송, 결과 검증)
 * @author JJH
 */
async function loginAsync() {
    try {
        let publicKey = await AsyncValidateFnc('GET','/login/getPublicKey');
        let loginResult = await AsyncValidateFnc('POST','/login', encryptFnc(publicKey));
        let data = JSON.parse(loginResult);

        if(data.errorCode==0) {
            window.location(data.location);
        }else {
            encryptId.value = '';
            encryptPw.value = '';
            alert(data.msg);
            window.location.reload();
        }
    } catch (error) {
        pkValue.value = '';
        encryptId.value = '';
        encryptPw.value = '';
        alert('통신이 원활하지 않습니다. 다시 시도해주세요.');
        window.location.reload();
    }
};