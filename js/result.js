'use strict';


let winWidth = window.innerWidth;
let pcFlag = winWidth > 1860 ? true : false;
let nowMon = new Date().getMonth()+1;
let nowDay = new Date().getDate();
let startTime = new Date(new Date().getFullYear(), nowMon-1, nowDay, '00', '00', '00', '00').getTime();
let nowTime = Date.now();
let flowTime = nowTime - startTime;

let fiveMcountTime = Math.floor(flowTime/300000);
let threeMcountTime = Math.floor(flowTime/180000);

const main = document.querySelector('main');
const raceHl = document.querySelector('.zombie-race .content-hl');
const breakHl = document.querySelector('.zombie-break .content-hl');
const fightHl = document.querySelector('.zombie-fight .content-hl');
const dropHl = document.querySelector('.zombie-drop .content-hl');
const mdHl = document.querySelector('.md-tb .content-hl');
const btnToday = document.getElementsByClassName('btn-today');
const btnPrev = document.getElementsByClassName('btn-prev');
const mdWrap = document.querySelector('.md-wrap');
const mdCloseBtn = document.querySelector('.md-close-btn');

let raceTb = document.querySelector('.zombie-race table tbody');
let fightTb = document.querySelector('.zombie-fight table tbody');
let breakTb = document.querySelector('.zombie-break table tbody');
let dropTb = document.querySelector('.zombie-drop table tbody');
let mdTable = document.querySelector('.md-wrap table');

let raceToday, raceYesterday, breakToday, breakYesterday, fightToday, fightYesterday, dropToday, dropYesterday;

//(5분) 다음게임 종료까지 흐른시간
let restTimeFive = 300000 - (flowTime%300000);
let restMFive = Math.floor(restTimeFive/60000);
let restSFive = Math.floor((restTimeFive%60000)/1000);
let restMsFive = (restTimeFive%60000)%1000+1000;

let restTimeThree = 180000 - (flowTime%180000);
let restMThree = Math.floor(restTimeThree/60000);
let restSThree = Math.floor((restTimeThree%60000)/1000);
let restMsThree = (restTimeThree%60000)%1000+1000;

let raceCount = document.querySelector('.race-countdown');
let fightCount = document.querySelector('.fight-countdown');
let breakCount = document.querySelector('.break-countdown');
let dropCount = document.querySelector('.drop-countdown');

raceCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
fightCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
breakCount.innerText = `잔여시간 : 0${restMThree}:${restSThree > 9 ? restSThree : `0${restSThree}`}`;
dropCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;

setTimeout(()=>{
    fivemCount();
    setInterval(fivemCount,1000);
},restMsFive)

setTimeout(()=>{
    threemCount();
    setInterval(threemCount,1000);
},restMsThree)

function fivemCount() {
    if((restMFive > 0 && restSFive > 0) || (restMFive <= 0 && restSFive > 0)) {
        restSFive--;
        raceCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        fightCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        dropCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
    } else if(restMFive > 0 && restSFive <= 0) {
        restMFive--;
        restSFive = 59;
        raceCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        fightCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        dropCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
    } else if(restMFive <= 0 && restSFive <= 0) {
        restMFive = 4;
        restSFive = 59;
        raceCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        fightCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        dropCount.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;

        nowTime = Date.now();
        flowTime = nowTime - startTime;
        fiveMcountTime = Math.floor(flowTime/300000);
        gameDataLoad('zombieRace', 'today');
        gameDataLoad('zombieFight', 'today');
        gameDataLoad('zombieDrop', 'today');
    }
}

