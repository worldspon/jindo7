'use strict;'

let winWidth = window.innerWidth;
let pcFlag = false;
let nowMon = new Date().getMonth()+1;
let nowDay = new Date().getDate();
const raceHl = document.querySelector('.zombie-race .content-hl');
const breakHl = document.querySelector('.zombie-break .content-hl');
const fightHl = document.querySelector('.zombie-fight .content-hl');
const dropHl = document.querySelector('.zombie-drop .content-hl');
const mdHl = document.querySelector('.md-tb .content-hl');
const btnToday = document.getElementsByClassName('btn-today');
const btnPrev = document.getElementsByClassName('btn-prev');
const mdWrap = document.querySelector('.md-wrap');
const mdCloseBtn = document.querySelector('.md-close-btn');
const resultUrl = 'js/result.json';
const prevUrl = 'js/prev.json';
let data, prevData;
let raceTb = document.querySelector('.zombie-race table tbody');
let fightTb = document.querySelector('.zombie-fight table tbody');
let breakTb = document.querySelector('.zombie-break table tbody');
let dropTb = document.querySelector('.zombie-drop table tbody');
let mdTable = document.querySelector('.md-wrap table');


if(winWidth > 1860) {
    pcFlag = true;
}else if(winWidth < 1860) {
    pcFlag = false;
}


window.addEventListener('resize', () => {

    winWidth = window.innerWidth;

    if(winWidth > 1860) {
        if(!pcFlag) {
            pcFlag = true;
            createPcTable(data);
        }
    }

    if(winWidth < 1860 ) {
        if(pcFlag) {
            pcFlag = false;
            createMobileTable(data);
        }
    }

});


raceHl.innerText = `0${nowMon}.${nowDay} 좀비레이스`;
breakHl.innerText = `0${nowMon}.${nowDay} 좀비격파`;
fightHl.innerText = `0${nowMon}.${nowDay} 좀비격투`;
dropHl.innerText = `0${nowMon}.${nowDay} 좀비낙하`;

gameDataLoad(resultUrl);
prevDataLoad(prevUrl);




mdCloseBtn.addEventListener('click', ()=>{
    mdWrap.style.display = 'none';
});

Array.from(btnToday).forEach((el) => {
    el.addEventListener('click', () => {
        mdWrap.style.display = 'block';
        createModalTable(el.dataset.type);
    })
});

Array.from(btnPrev).forEach((el) => {
    el.addEventListener('click', () => {
        mdWrap.style.display = 'block';
        createPrevTable(el.dataset.type);
    })
});

