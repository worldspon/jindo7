'use strict';

let p = {resolveCount : 0, rejectCount : 0};

let promiseResult = new Proxy(p, {

    set(promiseProxy, result, count) {

        promiseProxy[result] = count;

        let promiseEndCount = 0;

        // 현재까지 종료된 프로미스 합산
        for(let resultCount in promiseProxy) {
            promiseEndCount += promiseProxy[resultCount];
        }

        // 4개 통신이 모두 끝나고 reject가 하나라도 있을시
        if(promiseEndCount >= 4 && promiseProxy.rejectCount >= 1) {
            setTimeout(()=>{
                alert('통신이 원활하지않습니다.');
            },1000);
        }

        return true;
    }
});


// 광고수익현황 + 광고수익금차트 비동기통신
profitFieldAsyncValidation('http://192.168.0.24:8080/main/adprofit');
noticeFieldAsyncValidation('http://192.168.0.24:8080/main/notice');
faqFieldAsyncValidation('http://192.168.0.24:8080/main/faq');
gameFieldAsyncValidation('http://192.168.0.24:8080/main/game');

/**
 * 비동기 객체생성 함수
 */
function AsyncFunction(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
};

/////////////////////////////////////////////////////////////////////////////////////////

function profitFieldAsyncValidation(url) {

    let data = AsyncFunction(url);
    data.then((data)=>{
        renderProfitData(data);
        renderProfitChart(data);
        promiseResult.resolveCount++;
    }, (err)=>{
        promiseResult.rejectCount++;
    })

}

/////////////////////////////////////////////////////////////////////////////////////////

function renderProfitData(data){

    const prevMonthTitle = document.querySelector('.prev-month > .profit-left');
    const prevMonthValue = document.querySelector('.prev-month > .profit-right');
    const currentMonthTitle = document.querySelector('.current-month > .profit-left');
    const currentMonthValue = document.querySelector('.current-month > .profit-right');
    const changePercentageValue = document.querySelector('.change-percentage > .profit-right');

    let profitData = JSON.parse(data);
    let currentMonth = new Date().getMonth()+1;
    let prevMonth = (currentMonth == 1) ? 12 : currentMonth-1;

    currentMonthTitle.innerText = `${currentMonth}월 총 광고수익금`;
    currentMonthValue.innerText = changeCurrencyFormat(profitData.totalClosing);
    prevMonthTitle.innerText = `${prevMonth}월 총 광고수익금`;
    prevMonthValue.innerText = changeCurrencyFormat(profitData.totalForecast);

    let monthComparePercentage = compareMonthProfitToPercentage(profitData.totalForecast, profitData.totalClosing);
    changePercentageValue.innerText = Number.isInteger(monthComparePercentage) ? `${monthComparePercentage}%` : `${monthComparePercentage.toFixed(2)}%`;
    changePercentageValue.style.color = monthComparePercentage >= 0 ? 'green' : 'red';

}

function changeCurrencyFormat(profit) {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(parseFloat(profit));
}

function compareMonthProfitToPercentage(prevMonthProfit, currentMonthProfit) {
    return ((parseFloat(currentMonthProfit) - parseFloat(prevMonthProfit)) / parseFloat(currentMonthProfit)) * 100;
}

/////////////////////////////////////////////////////////////////////////////////////////

function renderProfitChart(data){

    let nearSevenDaysProfitData = JSON.parse(data).forecast;
    let profitChartObject = createMainChart(...convertDataToArrayType(nearSevenDaysProfitData));

    // 차트가 그려진 후의 canvas object에 이벤트 등록
    let afterChartRenderObject = document.getElementById("index-profit-chart");
    registerCanvasResizeEvent(profitChartObject, afterChartRenderObject);

}

function convertDataToArrayType(profitObject) {

    let dateArray = [];
    let valueArray = [];

    dateArray.push('');
    valueArray.push(null);

    for(let profitElement in profitObject) {
        dateArray.push(`${profitElement}일`);
        valueArray.push(profitObject[profitElement]);
    }

    dateArray.push('');
    valueArray.push(null);

    return [dateArray, valueArray];

}

function createMainChart(dateArray, valueArray) {

    let ctx = returnCanvasTagId();
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateArray,
            datasets: [{
                label: false,
                data: valueArray,
                fill: false,
                borderColor: '#6f569c',
                borderWidth: 5,
                pointBorderWidth: 2,
                pointBackgroundColor: 'white',
                pointRadius: 5,
                tension: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    offsetGridLines:false,
                    ticks: {
                    }
                }]
            }
        }
    });

}