function threemCount() {

    if((restMThree > 0 && restSThree > 0) || (restMThree <= 0 && restSThree > 0)) {
        restSThree--;
        breakCount.innerText = `잔여시간 : 0${restMThree}:${restSThree > 9 ? restSThree : `0${restSThree}`}`;
    } else if(restMThree > 0 && restSThree <= 0) {
        restMThree--;
        restSThree = 59;
        breakCount.innerText = `잔여시간 : 0${restMThree}:${restSThree > 9 ? restSThree : `0${restSThree}`}`;
    } else if(restMThree <= 0 && restSThree <= 0) {
        restMThree = 2;
        restSThree = 59;
        breakCount.innerText = `잔여시간 : 0${restMThree}:${restSThree > 9 ? restSThree : `0${restSThree}`}`;
        nowTime = Date.now();
        flowTime = nowTime - startTime;
        threeMcountTime = Math.floor(flowTime/180000);
        gameDataLoad('zombieBreak', 'today');
    }
}

window.addEventListener('resize', () => {

    winWidth = window.innerWidth;

    if(winWidth > 1860) {
        if(!pcFlag) {
            pcFlag = true;
            createPcTable(raceToday, 'zombieRace');
            createPcTable(fightToday, 'zombieFight');
            createPcTable(breakToday, 'zombieBreak');
            createPcTable(dropToday, 'zombieDrop');
        }
    }

    if(winWidth <= 1860 ) {
        if(pcFlag) {
            pcFlag = false;
            createMobileTable(raceToday, 'zombieRace');
            createMobileTable(fightToday, 'zombieFight');
            createMobileTable(breakToday, 'zombieBreak');
            createMobileTable(dropToday, 'zombieDrop');
        }
    }

});


raceHl.innerText = `0${nowMon}.${nowDay} 좀비레이스`;
breakHl.innerText = `0${nowMon}.${nowDay} 좀비격파`;
fightHl.innerText = `0${nowMon}.${nowDay} 좀비격투`;
dropHl.innerText = `0${nowMon}.${nowDay} 좀비낙하`;


gameDataLoad('zombieRace', 'today');
gameDataLoad('zombieFight', 'today');
gameDataLoad('zombieBreak', 'today');
gameDataLoad('zombieDrop', 'today');

// prevDataLoad(prevUrl);


mdCloseBtn.addEventListener('click', ()=>{
    mdWrap.style.display = 'none';
});

// 더보기 버튼 이벤트 추가
Array.from(btnToday).forEach((el) => {
    el.addEventListener('click', () => {
        mdWrap.style.display = 'block';
        createModalTable(el.dataset.type);
        main.offsetHeight > mdWrap.offsetHeight ? mdWrap.style.height = main.offsetHeight + 'px' : mdWrap.style.height = 'auto';
    })
});


// 어제결과 버튼 이벤트 추가
Array.from(btnPrev).forEach((el) => {
    el.addEventListener('click', () => {
        mdWrap.style.display = 'block';
        // let a = main.offsetHeight;
        createPrevTable(el.dataset.type);
        main.offsetHeight > mdWrap.offsetHeight ? mdWrap.style.height = main.offsetHeight + 'px' : mdWrap.style.height = 'auto';
    })
});




/**
 * @brief promise 객체 생성
 * @author JJH
 * @see url만 바꿔서 쓰면 된다.
 */
function AsyncValidateFnc(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
}




async function gameDataLoad(type,date='today') {
    try {
        let data;
        switch (type) {
            case 'zombieRace': {

                data = await AsyncValidateFnc(`http://192.168.0.24:8080/game/${type}/${date}`);
                data = JSON.parse(data);

                if(date=='today') {
                    raceToday = data[type];
                } else {
                    raceYesterday = data[type];
                }
                
                break;
            }
    
            case 'zombieFight': {

                data = await AsyncValidateFnc(`http://192.168.0.24:8080/game/${type}/${date}`);
                data = JSON.parse(data);

                if(date=='today') {
                    fightToday = data[type];
                } else {
                    fightYesterday = data[type];
                }
                break;
            }
    
            case 'zombieBreak': {

                data = await AsyncValidateFnc(`http://192.168.0.24:8080/game/${type}/${date}`);
                data = JSON.parse(data);

                if(date=='today') {
                    breakToday = data[type];
                } else {
                    breakYesterday = data[type];
                }
                break;
            }
    
            case 'zombieDrop': {

                data = await AsyncValidateFnc(`http://192.168.0.24:8080/game/${type}/${date}`);
                data = JSON.parse(data);

                if(date=='today') {
                    dropToday = data[type];
                } else {
                    dropYesterday = data[type];
                }
                break;
            }
    
            default:
                break;
        }

        if(date == 'today') {
            pcFlag ? createPcTable(data[type], type) : createMobileTable(data[type], type);
        } else {
            createPrevTable(type);
        }

    } catch (error) {
        console.log(error);
    }
}




