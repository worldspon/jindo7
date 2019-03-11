'use strict;'

const prevMonthLeft = document.querySelector('.prev-month > .profit-left');
const prevMonthRight = document.querySelector('.prev-month > .profit-right');
const currentMonthLeft = document.querySelector('.current-month > .profit-left');
const currentMonthRight = document.querySelector('.current-month > .profit-right');
const changePercentageRight = document.querySelector('.change-percentage > .profit-right');
const mainChartParent = document.querySelector('.profit-chart-content');
const noticeBoxContent = document.querySelector('.notice-box-content');
const faqBoxContent = document.querySelector('.faq-box-content');
let mainChart='';



// 수익금 비동기 통신
profitAsync('js/index.json');
// 차트 비동기 통신
chartAsync('js/index.json');
noticeAsync('js/index.json');
faqAsync('js/index.json');




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
};


/**
 * @brief 수익금 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */
async function profitAsync(url) {
    try {
        let data = await AsyncValidateFnc(url);
        setProfitData(data);
    } catch (error) {
        console.log(error);
    }
};


/**
 * @brief 차트 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */
async function chartAsync(url) {
    try {
        let data = await AsyncValidateFnc(url);
        setChartData(data);
    } catch (error) {
        console.log(error);
    }
};

async function noticeAsync(url) {
    try {
        let data = await AsyncValidateFnc(url);
        setNoticeData(data);
    } catch (error) {
        console.log(error);
    }
};


async function faqAsync(url) {
    try {
        let data = await AsyncValidateFnc(url);
        setFaqData(data);
    } catch (error) {
        console.log(error);
    }
};


function setFaqData(data){
    let myData = JSON.parse(data);
    let tempHtml='';

    myData.faq.forEach(el => {
        console.log(el);
        tempHtml+=
        `<div class='board-content'>
            <span class='board-content-header'>${el.title}</span>
            <span class='board-content-date'>${el.date}</span>
        </div>`;
    });

    faqBoxContent.innerHTML = tempHtml;
    console.log(tempHtml);
    console.log(myData.notice[0].title);
}

function setNoticeData(data){
    let myData = JSON.parse(data);
    let tempHtml='';

    myData.notice.forEach(el => {
        console.log(el);
        tempHtml+=
        `<div class='board-content'>
            <span class='board-content-header'>${el.title}</span>
            <span class='board-content-date'>${el.date}</span>
        </div>`;
    });

    noticeBoxContent.innerHTML = tempHtml;
    console.log(tempHtml);
    console.log(myData.notice[0].title);
};


/**
 * @brief 월별 수익금, 증감률 계산후 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */
function setProfitData(data){
    // 화폐 표기 format 저장
    let currencyFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    let myData = JSON.parse(data);
    // 데이터 조회를 위해 월 데이터를 YYYYMM 형식으로 저장
    let nowMonth = `${new Date().getFullYear()}0${new Date().getMonth()+1}`;
    let prevMonth, nowMonthValue, prevMonthValue, chPercentage;


    // 현재월이 1월인 경우 대응
    if((new Date().getMonth())==0) {
        prevMonth =`${new Date().getFullYear()}0${new Date().getMonth()+11}`;
        currentMonthLeft.innerText = `${new Date().getMonth()+1}월 총 광고수익금`;
        prevMonthLeft.innerText = `${new Date().getMonth()+11}월 총 광고수익금`;
    } else {
        prevMonth =`${new Date().getFullYear()}0${new Date().getMonth()}`;
        currentMonthLeft.innerText = `${new Date().getMonth()+1}월 총 광고수익금`;
        prevMonthLeft.innerText = `${new Date().getMonth()}월 총 광고수익금`;
    }

    // 키, 값 조회 후 존재하면 입력 - 전월
    Array.from(myData.totalProfit).forEach((el) => {
        if(el[prevMonth]!=undefined) {
            prevMonthValue = el[prevMonth];
            prevMonthRight.innerText = `${currencyFormat.format(el[prevMonth])}`;
        }
    });
    // 키, 값 조회 후 존재하면 입력 - 당월
    Array.from(myData.totalProfit).forEach((el) => {
        if(el[nowMonth]!=undefined) {
            nowMonthValue = el[nowMonth];
            currentMonthRight.innerText = `${currencyFormat.format(el[nowMonth])}`;
        }
    });

    
    // 증감률 계산
    chPercentage =((nowMonthValue-prevMonthValue)/nowMonthValue)*100;

    if(!(Number.isInteger(chPercentage))) {
        changePercentageRight.innerText = `${chPercentage.toFixed(2)}%`;
    } else {
        changePercentageRight.innerText = `${chPercentage}%`;
    }
    if(chPercentage != 0) {
        changePercentageRight.style.color = chPercentage > 0 ? 'green' : 'red';
    }
};


/**
 * @brief 차트 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */
