'use strict';

$('#summernote').summernote({
    placeholder: '내용을 입력해주시기 바랍니다.',
    tabsize: 2,
    height: 700
});

document.querySelector('.btn-gogo').addEventListener('click', () => {
    setNoticeJSON();
});

document.querySelector('.btn-back').addEventListener('click', () => {
    window.history.back();
});

function setNoticeJSON() {
    const a = document.querySelector('.notice-editor-tab');
    console.log(a.selectedOptions[0].value);
}