function createPcTable(data, type) {
    let myData = data;
    let tempHtml = '';
    switch (type) {
        case 'zombieRace': {

            if(myData.length <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${myData.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;
            }

            myData.forEach((el)=>{
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${el.count}</th>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win1}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win2}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win3}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win4}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win5}</td>
                </tr>`;
            });

            raceTb.innerHTML = tempHtml;
            tempHtml = '';

            break;
        }

        case 'zombieFight': {

            if(myData.length <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${myData.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;
            }

            myData.forEach((el)=>{
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${el.count}</th>
                    <td>${el.leftPlayer}</td>
                    <td>${el.rightPlayer}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.winner}</td>
                    <td>${el.count > fiveMcountTime || el.winner == '준비중' ? '준비중' : el.KO ? 'KO승' : '판정승'}</td>
                </tr>`;
            });
        
        
            fightTb.innerHTML = tempHtml;
        
            tempHtml = '';
            
            break;
        }

        case 'zombieBreak': {

            if(myData.length <= threeMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${myData.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;
            }

            myData.forEach((el)=>{
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${el.count}</th>
                    <td>${el.leftPlayer}</td>
                    <td>${el.count > threeMcountTime ? '준비중' : el.leftBroken}</td>
                    <td>${el.rightPlayer}</td>
                    <td>${el.count > threeMcountTime ? '준비중' : el.rightBroken}</td>
                    <td>${el.count > threeMcountTime ? '준비중' : el.winner}</td>
                </tr>`
            });
        
            breakTb.innerHTML = tempHtml;
        
            tempHtml = '';
            
            break;
        }

        case 'zombieDrop': {

            if(myData[0].count <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${myData.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;
            }
        
            myData.forEach((el)=>{
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${el.count}</th>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[0]}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[1]}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[2]}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[3]}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[4]}</td>
                </tr>`
            });
        
            dropTb.innerHTML = tempHtml;
            tempHtml = '';
            
            break;
        }

        default:
            break;
    }
}




