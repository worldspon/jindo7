'use strict';

// 현재 날짜 시간 추출
let nowMon = new Date().getMonth()+1;
let nowDay = new Date().getDate();
// 접속일 자정 시간
let startTime = new Date(new Date().getFullYear(), nowMon-1, nowDay, '00', '00', '00', '00').getTime();
// 현재시간
let nowTime = Date.now();
// 현재까지 흐른 시간
let flowTime = nowTime - startTime;

// -5분- 다음게임 종료까지 흐른시간, 분, 초, 밀리초
let restTimeFive = 300000 - (flowTime%300000);
let restMFive = Math.floor(restTimeFive/60000);
let restSFive = Math.floor((restTimeFive%60000)/1000);
let restMsFive = (restTimeFive%60000)%1000+1000;

// -3분- 다음게임 종료까지 흐른시간, 분, 초, 밀리초
let restTimeThree = 180000 - (flowTime%180000);
let restMThree = Math.floor(restTimeThree/60000);
let restSThree = Math.floor((restTimeThree%60000)/1000);
let restMsThree = (restTimeThree%60000)%1000+1000;

// countdown 노드 id
let fiveCount = document.querySelectorAll('.five-countdown');
let threeCount = document.querySelectorAll('.three-countdown');

// 5분 게임 count 생성
fiveCount.forEach((el)=>{
    el.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
});

// 3분 게임 count 생성
threeCount.forEach((el)=>{
    el.innerText = `잔여시간 : 0${restMThree}:${restSThree > 9 ? restSThree : `0${restSThree}`}`;
});

// 5분게임결과 업데이트
setTimeout(()=>{
    fivemCount();
    setInterval(fivemCount,1000);
},restMsFive);

// 3분게임결과 업데이트
setTimeout(()=>{
    threemCount();
    setInterval(threemCount,1000);
},restMsThree);

// 현재 화면 사이즈 체크 -> PC Table, Mobile Table 화면 선택
let winWidth = window.innerWidth;
let viewFlag = winWidth > 1860 ? 'pc' : 'mobile';

// 현재 몇회차인지 확인
let fiveMcountTime = Math.floor(flowTime/300000);
let threeMcountTime = Math.floor(flowTime/180000);

// html 요소 노드id 저장
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

// 테이블 요소 노드 id
let raceTb = document.querySelector('.zombie-race table tbody');
let fightTb = document.querySelector('.zombie-fight table tbody');
let breakTb = document.querySelector('.zombie-break table tbody');
let dropTb = document.querySelector('.zombie-drop table tbody');
let mdTable = document.querySelector('.md-wrap table');
let mdCount = document.querySelectorAll('.countdown-md-span');

// 오늘, 어제 게임결과 통신 후 저장 할 변수
let raceToday, raceYesterday, breakToday, breakYesterday, fightToday, fightYesterday, dropToday, dropYesterday;

/**
 * @brief 5분 count 1초씩 줄어들고 5분 후 데이터 동기화
 * @author JJH
 */
function fivemCount() {
    if((restMFive > 0 && restSFive > 0) || (restMFive <= 0 && restSFive > 0)) {
        restSFive--;
        fiveCount.forEach((el)=>{
            el.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        });
    } else if(restMFive > 0 && restSFive <= 0) {
        restMFive--;
        restSFive = 59;
        fiveCount.forEach((el)=>{
            el.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        });
    } else if(restMFive <= 0 && restSFive <= 0) {
        restMFive = 4;
        restSFive = 59;
        fiveCount.forEach((el)=>{
            el.innerText = `잔여시간 : 0${restMFive}:${restSFive > 9 ? restSFive : `0${restSFive}`}`;
        });

        nowTime = Date.now();
        flowTime = nowTime - startTime;
        fiveMcountTime = Math.floor(flowTime/300000);
        gameDataLoad('zombieRace', 'today');
        gameDataLoad('zombieFight', 'today');
        gameDataLoad('zombieDrop', 'today');
    }
}

/**
 * @brief 3분 count 1초씩 줄어들고 3분 후 데이터 동기화
 * @author JJH
 */
function threemCount() {
    if((restMThree > 0 && restSThree > 0) || (restMThree <= 0 && restSThree > 0)) {
        restSThree--;
        threeCount.forEach((el)=>{
            el.innerText = `잔여시간 : 0${restMThree}:${restSThree > 9 ? restSThree : `0${restSThree}`}`;
        });
    } else if(restMThree > 0 && restSThree <= 0) {
        restMThree--;
        restSThree = 59;
        threeCount.forEach((el)=>{
            el.innerText = `잔여시간 : 0${restMThree}:${restSThree > 9 ? restSThree : `0${restSThree}`}`;
        });
    } else if(restMThree <= 0 && restSThree <= 0) {
        restMThree = 2;
        restSThree = 59;
        threeCount.forEach((el)=>{
            el.innerText = `잔여시간 : 0${restMThree}:${restSThree > 9 ? restSThree : `0${restSThree}`}`;
        });
        nowTime = Date.now();
        flowTime = nowTime - startTime;
        threeMcountTime = Math.floor(flowTime/180000);
        gameDataLoad('zombieBreak', 'today');
    }
}

