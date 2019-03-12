'use strict;'

const AA = document.querySelector('.adprofit-chart-content');
const BB = document.querySelector('.situation-chart-content');

let dummyval = [null,345,432,654,123,76,256,333,null];
let dummylab = ['','1일','5일','10일','15일','20일','25일','30일',''];

let canvasHeight = 0;

//창크기에 따라 height 값 지정
if(window.innerWidth <= 500 ){
    canvasHeight = 200
}else if(window.innerWidth <= 960 ){
    canvasHeight = 300
}else {
    canvasHeight = 500
}

let labelAry = [];

labelAry.push('');
for(let i=1; i<32; i++){
    labelAry.push(`${i}일`);
}
labelAry.push('');

let valAry = [];
let valAry2 = [];

valAry.push(null);

for(let i=1; i<32; i++){
   valAry.push(Math.floor((Math.random()*200)+200));
}
valAry.push(null);

valAry2.push(null);

for(let i=1; i<32; i++){
   valAry2.push(Math.floor((Math.random()*200)+200));
}
valAry2.push(null);

AA.innerHTML = `<canvas id='ad-profit-chart' style='height:${canvasHeight}px;'></canvas>`;

let ctx = document.getElementById("ad-profit-chart");
ctx = document.getElementById("ad-profit-chart").getContext("2d");
mainChart = new Chart(ctx, {
    type: 'line',
    data: {
        // dateAry!!!
        labels: labelAry,
        datasets: [{
            label: false,
            // valueAry!!!
            data: valAry,
            fill: false,
            borderColor: '#6f569c',
            borderWidth: 5,
            pointBorderWidth: 2,
            pointBackgroundColor: 'white',
            pointRadius: 5,
            tension: 0.1
        },
        {
            label: false,
            // valueAry!!!
            data: valAry2,
            fill: false,
            borderColor: 'red',
            borderWidth: 5,
            pointBorderWidth: 2,
            pointBackgroundColor: 'white',
            pointRadius: 5,
            tension: 0.1
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
                offsetGridLines:false,
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


BB.innerHTML = `<canvas id='situation-profit-chart' style="height:120px;"></canvas>`;

let ctx2 = document.getElementById("situation-profit-chart");
ctx2 = document.getElementById("situation-profit-chart").getContext("2d");
var myBarChart = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
        // dateAry!!!
        labels: ['3월','2월','1월'],
        datasets: [{
            label: false,
            // valueAry!!!
            data: [454,392,544],
            fill: false,
            borderColor: '#6f569c',
            backgroundColor: '#6f569c',
            borderWidth: 5,
            pointBorderWidth: 2,
            pointBackgroundColor: 'white',
            pointRadius: 5,
            tension: 0.1
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
                barPercentage: 0.5,
                gridLines: {
                    display: false
                },
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
                    beginAtZero: true
                }
            }]
        }
    }
});