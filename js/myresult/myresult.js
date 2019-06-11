'use strict';

import {Communication, Handler} from './controller.js';
import View from './view.js';

Handler.createFirstTable();


// class Communication {
//     static asyncPostPromise(url) {
//         return new Promise((resolve, reject)=>{
//             const xhr = new XMLHttpRequest();
//             xhr.setRequestHeader('Content-type', 'application/json');
//             xhr.open('POST', url);
//             xhr.onload = () => resolve(xhr.responseText);
//             xhr.onerror = () => reject(xhr.statusText);
//             const connectURL = 'http://www.worldspon.net/game/myBet/1670';
//             const userUID = connectURL.slice(connectURL.lastIndexOf('/')+1);
//             const sendObject = {
//                 appid : userUID
//             }
//             xhr.send(JSON.stringify(sendObject));
//         })
//     }
// }

// class Handler {

// }


const myResultContentBox = document.querySelector('.myresult-content-box');
const gameCategoryButton = document.querySelectorAll('.mybet-content-box > button');
let _fnc;

// add,remove event 하기 위해 함수 선언
bindClickEventFunction();

// 첫 접속시 좀비레이스 테이블 생성
createFirstTable();


/**
 * 
 * @brief event add, remove를 위해 _fnc 변수에 함수를 추가
 * @author JJH
 * @see 참고사항
 * 
 */
function bindClickEventFunction() {
    _fnc = function(e) {

        setColorClass(e.target);
    
        if(e.target.innerText == '좀비낙하') {
            let data = gameResultPromise('POST', 'http://192.168.0.24:8080/game/myBet/zombieDrop');
            data.then((data)=>{
                gameCategoryButton.forEach((gameButton)=>{
                    gameButton.removeEventListener('click', _fnc)
                })
                data = JSON.parse(data);
                if(data.errorCode == 0) {
                    createDropTable(data.drop);
                }
                gameCategoryButton.forEach((gameButton)=>{
                    if(e.target.innerText != gameButton.innerText) {
                        gameButton.addEventListener('click', _fnc);
                    }
                })
            }, (err)=>{
                alert(err);
            });
    
        }else if(e.target.innerText == '좀비격투') {
            let data = gameResultPromise('POST', 'http://192.168.0.24:8080/game/myBet/zombieFight');
            data.then((data)=>{
                gameCategoryButton.forEach((gameButton)=>{
                    gameButton.removeEventListener('click', _fnc)
                })
                data = JSON.parse(data);
                if(data.errorCode == 0) {
                    createFightTable(data.fight);
                }
                gameCategoryButton.forEach((gameButton)=>{
                    if(e.target.innerText != gameButton.innerText) {
                        gameButton.addEventListener('click', _fnc);
                    }
                })
            }, (err)=>{
                alert(err);
            });
        } else if(e.target.innerText == '좀비격파') {
    
            let data = gameResultPromise('POST', 'http://192.168.0.24:8080/game/myBet/zombieBreak');
            data.then((data)=>{
                gameCategoryButton.forEach((gameButton)=>{
                    gameButton.removeEventListener('click', _fnc)
                })
                data = JSON.parse(data);
                if(data.errorCode == 0) {
                    createTable(data.break, e.target.innerText);
                }
                gameCategoryButton.forEach((gameButton)=>{
                    if(e.target.innerText != gameButton.innerText) {
                        gameButton.addEventListener('click', _fnc);
                    }
                })
            }, (err)=>{
                alert(err);
            });
    
        } else {
            
            let data = gameResultPromise('POST', 'http://192.168.0.24:8080/game/myBet/zombieRace');
            data.then((data)=>{
                gameCategoryButton.forEach((gameButton)=>{
                    gameButton.removeEventListener('click', _fnc)
                })
                data = JSON.parse(data);
                if(data.errorCode == 0) {
                    createTable(data.race, e.target.innerText);
                }
                gameCategoryButton.forEach((gameButton)=>{
                    if(e.target.innerText != gameButton.innerText) {
                        gameButton.addEventListener('click', _fnc);
                    }
                })
            }, (err)=>{
                alert(err);
            });
        }
    }
}


/**
 * 
 * @brief 첫 접속시 좀비레이스 테이블 생성
 * @author JJH
 * @see 참고사항
 * 
 */
function createFirstTable() {
    let data = gameResultPromise('POST', 'http://192.168.0.24:8080/game/myBet/zombieRace');
    data.then((data)=>{
        gameCategoryButton.forEach((gameButton)=>{
            gameButton.removeEventListener('click', _fnc)
        })
        data = JSON.parse(data);
        if(data.errorCode == 0) {
            createTable(data.race, '좀비레이스');
        }
        gameCategoryButton.forEach((gameButton)=>{
            if('좀비레이스' != gameButton.innerText) {
                gameButton.addEventListener('click', _fnc);
            }
        })
    }, (err)=>{
        alert(err);
    });
}
 

