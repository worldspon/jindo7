'use strict';

const writingBtn = document.querySelector('.btn-writing');
const cancelBtn = document.querySelector('.btn-cancel');
const boardTitle = document.querySelector('.board-writing-title');
const boardContent = document.querySelector('.board-writing-content');

// 글작성 이벤트 검증, 등록
writingBtn.addEventListener('click', ()=>{

    if(boardTitle.value.trim() == '') {
        alert('제목을 입력해주세요.');
        return 0;
    } else if(boardContent.value.trim() == '') {
        alert('내용을 입력해주세요.');
        return 0;
    }

    let postObj = {
        'title' : boardTitle.value.trim(),
        'content' : boardContent.value.trim()
    };

    postObj = JSON.stringify(postObj);
    
    let data = regPost('POST', 'http://192.168.0.24:8080/board/write', postObj);

    data.then((data)=>{
        data = JSON.parse(data);
        alert(data.msg);
        if(data.errorCode == 0) {
            window.location.href = './board.html';
        }
    }, (err)=>{
        alert(err);
    });
});

// 취소이벤트
cancelBtn.addEventListener('click', ()=>{
    window.history.back();
});


/**
 * 
 * @brief 비동기통신
 * @author JJH
 * @param type 통신 타입
 * @param url 통신 url
 * @param obj 통신으로 보낼 JSON 객체
 * 
 */
function regPost(type, url, obj) {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj);
    });
};