// resize시 현재 창 크기에 따라 PC인지 Mobile인지 판단하여 테이블 생성
window.addEventListener('resize', () => {

    winWidth = window.innerWidth;

    if(winWidth > 1860) {
        if(viewFlag == 'mobile') {
            viewFlag = 'pc';
            createTable('zombieRace', viewFlag);
            createTable('zombieFight', viewFlag);
            createTable('zombieBreak', viewFlag);
            createTable('zombieDrop', viewFlag);
        }
    }

    if(winWidth <= 1860 ) {
        if(viewFlag == 'pc') {
            viewFlag = 'mobile';
            createTable('zombieRace', viewFlag);
            createTable('zombieFight', viewFlag);
            createTable('zombieBreak', viewFlag);
            createTable('zombieDrop', viewFlag);
        }
    }
});

// 각 테이블에 제목 추가
raceHl.innerText = `0${nowMon}.${nowDay} 좀비레이스`;
breakHl.innerText = `0${nowMon}.${nowDay} 좀비격파`;
fightHl.innerText = `0${nowMon}.${nowDay} 좀비격투`;
dropHl.innerText = `0${nowMon}.${nowDay} 좀비낙하`;

// 오늘 데이터 받아오는 함수
gameDataLoad('zombieRace', 'today');
gameDataLoad('zombieFight', 'today');
gameDataLoad('zombieBreak', 'today');
gameDataLoad('zombieDrop', 'today');

// x버튼 클릭시 modal 초기화 후 꺼짐
mdCloseBtn.addEventListener('click', ()=>{
    mdWrap.dataset.type = '';
    mdTable.innerHTML = '';
    mdWrap.style.display = 'none';
});

