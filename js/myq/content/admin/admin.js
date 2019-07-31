import { Init } from './controller.js';

if(document.querySelector('.answer-wrapper') !== null) {
    // 답변이 작성 문의글 EVENT BIND
    Init.bindEventAnswerExist();
} else {
    // 답변이 미작성 문의글 EVENT BIND
    Init.bindEventAnswerNoExist();
}