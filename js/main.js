
var ctx = document.getElementById("index-profit-chart");
ctx = document.getElementById("index-profit-chart").getContext("2d");
var myChart = new Chart(ctx, {
    type: 'line',
    height: 100,
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
			pointRadius: 5
        }]
    },
    options: {
        options: {
            maintainAspectRatio: false,

        },
        
        layout: {

        },
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
                ticks: {
                }
			}]
        }
    }
});

