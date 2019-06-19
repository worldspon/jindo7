import { Init } from './controller.js';

// 수정버튼 생성시 이벤트 등록
if(document.querySelector('.btn-myq-mod') !== null) {
    // 수정버튼 이벤트
    Init.bindEventAnswerExist();
} else {
    // 수정버튼 미생성시 이벤트 등록
    // 등록버튼 이벤트
    Init.bindEventAnswerNoExist();
}