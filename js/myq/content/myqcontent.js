import Handler from './controller.js';

// 목록 클릭시 뒤로가기 이벤트
Handler.historyBack();

// 수정버튼 생성시 이벤트 등록
if(document.querySelector('.btn-myq-mod') !== null) {
    // 수정버튼 이벤트
    Handler.bindModifyClickEvent();
    // 삭제버튼 이벤트
    Handler.bindDeleteClickEvent();
} else {
    // 수정버튼 미생성시 이벤트 등록
    $('#summernote').summernote({
        placeholder: '답변을 작성하세요.'
    });
    // 등록버튼 이벤트
    Handler.bindRegisterClickEvent();
}