function returnCanvasTagId() {

    const profitChartBox = document.querySelector('.profit-chart-content');
    let canvasHeight = setCanvasHeight();

    // canvas tag 생성
    profitChartBox.innerHTML = `<canvas id='index-profit-chart' style='height:${canvasHeight}px;'></canvas>`;
    return document.getElementById("index-profit-chart").getContext("2d");

}

function setCanvasHeight() {

    if(window.innerWidth <= 500 ){
        return 200;
    }else if(window.innerWidth <= 960 ){
        return 300;
    }else {
        return 500;
    }

}

function registerCanvasResizeEvent(profitChartObject, afterChartRenderObject) {

    window.addEventListener('resize', () => {
        let canvasHeight = '';
        window.innerWidth > 960 ? canvasHeight = '500px' : window.innerWidth <= 500 ? canvasHeight = '200px' : canvasHeight = '300px';
        afterChartRenderObject.style.height = canvasHeight;
        profitChartObject.update();

    });

}

/////////////////////////////////////////////////////////////////////////////////////////

function noticeFieldAsyncValidation(url) {
    let data = AsyncFunction(url);
    data.then((data)=>{
        renderNoticeTable(data);
        promiseResult.resolveCount++;
    }, (err)=>{
        promiseResult.rejectCount++;
    })
}

function renderNoticeTable(data) {
    const noticeBoxContent = document.querySelector('.notice-box-content');
    let noticeContentData = JSON.parse(data).noticeList;
    noticeBoxContent.innerHTML='';
    noticeContentData.forEach(noticeContentDataElement => {
        noticeBoxContent.innerHTML+=
        `<div class='board-content'>
            <span class='board-content-header'>${noticeContentDataElement.title}</span>
            <span class='board-content-date'>${noticeContentDataElement.writeDate}</span>
        </div>`;
    });
}

/////////////////////////////////////////////////////////////////////////////////////////

function faqFieldAsyncValidation(url) {
    let data = AsyncFunction(url);
    data.then((data)=>{
        renderFaqTable(data);
        promiseResult.resolveCount++;
    }, (err)=>{
        promiseResult.rejectCount++;
    })
}

function renderFaqTable(data) {
    const faqBoxContent = document.querySelector('.faq-box-content');
    let faqContentData = JSON.parse(data).faqList;
    faqBoxContent.innerHTML='';
    faqContentData.forEach(faqContentDataElement => {
        faqBoxContent.innerHTML+=
        `<div class='board-content'>
            <span class='board-content-header'>${faqContentDataElement.question}</span>
        </div>`;
    });
}

/////////////////////////////////////////////////////////////////////////////////////////

function gameFieldAsyncValidation(url) {
    let data = AsyncFunction(url);
    data.then((data)=>{
        renderRaceTable(data);
        renderFightTable(data);
        renderBreakTable(data);
        renderDropTable(data);
        promiseResult.resolveCount++;
    }, (err)=>{
        promiseResult.rejectCount++;
    })
}

function renderRaceTable(data) {

    const raceTable = document.querySelector('.zombie-race');
    let raceData = JSON.parse(data).race;
    let nowMonth = new Date().getMonth()+1 > 9 ? new Date().getMonth()+1 : '0'+(new Date().getMonth()+1);
    let nowDay = new Date().getDate() > 9 ? new Date().getDate() : '0'+new Date().getDate();
    let dummyText = ''
    raceTable.innerHTML = '';
    dummyText += 
    `<div class='game-table-header'>
        <h3>${nowMonth}.${nowDay} 좀비레이스 결과</h3>
    </div>
    <table class='game-table-content'>
    <tr class='game-table-row'>
        <th class='col'>회차</th>
        <th>1등</th>
        <th>2등</th>
        <th>3등</th>
        <th>4등</th>
        <th>5등</th>
    </tr>`;

    raceData.forEach((raceDataElement)=> {
        dummyText +=
        `<tr class='game-table-row'>
            <th class='col'>${raceDataElement.count}</th>\
            <td>${raceDataElement.win1}</td>
            <td>${raceDataElement.win2}</td>
            <td>${raceDataElement.win3}</td>
            <td>${raceDataElement.win4}</td>
            <td>${raceDataElement.win5}</td>
        </tr>`;
    });

    dummyText += `</table>`;
    raceTable.innerHTML = dummyText;

}

