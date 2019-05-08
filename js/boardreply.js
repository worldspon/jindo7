'use strict';

// 목록버튼
const listBtn = document.querySelector('.btn-board-list');
// 게시글 삭제 버튼
const delBtn = document.querySelector('.btn-del');
// 댓글 글자수 표시 span
const replyInputSize = document.querySelectorAll('.reply-input-size');
// 댓글 내용
const replyContent = document.querySelector('.reply-some-words');

// 댓글 등록버튼
const replyUpload = document.querySelector('.board-reply-upload');
// 댓글 리스트 배열
const replyList = document.querySelectorAll('.board-view-reply > p');
// 댓글 수정버튼 배열
const replyModBtn = document.querySelectorAll('.mod-btn');
// 댓글 삭제버튼 배열
const replyDelBtn = document.querySelectorAll('.del-btn');
// 댓글 수정취소버튼 배열
const replyCancelBtn = document.querySelectorAll('.cancel-btn');

listBtn.addEventListener('click', ()=>{
    window.history.back();
});


// 삭제 클릭이벤트
delBtn.addEventListener('click', ()=>{
    if(confirm('삭제하시겠습니까?')) {
        alert('삭제!!!!');
    } else {
        alert('히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히히');
    }
});

// size 검증 함수 등록
replyContent.addEventListener('input', function() {
    replySize(this, 0);
});

// 등록 이벤트, 검증
replyUpload.addEventListener('click', function(){
    let dummy = replyContent.value.trim();
    if(dummy.length <= 0) {
        alert('내용을 입력하세요.');
    }else {
        alert('등록완료');
    }
});


/**
 * 
 * @brief 객체의 tagname을 판단하여 댓글 사이즈 검증 / 500자 제한
 * @author JJH
 * @param obj 검증할 node 객체
 * @param index 이벤트가 발생한 객체의 index
 * 
 */
function replySize(obj, index) {

    switch (obj.tagName) {
        case 'P':

            if(obj.innerText.length<=500) {
                replyInputSize[index].innerText = `( ${obj.innerText.length} / 500 )`;
            } else {
                obj.innerText = obj.innerText.slice(0,500);
                replyInputSize[index].innerText = `( ${obj.innerText.length} / 500 )`;
                alert('댓글은 500자 이하까지 허용됩니다.');
            }
            
            break;
        
        case 'TEXTAREA':

            if(obj.value.length<=500) {
                replyInputSize[index].innerText = `( ${obj.value.length} / 500 )`;
            } else {
                obj.value = obj.value.slice(0,500);
                replyInputSize[index].innerText = `( ${obj.value.length} / 500 )`;
                alert('댓글은 500자 이하까지 허용됩니다.');
            }

            break;

        default:

            break;
    }

}


// 수정 버튼 이벤트 등록
replyModBtn.forEach((el, index)=>{
    el.addEventListener('click', function(){

        // 수정버튼 클릭시
        if(el.innerText == '수정') {

            // 이전 데이터 저장
            replyList[index].dataset.dummy = replyList[index].innerText;
            // size 표시 부분 계산 및 활성화
            replyInputSize[index+1].style.display = 'inline-block';
            replyInputSize[index+1].innerText = `( ${replyList[index].innerText.length} / 500 )`;
            // 버튼 내부 내용변경
            el.innerText = '등록';
            // 댓글 수정 활성화
            replyList[index].contentEditable = true;
            // 클릭 이벤트 등록
            replyList[index].addEventListener('input', function() {
                replySize(this, index+1)
            });
            replyList[index].focus();
            // 취소버튼 활성화
            replyCancelBtn[index].style.display = 'inline-block';

        // 등록버튼 클릭시
        } else {

            // 이전 데이터 초기화
            replyList[index].dataset.dummy = '';
            // size 표시 부분 비활성화
            replyInputSize[index+1].style.display = 'none';
            // 버튼 내부 내용변경
            el.innerText = '수정';
            // 댓글 수정 비활성화
            replyList[index].contentEditable = false;
            // 취소버튼 비활성화
            replyCancelBtn[index].style.display = 'none';

        }
    })
});


// 취소버튼 click 이벤트 등록
replyCancelBtn.forEach((el, index)=>{

    el.addEventListener('click', function() {
        // size 표시 비활성화
        replyInputSize[index+1].style.display = 'none';
        // 수정버튼 표시
        replyModBtn[index].innerText = '수정';
        // 취소버튼 비활성화
        el.style.display = 'none';
        // 이전 데이터로 되돌림
        replyList[index].innerText = replyList[index].dataset.dummy;
        // 데이터 초기화
        replyList[index].dataset.dummy = '';
        // 댓글수정 비활성화
        replyList[index].contentEditable = false;
    })
})