/**
 * 
 * @brief 비동기 통신
 * @author JJH
 * @param type 통신 방식
 * @param url 통신 할 URL
 * 
 */
function gameResultPromise(type, url) {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        // let id = 'http://192/game/myBet/1670';
        const obj = {
            appid : '1670'
        }
        xhr.send(JSON.stringify(obj));
    })
}

/**
 * 
 * @brief 선택된 버튼에 class를 추가하여 색 변경
 * 버튼 객체를 전부 on class 해제 후 선택 버튼에 class 추가
 * @author JJH
 * @param clickedButton 클릭 된 버튼객체
 * 
 */
function setColorClass(clickedButton) {
    gameCategoryButton.forEach((nonClickedButton)=>{
        nonClickedButton.classList.remove('on');
    });
    clickedButton.classList.add('on');
}


/**
 * 
 * @brief 좀비레이스, 좀비격파 테이블 생성
 * @author JJH
 * @param data 해당 JSON 데이터
 * @param gameTitle 해당 게임 타이틀
 * 
 */
function createTable(data, gameTitle) {

    let dummyText = '';

    dummyText = 
    `<table>
        <caption class="tb-main-title">${gameTitle} 베팅기록</caption>
        <thead>
            <tr class="myresult-small-title one-line">
                <th class="date-col">일시</th>
                <th class="betting-zombie">베팅결과</th>
                <th class="game-money-col">당첨보상</th>
                <th class="result-grade">결과</th>
            </tr>
        </thead>
    <tbody>`;

    for(let el of data) {
        dummyText +=
        `<tr class="one-line border-bottom">
            <td>${el.gameCount}회차<br>${el.dateTime}</td>
            <td>${el.zombieName}<br>배팅쿠폰 : ${el.coupon}개</td>
            <td>게임머니 : ${el.resultGameMoney}G<br>랭킹점수 : ${el.resultRank}점</td>
            <td>${el.result}</td>
        </tr>`
    }

    dummyText += `</tbody></table>`;

    myResultContentBox.innerHTML = dummyText;
}


/**
 * 
 * @brief 좀비격투 테이블 생성
 * @author JJH
 * @param data 해당 JSON 데이터
 * 
 */
function createFightTable(data) {
    let dummyText ='';

    dummyText = `<table>
    <caption class="tb-main-title">좀비격투 베팅기록</caption>
    <thead>
        <tr class="myresult-small-title one-line">
            <th class="date-col">일시</th>
            <th class="betting-zombie">베팅결과</th>
            <th class="game-money-col">당첨보상</th>
            <th class="result-grade">결과</th>
        </tr>
    </thead>
    <tbody>`;

    for(let el of data) {
        dummyText += 
        `<tr class="one-line border-bottom">
            <td>${el.gameCount}회차<br>${el.dateTime}</td>
            <td>${el.zombieName}<br>${el.koChoice}<br>배팅쿠폰 ${el.coupon}개</td>
            <td>게임머니 : ${el.resultGameMoney}G<br>랭킹점수 : ${el.resultRank}점</td>
            <td>${el.gameResult}</td>
        </tr>`;
    }

    dummyText += `</tbody></table>`;

    

    myResultContentBox.innerHTML = dummyText;
}


/**
 * 
 * @brief 좀비낙하 테이블 생성
 * @author JJH
 * @param data 해당 JSON 데이터
 * 
 */
function createDropTable(data) {

    let dummyText = '';

    dummyText = `<table>
    <caption class="tb-main-title">좀비낙하 베팅기록</caption>
    <thead>
        <tr class="myresult-small-title one-line">
            <th class="date-col">일시</th>
            <th class="choice-number">선택번호</th> 
            <th class="goal-times">당첨수</th>
            <th class="game-reward">당첨보상</th>
        </tr>
    </thead>
    <tbody>`;

    for(let el of data) {
        dummyText +=
        `<tr class="one-line border-bottom">
            <td>${el.gameCount}회차<br>${el.dateTime}</td>
            <td>${el.result}</td>
            <td>${el.matchPoint}</td>
            <td>최고등수 : ${el.grade}<br>스폰 : ${el.prizeSpon}개<br>게임머니 : ${el.prizeGameMoney}G<br>랭킹점수 : ${el.prizeRank}점</td>
        </tr>`;
    }

    dummyText +=
    `</tbody>
    </table>`;

    myResultContentBox.innerHTML = dummyText;

}