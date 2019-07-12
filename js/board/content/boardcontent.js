import { Init } from './controller.js';

Init.bindEvent();
// // 댓글 글자수 표시 span
// const replyInputSize = document.querySelectorAll('.reply-input-size');
// // 댓글 내용
// const replyContent = document.querySelector('.reply-some-words');
// // 댓글 등록버튼
// const replyUpload = document.querySelector('.board-reply-upload');

// // 댓글 수정버튼 배열
// const replyModBtn = document.querySelectorAll('.reply-mod');
// // 댓글 삭제버튼 배열
// const replyDelBtn = document.querySelectorAll('.reply-del');
// // 댓글 수정취소버튼 배열
// const replyCancelBtn = document.querySelectorAll('.reply-cancel');





// // size 검증 함수 등록
// replyContent.addEventListener('input', function() {
//     replySize(this, this.parentNode.children[0].children[1]);
// });

// // 등록 이벤트, 검증
// replyUpload.addEventListener('click', function(){

//     if(replyContent.value.trim().length <= 0) {
//         alert('내용을 입력하세요.');
//     }else {

//         let replyObj = {
//             'board' : {
//                 'boardId' : document.querySelector('.individual-board-title').dataset.boardId
//             },
//             'content' : replyContent.value.trim()
//         };
    
//         replyObj = JSON.stringify(replyObj);
        
//         let data = dataPost('POST', 'http://192.168.0.24:8080/board/comment/write', replyObj);
    
//         data.then((data)=>{
//             data = JSON.parse(data);
//             alert(data.msg);
//             if(data.errorCode == 0) {
//                 location.reload(true);
//             }
//         }, (err)=>{
//             alert(err);
//         });
//     }

// });

// // 수정 버튼 이벤트 등록
// replyModBtn.forEach((el)=>{
//     el.addEventListener('click', function(){

//         let commentId = el.parentNode.dataset.commentId;
//         let commentContent =el.parentNode.nextSibling.nextSibling.children[0];
//         let commentSize = el.parentNode.children[1];
//         let cancelBtn = el.parentNode.children[4];

//         // 수정버튼 클릭시
//         if(el.innerText == '수정') {

//             commentContent.style.border = '1px solid black';

//             // 이전 데이터 저장
//             commentContent.dataset.dummy = commentContent.innerText;
//             // size 표시 부분 계산 및 활성화
//             commentSize.style.display = 'inline-block';
//             commentSize.innerText = `( ${commentContent.innerText.trim().length} / 500 )`;
//             // 버튼 내부 내용변경
//             el.innerText = '등록';
//             // 댓글 수정 활성화
//             commentContent.contentEditable = true;
//             // input 이벤트 등록
//             commentContent.addEventListener('input', function() {
//                 replySize(this, commentSize);
//             });
//             commentContent.focus();
//             // 취소버튼 활성화
//             cancelBtn.style.display = 'inline-block';

//         // 등록버튼 클릭시
//         } else {

//             if(commentContent.innerText.trim().length>0) {
//                 commentContent.style.border = 'none';

//                 let commentObj = {
//                     'commentId' : commentId,
//                     'content' : commentContent.innerText.trim()
//                 }
            
//                 commentObj = JSON.stringify(commentObj);
                
//                 let data = dataPost('POST', 'http://192.168.0.24:8080/board/comment/modify', commentObj);
            
//                 data.then((data)=>{
//                     data = JSON.parse(data);
//                     alert(data.msg);
//                     if(data.errorCode == 0) {
//                         location.reload(true);
//                     }
//                 }, (err)=>{
//                     alert(err);
//                 });

//                 // 이전 데이터 초기화
//                 commentContent.dataset.dummy = '';
//                 // size 표시 부분 비활성화
//                 commentSize.style.display = 'none';
//                 // 버튼 내부 내용변경
//                 el.innerText = '수정';
//                 // 댓글 수정 비활성화
//                 commentContent.contentEditable = false;
//                 // 취소버튼 비활성화
//                 cancelBtn.style.display = 'none';

//             } else {
//                 alert('ㅗㅗ');
//             }

//         }
//     })
// });


// // 취소버튼 click 이벤트 등록
// replyCancelBtn.forEach((el)=>{

//     el.addEventListener('click', function() {
//         let commentSize = el.parentNode.children[1];
//         let modBtn = el.parentNode.children[3];
//         let commentContent =el.parentNode.nextSibling.nextSibling.children[0];

//         commentContent.style.border = 'none';
//         // size 표시 비활성화
//         commentSize.style.display = 'none';
//         // 수정버튼 표시
//         modBtn.innerText = '수정';
//         // 취소버튼 비활성화
//         el.style.display = 'none';
//         // 이전 데이터로 되돌림
//         commentContent.innerText = commentContent.dataset.dummy;
//         // 데이터 초기화
//         commentContent.dataset.dummy = '';
//         // 댓글수정 비활성화
//         commentContent.contentEditable = false;
//     })
// });

// // 삭제버튼 click 이벤트 등록
// replyDelBtn.forEach((el)=>{

//     el.addEventListener('click', function() {

//         // 삭제 확인
//         let delBool = confirm('삭제?');

//         if(delBool) {

//             let commentId = el.parentNode.dataset.commentId;

//             let delObj = {
//                 'commentId' : commentId,
//             }
        
//             delObj = JSON.stringify(delObj);
            
//             let data = dataPost('POST', 'http://192.168.0.24:8080/board/comment/delete', delObj);
        
//             data.then((data)=>{
//                 data = JSON.parse(data);
//                 alert(data.msg);
//                 if(data.errorCode == 0) {
//                     location.reload(true);
//                 }
//             }, (err)=>{
//                 alert(err);
//             });
//         }
//     })
// })


// /**
//  * 
//  * @brief 댓글 사이즈 검증 / 500자 제한
//  * @author JJH
//  * @param obj 검증할 node 객체
//  * @param sizeObj 검증할 객체의 size 부분
//  * 
//  */
// function replySize(obj, sizeObj) {
//     let objLength;
//     switch (obj.tagName) {
//         case 'P':
//             objLength = obj.innerText.trim().length;
//             if(objLength<=500) {
//                 sizeObj.innerText = `( ${objLength} / 500 )`;
//             } else {
//                 obj.innerText = obj.innerText.slice(0,500).trim();
//                 objLength = obj.innerText.length;
//                 sizeObj.innerText = `( ${objLength} / 500 )`;
//                 alert('댓글은 500자 이하까지 허용됩니다.');
//             }
            
//             break;
        
//         case 'TEXTAREA':
//             objLength = obj.value.trim().length;
//             if(objLength<=500) {
//                 sizeObj.innerText = `( ${objLength} / 500 )`;
//             } else {
//                 obj.value = obj.value.slice(0,500).trim();
//                 objLength = obj.value.length;
//                 sizeObj.innerText = `( ${objLength} / 500 )`;
//                 alert('댓글은 500자 이하까지 허용됩니다.');
//             }

//             break;

//         default:

//             break;
//     }

// }




// /**
//  * 
//  * @brief 비동기통신
//  * @author JJH
//  * @param type 통신 타입
//  * @param url 통신 url
//  * @param obj 통신으로 보낼 JSON 객체
//  * 
//  */
// function dataPost(type, url, obj) {
//     return new Promise((resolve, reject)=>{
//         const xhr = new XMLHttpRequest();
//         xhr.open(type, url);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onload = () => resolve(xhr.responseText);
//         xhr.onerror = () => reject(xhr.statusText);
//         xhr.send(obj);
//     });
// };