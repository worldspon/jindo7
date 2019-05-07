'use strict;'
const listBtn = document.querySelector('.list-btn');

listBtn.addEventListener('click', function() {
    window.history.back();
});

$('#summernote').summernote({
    placeholder: '답변을 작성하세요.',
    tabsize: 2
});