function setChartData(data){
    let myData = JSON.parse(data);
    let nowDate = new Date().getDate();
    // 날짜 데이터 저장 배열
    let dateAry =[];
    // 값 데이터 저장 배열
    let valueAry=[];

    // 여백을 위한 공백 데이터 추가
    dateAry.push('');
    valueAry.push(null);
    
    // 최근 일주일 데이터 입력
    for (var i = (nowDate-6); i <= nowDate; i++) {
        dateAry.push(`${i}일`);
        Array.from(myData.dailyProfit).forEach((el)=> {
        if(el[i] != undefined){
            valueAry.push(el[i]);
        }
        });
    }

    // 여백을 위한 공백 데이터 추가
    dateAry.push('');
    valueAry.push(null);

    // 날짜, 값 데이터로 차트 생성
    createMainChart(dateAry, valueAry);


    // 생성 후 차트 객체
    let chartAfterRender = document.getElementById("index-profit-chart");

    // window resize시 canvas size 변경
    window.addEventListener('resize', () => {
        if(window.innerWidth <= 500 ){
            chartAfterRender.style.height = '200px';
            mainChart.update();
        }else if(window.innerWidth <= 960 ){
            chartAfterRender.style.height = '300px';
            mainChart.update();
        }else {
            chartAfterRender.style.height = '500px';
            mainChart.update();
        }
    });
};


/**
 * @brief 차트 생성
 * @author JJH
 * @param dataAry 차트에 표시할 날짜 데이터
 * @param valueAry 차트에 표시할 값 데이터
 */
function createMainChart(dateAry, valueAry) {
    let canvasHeight = 0;

    //창크기에 따라 height 값 지정
    if(window.innerWidth <= 500 ){
        canvasHeight = 200
    }else if(window.innerWidth <= 960 ){
        canvasHeight = 300
    }else {
        canvasHeight = 500
    }


    mainChartParent.innerHTML = `<canvas id='index-profit-chart' style='height:${canvasHeight}px;'></canvas>`;

    let ctx = document.getElementById("index-profit-chart");
    ctx = document.getElementById("index-profit-chart").getContext("2d");
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            // dateAry!!!
            labels: dateAry,
            datasets: [{
                label: false,
                // valueAry!!!
                data: valueAry,
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
};



















// 상단 수익금 표기 로직
/*profitPromise.then((data)=>{
    // 화폐 표기 format 저장
    let currencyFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    let myData = JSON.parse(data);
    // 데이터 조회를 위해 월 데이터를 YYYYMM 형식으로 저장
    let nowMonth = `${new Date().getFullYear()}0${new Date().getMonth()+1}`;
    let prevMonth, nowMonthValue, prevMonthValue, chPercentage;


    // 현재월이 1월인 경우 대응
    if((new Date().getMonth())==0) {
        prevMonth =`${new Date().getFullYear()}0${new Date().getMonth()+11}`;
        currentMonthLeft.innerText = `${new Date().getMonth()+1}월 총 광고수익금`;
        prevMonthLeft.innerText = `${new Date().getMonth()+11}월 총 광고수익금`;
    } else {
        prevMonth =`${new Date().getFullYear()}0${new Date().getMonth()}`;
        currentMonthLeft.innerText = `${new Date().getMonth()+1}월 총 광고수익금`;
        prevMonthLeft.innerText = `${new Date().getMonth()}월 총 광고수익금`;
    }

    // 키, 값 조회 후 존재하면 입력 - 전월
    Array.from(myData.totalProfit).forEach((el) => {
        if(el[prevMonth]!=undefined) {
            prevMonthValue = el[prevMonth];
            prevMonthRight.innerText = `${currencyFormat.format(el[prevMonth])}`;
        }
    });
    // 키, 값 조회 후 존재하면 입력 - 당월
    Array.from(myData.totalProfit).forEach((el) => {
        if(el[nowMonth]!=undefined) {
            nowMonthValue = el[nowMonth];
            currentMonthRight.innerText = `${currencyFormat.format(el[nowMonth])}`;
        }
    });

    
    // 증감률 계산
    chPercentage =((nowMonthValue-prevMonthValue)/nowMonthValue)*100;

    if(!(Number.isInteger(chPercentage))) {
        changePercentageRight.innerText = `${chPercentage.toFixed(2)}%`;
    } else {
        changePercentageRight.innerText = `${chPercentage}%`;
    }
    if(chPercentage != 0) {
        changePercentageRight.style.color = chPercentage > 0 ? 'green' : 'red';
    }
});*/

/*
chartPromise.then((data)=>{
    let myData = JSON.parse(data);
    let nowDate = new Date().getDate();
    let dateAry =[]
    let valueAry=[];

    dateAry.push('');
    valueAry.push(null);
    for (var i = (nowDate-6); i <= nowDate; i++) {
      dateAry.push(`${i}일`);
      Array.from(myData.dailyProfit).forEach((el)=> {
        if(el[i] != undefined){
          valueAry.push(el[i]);
        }
      });
    }
    dateAry.push('');
    valueAry.push(null);

    for (el of dateAry) {
      myData.dailyProfit
    }

    createMainChart(dateAry, valueAry);


    let chartAfterRender = document.getElementById("index-profit-chart");

    // window resize시 canvas size 변경
    window.addEventListener('resize', () => {
        if(window.innerWidth <= 500 ){
            chartAfterRender.style.height = '200px';
            mainChart.update();
        }else if(window.innerWidth <= 960 ){
            chartAfterRender.style.height = '300px';
            mainChart.update();
        }else {
            chartAfterRender.style.height = '500px';
            mainChart.update();
        }
    });
});
*/