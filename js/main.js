'use strict;'

const mainChartParent = document.querySelector('.profit-chart-content');
let mainChart='';


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

//Chart.defaults.global.defaultFontSize = 14; font size




/**
 * 
 * @brief main canvas create function
 * @author JJH
 * @see 최초 로드시 canvas 크기 지정 함수
 * 
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
            labels: ["","15일","16일","17일","18일","19일","20일","21일",""],
            datasets: [{
                label: false,
                data: [
                    null,
                    150000,
                    167000,
                    215000,
                    120000,
                    220000,
                    134000,
                    187500,
                    null
                ],
                fill: false,
                borderColor: '#6f569c',
                borderWidth: 5,
                pointBorderWidth: 2,
                pointBackgroundColor: 'white',
                pointRadius: 5,
                fontColor: 'red',
                fontSize: 25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            fontColor: 'red',
            fontSize: 25,
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
                    display: true,
                    ticks: {
                    }
                }]
            }
        }
    });
}


