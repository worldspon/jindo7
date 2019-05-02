'use strict';

const pwInput1 = document.querySelector('.check-personal-pw');
const pwInput2 = document.querySelector('.recheck-personal-pw');
const changeBtn = document.querySelector('.btn-change-pw');

changeBtn.addEventListener('click', ()=>{

    if((pwInput1.value.length < 4 || pwInput2.value.length < 4)) {
        alert('비밀번호에 4자리 이상 입력해주세요');
        return 0;
    }
    if(pwInput1.value == pwInput2.value) {
        alert('참 잘했어요');
        return 0;
    } else {
        alert('비밀번호가 다릅니다. 확인해주세요.');
        return 0;
    }
});