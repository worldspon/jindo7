
var ctx = document.getElementById("index-profit-chart");
ctx = document.getElementById("index-profit-chart").getContext("2d");
var myChart = new Chart(ctx, {
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

let chartAfterRender = document.getElementById("index-profit-chart");

window.addEventListener('resize', function(){
    if(window.innerWidth <= 960 ){
        chartAfterRender.style.height = '300px';
        myChart.update();
    }else {
        chartAfterRender.style.height = '400px';
        myChart.update();
    }
});

//Chart.defaults.global.defaultFontSize = 14; font size