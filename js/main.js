
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
        options: {
            maintainAspectRatio: false,
            fontColor: 'red',
            fontSize: 25

        },
        
        layout: {
            fontColor: 'red',
            fontSize: 25
        },
		legend: {
            display: false,
            fontColor: 'red',
            fontSize: 25
		},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                }
			}],
			xAxes: [{
                ticks: {
                }
			}]
        }
    }
});

Chart.defaults.global.defaultFontSize = 14;
