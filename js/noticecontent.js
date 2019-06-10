'use strict';

const listBtn = document.querySelector('.list-btn');


listBtn.addEventListener('click', function() {
    window.history.back();
});

document.querySelector('.btn-del').addEventListener('click', () => {
    delcontent();
});


function delcontent() {
    const sendObject = {
        id : document.querySelector('.notice-title').dataset.id
    }
    const sendResult = asyncCommunication('http://192.168.0.24:8080/notice/delete', sendObject);
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