// 더보기 버튼 이벤트 추가
Array.from(btnToday).forEach((el) => {
    el.addEventListener('click', () => {
        mdWrap.style.display = 'block';
        mdWrap.dataset.type = el.dataset.type;
        createTable(el.dataset.type, 'modal');
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

/**
 * @brief 오늘 데이터 받아오는 함수
 * @author JJH
 * @param type 게임 타입
 * @param date 오늘, 내일 기본값 'today'
 */
async function gameDataLoad(type,date='today') {
    try {
        let data;
        switch (type) {
            case 'zombieRace': {

                data = await AsyncValidateFnc(`http://192.168.0.24:8080/game/${type}/${date}`);
                data = JSON.parse(data);

                date=='today' ? raceToday = data[type] : raceYesterday = data[type];
                
                break;
            }
    
            case 'zombieFight': {

                data = await AsyncValidateFnc(`http://192.168.0.24:8080/game/${type}/${date}`);
                data = JSON.parse(data);

                date=='today' ? fightToday = data[type] : fightYesterday = data[type];

                break;
            }
    
            case 'zombieBreak': {

                data = await AsyncValidateFnc(`http://192.168.0.24:8080/game/${type}/${date}`);
                data = JSON.parse(data);

                date=='today' ? breakToday = data[type] : breakYesterday = data[type];

                break;
            }
    
            case 'zombieDrop': {

                data = await AsyncValidateFnc(`http://192.168.0.24:8080/game/${type}/${date}`);
                data = JSON.parse(data);

                date=='today' ? dropToday = data[type] : dropYesterday = data[type];

                break;
            }
    
            default:
                break;
        }

        if(date == 'today') {
            if(mdWrap.dataset.type == type) {
                createTable(type, 'modal');
            }                
            createTable(type, viewFlag);
        } else {
            createPrevTable(type);
        }

    } catch (error) {
        console.log(error);
    }
}


/**
 * @brief 화면에 해당하는 테이블을 그리는 함수
 * @author JJH
 * @param type 게임 타입
 * @param flag pc, mobile, modal 판단
 */
function createTable(type, flag) {

    if(flag == 'modal'){
        mdCount[0].style.display = 'block';
        mdCount[1].style.display = 'none';
    }

    let tempHtml = '';
    switch (type) {
        case 'zombieRace': {

            if(flag == 'modal') {
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
            }

            if(raceToday.length <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${raceToday.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;

                let count = 0;

                for(let props of raceToday) {
                    count++;
    
                    if(count>4 && flag == 'mobile') {
                        break;
                    }
    
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${props.count}</th>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win1}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win2}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win3}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win4}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win5}</td>
                    </tr>`;
                }
            } else {
                let count = 0;

                for(let props of raceToday) {
                    count++;
    
                    if(count>5 && flag == 'mobile') {
                        break;
                    }
    
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${props.count}</th>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win1}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win2}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win3}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win4}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.win5}</td>
                    </tr>`;
                }
            }

            if(flag == 'modal') {
                mdHl.innerHTML = `0${nowMon}.${nowDay} 좀비레이스`;
                mdTable.innerHTML = tempHtml;
            } else {
                raceTb.innerHTML = tempHtml;
            }
            tempHtml = '';

            break;
        }

        case 'zombieFight': {

            if(flag == 'modal') {
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
            }

            if(fightToday.length <= fiveMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${fightToday.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;

                let count = 0;

                for(let props of fightToday) {
                    count++;
    
                    if(count>4 && flag == 'mobile') {
                        break;
                    }
    
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${props.count}</th>
                        <td>${props.leftPlayer}</td>
                        <td>${props.rightPlayer}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.winner}</td>
                        <td>${props.count > fiveMcountTime || props.winner == '준비중' ? '준비중' : props.KO ? 'KO승' : '판정승'}</td>
                    </tr>`;
                }
            } else {
                let count = 0;

                for(let props of fightToday) {
                    count++;
    
                    if(count>5 && flag == 'mobile') {
                        break;
                    }
    
                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${props.count}</th>
                        <td>${props.leftPlayer}</td>
                        <td>${props.rightPlayer}</td>
                        <td>${props.count > fiveMcountTime ? '준비중' : props.winner}</td>
                        <td>${props.count > fiveMcountTime || props.winner == '준비중' ? '준비중' : props.KO ? 'KO승' : '판정승'}</td>
                    </tr>`;
                }
            }

            if(flag == 'modal') {
                mdHl.innerHTML = `0${nowMon}.${nowDay} 좀비격투`;
                mdTable.innerHTML = tempHtml;
            } else {
                fightTb.innerHTML = tempHtml;
            }
        
        
            tempHtml = '';
            
            break;
        }

        case 'zombieBreak': {

            
            if(flag == 'modal') {
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
            }

            if(breakToday.length <= threeMcountTime) {
                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${breakToday.length+1}</th>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                    <td>준비중</td>
                </tr>`;

                                
                let count = 0;

                for(let props of breakToday) {
                    count++;

                    if(count>4 && flag == 'mobile') {
                        break;
                    }

                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${props.count}</th>
                        <td>${props.leftPlayer}</td>
                        <td>${props.count > threeMcountTime ? '준비중' : props.leftBroken}</td>
                        <td>${props.rightPlayer}</td>
                        <td>${props.count > threeMcountTime ? '준비중' : props.rightBroken}</td>
                        <td>${props.count > threeMcountTime ? '준비중' : props.winner}</td>
                    </tr>`;
                }
            } else {
                            
                let count = 0;

                for(let props of breakToday) {
                    count++;

                    if(count>5 && flag == 'mobile') {
                        break;
                    }

                    tempHtml +=
                    `<tr class="tb-row row">
                        <th class="first-tab">${props.count}</th>
                        <td>${props.leftPlayer}</td>
                        <td>${props.count > threeMcountTime ? '준비중' : props.leftBroken}</td>
                        <td>${props.rightPlayer}</td>
                        <td>${props.count > threeMcountTime ? '준비중' : props.rightBroken}</td>
                        <td>${props.count > threeMcountTime ? '준비중' : props.winner}</td>
                    </tr>`;
                }
            }

        
            if(flag == 'modal') {
                
                mdCount[1].style.display = 'block';
                mdCount[0].style.display = 'none';
                mdHl.innerHTML = `0${nowMon}.${nowDay} 좀비격파`;
                mdTable.innerHTML = tempHtml;
            } else {
                breakTb.innerHTML = tempHtml;
            }
        
            tempHtml = '';
            
            break;
        }

        case 'zombieDrop': {

                        
            if(flag == 'modal') {
                tempHtml +=
                `<thead>
                    <tr class="th-row row">
                        <th class="first-tab">회차</th>
                        <th colspan="5">당첨번호</th>
                    </tr>
                </thead>`;
            }

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

            let count = 0;

            for(let props of dropToday) {
                count++;

                if(count>4 && flag == 'mobile') {
                    break;
                }

                tempHtml +=
                `<tr class="tb-row row">
                    <th class="first-tab">${props.count}</th>
                    <td>${props.count > fiveMcountTime ? '준비중' : props.result[0]}</td>
                    <td>${props.count > fiveMcountTime ? '준비중' : props.result[1]}</td>
                    <td>${props.count > fiveMcountTime ? '준비중' : props.result[2]}</td>
                    <td>${props.count > fiveMcountTime ? '준비중' : props.result[3]}</td>
                    <td>${props.count > fiveMcountTime ? '준비중' : props.result[4]}</td>
                </tr>`;
            }

            if(flag == 'modal') {
                mdHl.innerHTML = `0${nowMon}.${nowDay} 좀비낙하`;
                mdTable.innerHTML = tempHtml;
            } else {
                dropTb.innerHTML = tempHtml;
            }
            tempHtml = '';
            
            break;
        }

        default:
            break;
    }
}



/**
 * @brief 어제 결과를 통신하여 받오옥 그리는 함수
 * @author JJH
 * @param type 게임 타입
 */
function createPrevTable(type) {

    let tempHtml = ``;

    // 모달 내에 모든 카운트를 숨김
    mdCount.forEach((el)=>{
        el.style.display = 'none';
    });

    switch (type) {

        case 'zombieRace': {
            if(!raceYesterday) {
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