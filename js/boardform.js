'use strict';

const writingBtn = document.querySelector('.btn-writing');
const cancelBtn = document.querySelector('.btn-cancel');
const boardTitle = document.querySelector('.board-writing-title');
const boardContent = document.querySelector('.board-writing-content');

writingBtn.addEventListener('click', ()=>{

    if(boardTitle.value.trim() == '') {
        alert('제목을 입력해주세요.');
        return 0;
    } else if(boardContent.value.trim() == '') {
        alert('내용을 입력해주세요.');
        return 0;
    }
    console.log('a');
});

cancelBtn.addEventListener('click', ()=>{
    window.history.back();
});