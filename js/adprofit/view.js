import { EventList } from './controller.js';

let chart;

class View {
    static renderTopAdprofitText(data) {

        const currencyFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0});

        const totalTitle = document.querySelector('.total-profit > .profit-left');
        const totalProfitData = document.querySelector('.total-profit > .profit-right');
        const deductionTitle = document.querySelector('.deduction-profit > .profit-left');
        const deductionProfitData = document.querySelector('.deduction-profit > .profit-right');
        const pureTitle = document.querySelector('.pure-profit > .profit-left');
        const pureProfitData = document.querySelector('.pure-profit > .profit-right');

        totalTitle.innerText = `${data.month}월 최고수익`;
        totalProfitData.innerText = `${currencyFormat.format(data.monthTotalProfit)}`;
        deductionTitle.innerText = `${data.month}월 차감액`;
        deductionProfitData.innerText = `${currencyFormat.format(data.monthDeductionProfit)}`;
        pureTitle.innerHTML = `${data.month}월 순수익`;
        pureProfitData.innerHTML = `${currencyFormat.format(data.monthPureProfit)}`;
    }

    static renderSelectBox(data) {
        const adprofitChartHeadLine = document.querySelector('.adprofit-chart-header > h3');
        adprofitChartHeadLine.innerText = `${data.month}월 광고수익금`;

        const selectBox = document.querySelectorAll('.data-select-box');
        selectBox[0].innerHTML = data.firstSelectBox;
        selectBox[1].innerHTML = data.lastSelectBox;
    }

    static renderLineChart(firstChartData, lastChartData, labelArray) {
        const lineChartBox = document.querySelector('.adprofit-chart-content');
        const chartHeight = window.innerWidth <= 500 ? 200 : window.innerWidth <= 960 ? 300 : 500;
        const device = window.innerWidth <= 500 ? 'mobile' : window.innerWidth <= 960 ? 'tablet' : 'pc';
        lineChartBox.innerHTML =
        `<canvas id="ad-profit-chart" style="height:${chartHeight}px;"></canvas>`;

        const chartContext = document.getElementById("ad-profit-chart").getContext('2d');

        chart = new Chart(chartContext, {
            type: 'line',
            data: {
                labels: device === 'mobile' ? labelArray.mobile : device === 'tablet' ? labelArray.tablet : labelArray.pc,
                datasets: [{
                    label: false,
                    data: device === 'mobile' ? firstChartData.mobileValue : device === 'tablet' ? firstChartData.tabletValue : firstChartData.pcValue,
                    fill: false,
                    borderColor: '#6f569c',
                    borderWidth: 5,
                    pointBorderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointRadius: 5,
                    tension: 0
                },
                {
                    data: device === 'mobile' ? lastChartData.mobileValue : device === 'tablet' ? lastChartData.tabletValue : lastChartData.pcValue,
                    fill: false,
                    borderColor: '#ff0000',
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


        EventList.bindWindowResizeEvent();
    }

    static renderBarChart(barChartData) {
        const thisMonth = new Date().getMonth()+1;
        const lastMonth = thisMonth === 1 ? 12 : thisMonth-1;
        const twoAgoMonth = lastMonth === 1 ? 12 : lastMonth-1;
        const barChartBox = document.querySelector('.situation-chart-content');
        barChartBox.innerHTML = `<canvas id='situation-profit-chart' style="height:220px;"></canvas>`;
    
        const chartContext = document.getElementById("situation-profit-chart").getContext("2d");
        new Chart(chartContext, {
            type: 'horizontalBar',
            data: {
                labels: [`${thisMonth}월`, `${lastMonth}월`, `${twoAgoMonth}월`],
                datasets: [{
                    label: false,
                    data: [barChartData.thisMonth, barChartData.lastMonth, barChartData.twoAgoMonth],
                    fill: false,
                    borderColor: '#6f569c',
                    backgroundColor: '#6f569c',
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
                        barPercentage: 0.8,
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
    }

    static renderComparisonBox(comparisonData) {
        const currencyFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0});

        const thisMonthMaxTitle = document.querySelector('.current-month-high-title');
        const thisMonthMaxValue = document.querySelector('.current-month-high');
        thisMonthMaxTitle.innerText = `${new Date().getMonth()+1}월 최고수익`;
        thisMonthMaxValue.innerText = currencyFormat.format(comparisonData.maxThisMonth);

        const thisMonthMinTitle = document.querySelector('.current-month-low-title');
        const thisMonthMinValue = document.querySelector('.current-month-low');
        thisMonthMinTitle.innerText = `${new Date().getMonth()+1}월 최저수익`;
        thisMonthMinValue.innerText = currencyFormat.format(comparisonData.minThisMonth);

        const thisMonthAvgTitle = document.querySelector('.current-month-avg-title');
        const thisMonthAvgValue = document.querySelector('.current-month-avg');
        thisMonthAvgTitle.innerText = `${new Date().getMonth()+1}월 평균수익`;
        thisMonthAvgValue.innerText = currencyFormat.format(comparisonData.avgThisMonth);

        const monthMaxAvgValue = document.querySelector('.month-avg-high');
        const monthMinAvgValue = document.querySelector('.month-avg-low');
        const monthAvgValue = document.querySelector('.month-total-avg');
        monthMaxAvgValue.innerText = currencyFormat.format(comparisonData.maxAvgProfit);
        monthMinAvgValue.innerText = currencyFormat.format(comparisonData.minAvgProfit);
        monthAvgValue.innerText = currencyFormat.format(comparisonData.avgProfit);
    }
}

export { View, chart };