function renderFightTable(data) {
    
    const fightTable = document.querySelector('.zombie-fight');
    let fightData = JSON.parse(data).fight;
    let nowMonth = new Date().getMonth()+1 > 9 ? new Date().getMonth()+1 : '0'+(new Date().getMonth()+1);
    let nowDay = new Date().getDate() > 9 ? new Date().getDate() : '0'+new Date().getDate();
    let dummyText = ''
    fightTable.innerHTML = '';
    dummyText += 
    `<div class='game-table-header'>
        <h3>${nowMonth}.${nowDay} 좀비격투 결과</h3>
    </div>
    <table class='game-table-content'>
    <tr class='game-table-row'>
        <th class='col'>회차</th>
        <th>좌측</th>
        <th>우측</th>
        <th>승자</th>
        <th>KO여부</th>
    </tr>`;

    fightData.forEach((fightDataElement)=> {
        dummyText +=
        `<tr class='game-table-row'>
            <th class='col'>${fightDataElement.count}</th>
            <td>${fightDataElement.leftPlayer}</td>
            <td>${fightDataElement.rightPlayer}</td>
            <td>${fightDataElement.winner}</td>
            <td>${fightDataElement.winner == '준비중' ? '준비중' : fightDataElement.KO ? 'KO' : '판정승'}</td>
        </tr>`;
    });

    dummyText += `</table>`;
    fightTable.innerHTML = dummyText;
}

function renderBreakTable(data) {
    
    const breakTable = document.querySelector('.zombie-break');
    let breakData = JSON.parse(data).break;
    let nowMonth = new Date().getMonth()+1 > 9 ? new Date().getMonth()+1 : '0'+(new Date().getMonth()+1);
    let nowDay = new Date().getDate() > 9 ? new Date().getDate() : '0'+new Date().getDate();
    let dummyText = ''
    breakTable.innerHTML = '';
    dummyText += 
    `<div class='game-table-header'>
        <h3>${nowMonth}.${nowDay} 좀비격파 결과</h3>
    </div>
    <table class='game-table-content'>
    <tr class='game-table-row'>
        <th class='col'>회차</th>
        <th>좌측</th>
        <th>격파수</th>
        <th>우측</th>
        <th>격파수</th>
        <th>승자</th>
    </tr>`;

    breakData.forEach((breakDataElement)=> {
        dummyText +=
        `<tr class='game-table-row'>
            <th class='col'>${breakDataElement.count}</th>
            <td>${breakDataElement.leftPlayer}</td>
            <td>${breakDataElement.leftBroken}</td>
            <td>${breakDataElement.rightPlayer}</td>
            <td>${breakDataElement.rightBroken}</td>
            <td>${breakDataElement.winner}</td>
        </tr>`;
    });

    dummyText += `</table>`;
    breakTable.innerHTML = dummyText;
}

function renderDropTable(data) {
    
    const dropTable = document.querySelector('.zombie-drop');
    let dropData = JSON.parse(data).drop;
    let nowMonth = new Date().getMonth()+1 > 9 ? new Date().getMonth()+1 : '0'+(new Date().getMonth()+1);
    let nowDay = new Date().getDate() > 9 ? new Date().getDate() : '0'+new Date().getDate();
    let dummyText = ''
    dropTable.innerHTML = '';
    dummyText += 
    `<div class='game-table-header'>
        <h3>${nowMonth}.${nowDay} 좀비낙하 결과</h3>
    </div>
    <table class='game-table-content'>
    <tr class='game-table-row'>
        <th class='col'>회차</th>
        <th>1번좀비</th>
        <th>2번좀비</th>
        <th>3번좀비</th>
        <th>4번좀비</th>
        <th>5번좀비</th>
    </tr>`;

    dropData.forEach((dropDataElement)=> {
        dummyText +=
        `<tr class='game-table-row'>
            <th class='col'>${dropDataElement.count}</th>
            <td>${dropDataElement.result[0]}</td>
            <td>${dropDataElement.result[1]}</td>
            <td>${dropDataElement.result[2]}</td>
            <td>${dropDataElement.result[3]}</td>
            <td>${dropDataElement.result[4]}</td>
        </tr>`;
    });

    dummyText += `</table>`;
    dropTable.innerHTML = dummyText;
}