function createModalTable(type) {

    let tempHtml = ``;
    if(type == 'race') {
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

        data.race.forEach((el,index)=>{
            tempHtml +=
            `<tr class="tb-row row">
                <th class="first-tab">${index+1}</th>
                <td>${el[1]}</td>
                <td>${el[2]}</td>
                <td>${el[3]}</td>
                <td>${el[4]}</td>
                <td>${el[5]}</td>
            </tr>`
        });

        mdTable.innerHTML = tempHtml;
    }

    if(type == 'fight') {
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

        data.fight.forEach((el,index)=>{
            tempHtml +=
            `<tr class="tb-row row">
                <th class="first-tab">${index+1}</th>
                <td>${el.left}</td>
                <td>${el.right}</td>
                <td>${el.winner}</td>
                <td>${el.ko ? 'KO승' : '판정승'}</td>
            </tr>`
        });

        mdTable.innerHTML = tempHtml;
    }

    if(type == 'break') {
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

        data.break.forEach((el,index)=>{
            tempHtml +=
            `<tr class="tb-row row">
                <th class="first-tab">${index+1}</th>
                <td>${el.left[0]}</td>
                <td>${el.left[1]}</td>
                <td>${el.right[0]}</td>
                <td>${el.right[1]}</td>
                <td>${el.winner}</td>
            </tr>`
        });

        mdTable.innerHTML = tempHtml;
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

function createPrevTable(type) {

    let tempHtml = ``;
    if(type == 'race') {
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

        prevData.race.forEach((el,index)=>{
            tempHtml +=
            `<tr class="tb-row row">
                <th class="first-tab">${index+1}</th>
                <td>${el[1]}</td>
                <td>${el[2]}</td>
                <td>${el[3]}</td>
                <td>${el[4]}</td>
                <td>${el[5]}</td>
            </tr>`
        });

        mdTable.innerHTML = tempHtml;
    }

    if(type == 'fight') {
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

        prevData.fight.forEach((el,index)=>{
            tempHtml +=
            `<tr class="tb-row row">
                <th class="first-tab">${index+1}</th>
                <td>${el.left}</td>
                <td>${el.right}</td>
                <td>${el.winner}</td>
                <td>${el.ko ? 'KO승' : '판정승'}</td>
            </tr>`
        });

        mdTable.innerHTML = tempHtml;
    }

    if(type == 'break') {
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

        prevData.break.forEach((el,index)=>{
            tempHtml +=
            `<tr class="tb-row row">
                <th class="first-tab">${index+1}</th>
                <td>${el.left[0]}</td>
                <td>${el.left[1]}</td>
                <td>${el.right[0]}</td>
                <td>${el.right[1]}</td>
                <td>${el.winner}</td>
            </tr>`
        });

        mdTable.innerHTML = tempHtml;
    }

    if(type == 'drop') {
        mdHl.innerText = `0${nowMon}.${nowDay-1} 좀비낙하`;
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

        prevData.drop.forEach((el,index)=>{
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



async function gameDataLoad(url) {
    try {
        data = await AsyncValidateFnc(resultUrl);
        data = JSON.parse(data);
        pcFlag ? createPcTable(data) : createMobileTable(data);
    } catch (error) {
        console.log(error);
    }
}

async function prevDataLoad(url) {
    try {
        prevData = await AsyncValidateFnc(prevUrl);
        prevData = JSON.parse(prevData);
    } catch (error) {
        console.log(error);
    }
}





function createPcTable(data) {
    let myData = data;
    let tempHtml = '';

    myData.race.forEach((el,index)=>{
        tempHtml +=
        `<tr class="tb-row row">
            <th class="first-tab">${index+1}</th>
            <td>${el[1]}</td>
            <td>${el[2]}</td>
            <td>${el[3]}</td>
            <td>${el[4]}</td>
            <td>${el[5]}</td>
        </tr>`
    });

    raceTb.innerHTML = tempHtml;

    tempHtml = '';

    myData.fight.forEach((el,index)=>{
        tempHtml +=
        `<tr class="tb-row row">
            <th class="first-tab">${index+1}</th>
            <td>${el.left}</td>
            <td>${el.right}</td>
            <td>${el.winner}</td>
            <td>${el.ko ? 'KO승' : '판정승'}</td>
        </tr>`
    });

    fightTb.innerHTML = tempHtml;

    tempHtml = '';

    myData.break.forEach((el,index)=>{
        tempHtml +=
        `<tr class="tb-row row">
            <th class="first-tab">${index+1}</th>
            <td>${el.left[0]}</td>
            <td>${el.left[1]}</td>
            <td>${el.right[0]}</td>
            <td>${el.right[1]}</td>
            <td>${el.winner}</td>
        </tr>`
    });

    breakTb.innerHTML = tempHtml;

    tempHtml = '';

    myData.drop.forEach((el,index)=>{
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

    dropTb.innerHTML = tempHtml;
}




function createMobileTable(data) {
    let myData = data;
    let tempHtml = '';


    for(let i=0; i<5; i++) {
        tempHtml +=
        `<tr class="tb-row row">
            <th class="first-tab">${i+1}</th>
            <td>${myData.race[i][1]}</td>
            <td>${myData.race[i][2]}</td>
            <td>${myData.race[i][3]}</td>
            <td>${myData.race[i][4]}</td>
            <td>${myData.race[i][5]}</td>
        </tr>`;
    }

    raceTb.innerHTML = tempHtml;

    tempHtml = '';


    for(let i=0; i<5; i++) {
        tempHtml +=
        `<tr class="tb-row row">
            <th class="first-tab">${i+1}</th>
            <td>${myData.fight[i].left}</td>
            <td>${myData.fight[i].right}</td>
            <td>${myData.fight[i].winner}</td>
            <td>${myData.fight[i].ko ? 'KO승' : '판정승'}</td>
        </tr>`;
    }

    fightTb.innerHTML = tempHtml;

    tempHtml = '';


    for(let i=0; i<5; i++) {
        tempHtml +=
        `<tr class="tb-row row">
            <th class="first-tab">${i+1}</th>
            <td>${myData.break[i].left[0]}</td>
            <td>${myData.break[i].left[1]}</td>
            <td>${myData.break[i].right[0]}</td>
            <td>${myData.break[i].right[1]}</td>
            <td>${myData.break[i].winner}</td>
        </tr>`;
    }

    breakTb.innerHTML = tempHtml;

    tempHtml = '';


    for(let i=0; i<5; i++) {
        let dummyAry = myData.drop[i].sort((a,b)=> a-b);
        tempHtml +=
        `<tr class="tb-row row">
            <th class="first-tab">${i+1}</th>
            <td>${dummyAry[0]}</td>
            <td>${dummyAry[1]}</td>
            <td>${dummyAry[2]}</td>
            <td>${dummyAry[3]}</td>
            <td>${dummyAry[4]}</td>
        </tr>`;
    }

    dropTb.innerHTML = tempHtml;
}