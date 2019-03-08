'use strict;'

const prevMonthLeft = document.querySelector('.prev-month > .profit-left');
const prevMonthRight = document.querySelector('.prev-month > .profit-right');
const currentMonthLeft = document.querySelector('.current-month > .profit-left');
const currentMonthRight = document.querySelector('.current-month > .profit-right');
const changePercentageRight = document.querySelector('.change-percentage > .profit-right');

const mainChartParent = document.querySelector('.profit-chart-content');
let mainChart='';



// 상단 수익금 
let profitPromise = AsyncValidateFnc('js/index.json');
let chartPromise = AsyncValidateFnc('js/index.json');

// 당월 전월 총 수익금 그리는 로직
profitPromise.then((data)=>{
    let currencyFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    let myData = JSON.parse(data);
    let nowMonth = `${new Date().getFullYear()}0${new Date().getMonth()+1}`;
    let prevMonth, nowMonthValue, prevMonthValue, chPercentage;


    if((new Date().getMonth()+1)==1) {
        prevMonth =`${new Date().getFullYear()}0${new Date().getMonth()+11}`;
        currentMonthLeft.innerText = `${new Date().getMonth()+1}월 총 광고수익금`;
        prevMonthLeft.innerText = `${new Date().getMonth()+11}월 총 광고수익금`;
    } else {
        prevMonth =`${new Date().getFullYear()}0${new Date().getMonth()}`;
        currentMonthLeft.innerText = `${new Date().getMonth()+1}월 총 광고수익금`;
        prevMonthLeft.innerText = `${new Date().getMonth()}월 총 광고수익금`;
    }

    Array.from(myData.totalProfit).forEach((el) => {
        if(el[prevMonth]!=undefined) {
            prevMonthValue = el[prevMonth];
            prevMonthRight.innerText = `${currencyFormat.format(el[prevMonth])}`;
        }
    });

    Array.from(myData.totalProfit).forEach((el) => {
        if(el[nowMonth]!=undefined) {
            nowMonthValue = el[nowMonth];
            currentMonthRight.innerText = `${currencyFormat.format(el[nowMonth])}`;
        }
    });

    chPercentage =((nowMonthValue-prevMonthValue)/nowMonthValue)*100;
    if(chPercentage%1 != 0) {
        changePercentageRight.innerText = `${chPercentage.toFixed(2)}%`;
    } else {
        changePercentageRight.innerText = `${chPercentage}%`;
    }
    if(chPercentage != 0) {
        changePercentageRight.style.color = chPercentage > 0 ? 'green' : 'red';
    }
});

chartPromise.then((data)=>{
    let nowDate = new Date().getDate();
    let dateAry =[]
    let valueAry=[];

    for(let i=(nowDate-6); i++; i>=nowDate) {
        dateAry.push(i);
    }
    console.log(dateAry);
});



// 차트 생성
createMainChart();


// 차트 생성 후 canvas 객체
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






/**
 * @brief promise 객체 생성 및 통신 검증 공통 함수
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
 * @brief main canvas create function
 * @author JJH
 * @see 최초 로드시 canvas 크기 지정 함수
 */
function createMainChart() {
    let canvasHeight = 0;

    //창크기에 따라 height 값 지정
    if(window.innerWidth <= 500 ){
        canvasHeight = 200
    }else if(window.innerWidth <= 960 ){
        canvasHeight = 300
    }else {
        canvasHeight = 500
    }
    

    //canvas 부모 div에 canvas 추가
    mainChartParent.innerHTML = `<canvas id='index-profit-chart' style='height:${canvasHeight}px;'></canvas>`;
    
    let ctx = document.getElementById("index-profit-chart");
    ctx = document.getElementById("index-profit-chart").getContext("2d");
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['','1일','2일','3일','4일','5일','6일','7일',''],
            datasets: [{
                label: false,
                data: [null,1,2,3,4,5,6,7,null],
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
                        beginAtZero:true,
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
//Chart.defaults.global.defaultFontSize = 14; font size

console.log(mainChart.data);
mainChart.data.labels = ['','1일','2일','3일','4일','5일','6일','7일',''];
mainChart.data.datasets[0].data = [null,1,2,3,4,5,6,7,null];
mainChart.update();