function createMobileTable(data, type) {

    let myData = data;
    let tempHtml = '';

    switch (type) {
        case 'zombieRace': {
            
            // 게임 종료 후 준비중 상태가 들어오지 않은 경우
            if(myData.length <= fiveMcountTime) {

                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${myData.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;

                for(let i=0; i<myData.length; i++) {
                    if(i > 3) break;
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${myData[i].count}</th>
                        <td>${myData[i].win1}</td>
                        <td>${myData[i].win2}</td>
                        <td>${myData[i].win3}</td>
                        <td>${myData[i].win4}</td>
                        <td>${myData[i].win5}</td>
                    </tr>`;
                }

            } else {
                
                // 게임 종료 직전에 데이터가 미리 노출 되는것을 방지
                for(let i=0; i<myData.length; i++) {
                    if(i > 4) break;
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${myData[i].count}</th>
                        <td>${myData[i].count > fiveMcountTime ? '준비중' : myData[i].win1}</td>
                        <td>${myData[i].count > fiveMcountTime ? '준비중' : myData[i].win2}</td>
                        <td>${myData[i].count > fiveMcountTime ? '준비중' : myData[i].win3}</td>
                        <td>${myData[i].count > fiveMcountTime ? '준비중' : myData[i].win4}</td>
                        <td>${myData[i].count > fiveMcountTime ? '준비중' : myData[i].win5}</td>
                    </tr>`;
                }
            }            
        
            raceTb.innerHTML = tempHtml;
        
            tempHtml = '';

            break;
        }

        case 'zombieFight': {

            if(myData.length <= fiveMcountTime) {

                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${myData.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;

                for(let i=0; i<myData.length; i++) {
                    if(i > 3) break;
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${myData[i].count}</th>
                        <td>${myData[i].leftPlayer}</td>
                        <td>${myData[i].rightPlayer}</td>
                        <td>${myData[i].winner}</td>
                        <td>${myData[i].winner == '준비중' ? '준비중' : myData[i].KO ? 'KO승' : '판정승'}</td>
                    </tr>`;
                }

            } else {
                for(let i=0; i<myData.length; i++) {
                    if(i > 4) break;
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${myData[i].count}</th>
                        <td>${myData[i].leftPlayer}</td>
                        <td>${myData[i].rightPlayer}</td>
                        <td>${myData[i].count > fiveMcountTime ? '준비중' : myData[i].winner}</td>
                        <td>${myData[i].count > fiveMcountTime || myData[i].winner == '준비중' ? '준비중' : myData[i].KO ? 'KO승' : '판정승'}</td>
                    </tr>`;
                }
            }

            fightTb.innerHTML = tempHtml;
        
            tempHtml = '';
            
            break;
        }

        case 'zombieBreak': {

            if(myData.length <= threeMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${myData.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;

                for(let i=0; i<myData.length; i++) {
                    if(i > 3) break;
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${myData[i].count}</th>
                        <td>${myData[i].leftPlayer}</td>
                        <td>${myData[i].leftBroken}</td>
                        <td>${myData[i].rightPlayer}</td>
                        <td>${myData[i].rightBroken}</td>
                        <td>${myData[i].winner}</td>
                    </tr>`;
                }
            } else {
                for(let i=0; i<myData.length; i++) {
                    if(i > 4) break;
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${myData[i].count}</th>
                        <td>${myData[i].leftPlayer}</td>
                        <td>${myData[i].count > threeMcountTime ? "준비중" : myData[i].leftBroken}</td>
                        <td>${myData[i].rightPlayer}</td>
                        <td>${myData[i].count > threeMcountTime ? "준비중" : myData[i].rightBroken}</td>
                        <td>${myData[i].count > threeMcountTime ? "준비중" : myData[i].winner}</td>
                    </tr>`;
                }
            }
        
            breakTb.innerHTML = tempHtml;
        
            tempHtml = '';
            
            break;
        }

        case 'zombieDrop': {

            if(myData[0].count <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${myData.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;

                for (let i=0; i<myData.length; i++) {
                    if(i > 3) break;
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${myData[i].count}</th>
                        <td>${myData[i].result[0]}</td>
                        <td>${myData[i].result[1]}</td>
                        <td>${myData[i].result[2]}</td>
                        <td>${myData[i].result[3]}</td>
                        <td>${myData[i].result[4]}</td>
                    </tr>`;
                }
                
            } else {
                for(let i=0; i<myData.length; i++) {
                    if(i > 4) break;
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${myData[i].count}</th>
                        <td>${myData[i].count > fiveMcountTime ? "준비중" : myData[i].result[0]}</td>
                        <td>${myData[i].count > fiveMcountTime ? "준비중" : myData[i].result[1]}</td>
                        <td>${myData[i].count > fiveMcountTime ? "준비중" : myData[i].result[2]}</td>
                        <td>${myData[i].count > fiveMcountTime ? "준비중" : myData[i].result[3]}</td>
                        <td>${myData[i].count > fiveMcountTime ? "준비중" : myData[i].result[4]}</td>
                    </tr>`;
                }
            }
        
            dropTb.innerHTML = tempHtml;

            tempHtml = '';
            
            break;
        }

        default:
            break;
    }
}



// 더보기 modal fnc
function createModalTable(type) {

    let tempHtml = ``;

    switch (type) {
        case 'zombieRace': {

            mdHl.innerText = `0${nowMon}.${nowDay} 좀비레이스`;

            tempHtml+=
            `<thead>
                <tr class="th-row row">
                    <th class="first-tab">회차</th>
                    <th>1등</th>
                    <th>2등</th>
                    <th>3등</th>
                    <th>4등</th>
                    <th>5등</th>
                </tr>
            </thead>`;

            if(raceToday.length <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${raceToday.count}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;
            }

            raceToday.forEach((el)=>{
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${el.count}</th>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win1}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win2}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win3}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win4}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.win5}</td>
                </tr>`;
            });

            mdTable.innerHTML = tempHtml;
            tempHtml = '';
            break;

        }

        case 'zombieFight': {

            mdHl.innerText = `0${nowMon}.${nowDay} 좀비격투`;
            tempHtml +=
            `<thead>
                <tr class="th-row row">
                    <th class="first-tab">회차</th>
                    <th>좌측</th>
                    <th>우측</th>
                    <th>승자</th>
                    <th>KO여부</th>
                </tr>
            </thead>`;

            if(fightToday.length <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${fightToday.count}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;
            }

            fightToday.forEach((el)=>{
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${el.count}</th>
                    <td>${el.leftPlayer}</td>
                    <td>${el.rightPlayer}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.winner}</td>
                    <td>${el.count > fiveMcountTime || el.winner == '준비중' ? '준비중' : el.KO ? 'KO승' : '판정승'}</td>
                </tr>`;
            });
        
        
            mdTable.innerHTML = tempHtml;
        
            tempHtml = '';

            break;
        }

        case 'zombieBreak': {

            mdHl.innerText = `0${nowMon}.${nowDay} 좀비격파`;
            tempHtml +=
            `<thead>
                <tr class="th-row row">
                    <th class="first-tab">회차</th>
                    <th>좌측</th>
                    <th>격파수</th>
                    <th>우측</th>
                    <th>격파수</th>
                    <th>승자</th>
                </tr>
            </thead>`;

            if(breakToday.length <= threeMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${breakToday.count}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;
            }

            breakToday.forEach((el)=>{
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${el.count}</th>
                    <td>${el.leftPlayer}</td>
                    <td>${el.count > threeMcountTime ? '준비중' : el.leftBroken}</td>
                    <td>${el.rightPlayer}</td>
                    <td>${el.count > threeMcountTime ? '준비중' : el.rightBroken}</td>
                    <td>${el.count > threeMcountTime ? '준비중' : el.winner}</td>
                </tr>`
            });
            mdTable.innerHTML = tempHtml;
            break;
        }

        case 'zombieDrop': {

            mdHl.innerText = `0${nowMon}.${nowDay} 좀비낙하`;
            tempHtml +=
            `<thead>
                <tr class="th-row row">
                    <th class="first-tab">회차</th>
                    <th colspan="5">당첨번호</th>
                </tr>
            </thead>`;

            if(dropToday[0].count <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${dropToday.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;
            }
        
            dropToday.forEach((el)=>{
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${el.count}</th>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[0]}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[1]}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[2]}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[3]}</td>
                    <td>${el.count > fiveMcountTime ? '준비중' : el.result[4]}</td>
                </tr>`
            });

            mdTable.innerHTML = tempHtml;

            break;
        }
    
        default:
            break;
    }
 


    if(type == 'drop') {
        mdHl.innerText = `0${nowMon}.${nowDay} 좀비낙하`;
        tempHtml +=
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th>1번좀비</th>
                <th>2번좀비</th>
                <th>3번좀비</th>
                <th>4번좀비</th>
                <th>5번좀비</th>
            </tr>
        </thead>`;

        data.drop.forEach((el,index)=>{
            let dummyAry = el.sort((a,b)=> a-b);
            tempHtml +=
            `<tr class="tb-row row">
                <th class="first-tab">${index+1}</th>
                <td>${dummyAry[0]}</td>
                <td>${dummyAry[1]}</td>
                <td>${dummyAry[2]}</td>
                <td>${dummyAry[3]}</td>
                <td>${dummyAry[4]}</td>
            </tr>`
        });

        mdTable.innerHTML = tempHtml;
    }
}


// 어제결과 modal fnc
function createPrevTable(type) {

    let tempHtml = ``;

    switch (type) {

        case 'zombieRace': {
            if(!raceYesterday) {
                console.log('통신!')
                gameDataLoad(type, 'yesterday');
            } else {
                mdHl.innerText = `0${nowMon}.${nowDay-1} 좀비레이스`;
                tempHtml+=
                `<thead>
                    <tr class="th-row row">
                        <th class="first-tab">회차</th>
                        <th>1등</th>
                        <th>2등</th>
                        <th>3등</th>
                        <th>4등</th>
                        <th>5등</th>
                    </tr>
                </thead>`;

                tempHtml+=`<tbody>`;

                raceYesterday.forEach((el)=>{
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${el.count}</th>
                        <td>${el.win1}</td>
                        <td>${el.win2}</td>
                        <td>${el.win3}</td>
                        <td>${el.win4}</td>
                        <td>${el.win5}</td>
                    </tr>`
                });

                tempHtml+=`</tbody>`;
        
                mdTable.innerHTML = tempHtml;
            }

            break;
        }

        case 'zombieFight': {

            if(!fightYesterday) {
                console.log('통신!')
                gameDataLoad(type, 'yesterday');
            } else {

                mdHl.innerText = `0${nowMon}.${nowDay-1} 좀비격투`;
                tempHtml +=
                `<thead>
                    <tr class="th-row row">
                        <th class="first-tab">회차</th>
                        <th>좌측</th>
                        <th>우측</th>
                        <th>승자</th>
                        <th>KO여부</th>
                    </tr>
                </thead>`;

                tempHtml+=`<tbody>`;

                fightYesterday.forEach((el)=>{
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${el.count}</th>
                        <td>${el.leftPlayer}</td>
                        <td>${el.rightPlayer}</td>
                        <td>${el.winner}</td>
                        <td>${el.KO ? 'KO승' : '판정승'}</td>
                    </tr>`
                });

                tempHtml+=`</tbody>`;
        
                mdTable.innerHTML = tempHtml;
            }

            break;
        }

        case 'zombieBreak': {

            if(!breakYesterday) {
                console.log('통신!')
                gameDataLoad(type, 'yesterday');
            } else {

                mdHl.innerText = `0${nowMon}.${nowDay-1} 좀비격파`;
                tempHtml +=
                `<thead>
                    <tr class="th-row row">
                        <th class="first-tab">회차</th>
                        <th>좌측</th>
                        <th>격파수</th>
                        <th>우측</th>
                        <th>격파수</th>
                        <th>승자</th>
                    </tr>
                </thead>`;

                tempHtml+=`<tbody>`;

                breakYesterday.forEach((el)=>{
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${el.count}</th>
                        <td>${el.leftPlayer}</td>
                        <td>${el.leftBroken}</td>
                        <td>${el.rightPlayer}</td>
                        <td>${el.rightBroken}</td>
                        <td>${el.winner}</td>
                    </tr>`;
                });

                tempHtml+=`</tbody>`;
        
                mdTable.innerHTML = tempHtml;
            }

            break;
        }

        case 'zombieDrop': {
            if(!dropYesterday) {
                console.log('통신!')
                gameDataLoad(type, 'yesterday');
            } else {
                mdHl.innerText = `0${nowMon}.${nowDay-1} 좀비낙하`;

                tempHtml +=
                `<thead>
                    <tr class="th-row row">
                        <th class="first-tab">회차</th>
                        <th colspan="5">당첨번호</th>
                    </tr>
                </thead>`;

                tempHtml+=`<tbody>`;

                dropYesterday.forEach((el)=>{
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${el.count}</th>
                        <td>${el.result[0]}</td>
                        <td>${el.result[1]}</td>
                        <td>${el.result[2]}</td>
                        <td>${el.result[3]}</td>
                        <td>${el.result[4]}</td>
                    </tr>`;
                });

                tempHtml+=`</tbody>`;
        
                mdTable.innerHTML = tempHtml;
            }

            break;
        }
    
        default:
            break;
    }
}