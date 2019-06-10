'use strict';

let prevAnswer = '';
console.log(typeof document.querySelector('.myq-content-title').dataset.isAnswer);
if(document.querySelector('.myq-content-title').dataset.isAnswer === 'true') {
    setModFunc();
    setDelFunc();
} else {
    setRegFunc();
}

function setDelFunc() {
    document.querySelector('.btn-myq-del').addEventListener('click', function() {
        if(confirm('삭제하시겠습니까?')){
            const sendObject = {
                questionId : document.querySelector('.myq-content-title').dataset.id, 
            };
            const sendResult = asyncCommunication('http://192.168.0.24:8080/myQ/answers/create', sendObject);
            sendResult.then((result)=>{
                const resultData = JSON.parse(result);
                if(resultData.errorCode === 0) {
                    alert(resultData.msg);
                } else {
                    alert(resultData.msg);
                }
            }, ()=>{
                alert(`서버와 통신에 실패했습니다. 다시 시도해주세요.`); 
            })
        }
    })
}


function setRegFunc() {
    document.querySelector('.btn-myq-confirm').addEventListener('click', function(){

        if(confirm('등록하시겠습니까?')){
            const sendObject = {
                questionId : document.querySelector('.myq-content-title').dataset.id, 
                content : document.querySelector('#summernote').value
            };
            const sendResult = asyncCommunication('http://192.168.0.24:8080/myQ/answers/create', sendObject);
            sendResult.then((result)=>{
                const resultData = JSON.parse(result);
                if(resultData.errorCode === 0) {
                    alert(resultData.msg);
                } else {
                    alert(resultData.msg);
                }
            }, ()=>{
                alert(`서버와 통신에 실패했습니다. 다시 시도해주세요.`); 
            })
        }
    })
}


function setModFunc() {
    document.querySelector('.btn-myq-mod').addEventListener('click', function(){
        if(this.innerText === '수정') {
            setEditable(this)
        } else {
            if(confirm('등록하시겠습니까?')){
                setNoEditable(this);
                const sendObject = {
                    questionId : document.querySelector('.myq-content-title').dataset.id, 
                    id : document.querySelector('.myq-content-r').dataset.id,
                    content : document.querySelector('.myq-content-r > span').innerText
                };
                const sendResult = asyncCommunication('http://192.168.0.24:8080/myQ/answers/modify', sendObject);
                sendResult.then((result)=>{
                    const resultData = JSON.parse(result);
                    if(resultData.errorCode === 0) {
                        alert(resultData.msg);
                    } else {
                        alert(resultData.msg);
                    }
                }, ()=>{
                    alert(`서버와 통신에 실패했습니다. 다시 시도해주세요.`); 
                })
            } else {
                document.querySelector('.myq-content-r > span').innerText = prevAnswer;
                setNoEditable(this);
                prevAnswer = '';
            }
        }
    })
}

function setEditable(button) {
    button.innerText = '등록';
    prevAnswer = document.querySelector('.myq-content-r > span').innerText;
    document.querySelector('.myq-content-r > span').contentEditable = true;
    document.querySelector('.myq-content-r > span').style.outline = 'none';
    document.querySelector('.myq-content-r > span').focus();
}

function setNoEditable(button) {
    button.innerText = '수정';
    document.querySelector('.myq-content-r > span').contentEditable = false;
}

function asyncCommunication(url, sendObject){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(JSON.stringify(sendObject));
    })
}



document.querySelector('.list-btn').addEventListener('click', function() {
    window.history.back();
});

$('#summernote').summernote({
    placeholder: '답변을 작성하세요.',
    tabsize: 2
});