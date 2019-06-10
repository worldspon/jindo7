'use strict';

$('#summernote').summernote({
    placeholder: '내용을 입력해주시기 바랍니다.',
    tabsize: 2,
    height: 700
});

document.querySelector('.btn-gogo').addEventListener('click', () => {
    modcontent();
    
});

document.querySelector('.btn-back').addEventListener('click', () => {
    window.history.back();
});

function asyncCommunication(url, sendObject) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(JSON.stringify(sendObject));
    });
}

function modcontent() {
    const sendObject = {
        id : document.querySelector('.notice-editor-title').dataset.id,
        type : document.querySelector('.notice-editor-tab').selectedOptions[0].value,
        title : document.querySelector('.edit-title').value,
        content : document.querySelector('#summernote').value
    }

    const sendResult = asyncCommunication('http://192.168.0.24:8080/notice/modify', sendObject);
    sendResult.then((result) => {
        const resultData = JSON.parse(result);
        if(resultData.errorCode === 0) {
            alert(resultData.msg);
            window.location.href = 'http://worldspon.net/notice/0/ALL/';
        } else {
            alert(resultData.msg);
        }
    }, () => {
        alert(`서버와 통신에 실패했습니다. 다시 시도해주세요.`);
    })
}