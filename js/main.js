let ctx = document.getElementById("index-profit-chart");
ctx.height = 80;
ctx = document.getElementById("index-profit-chart").getContext("2d");
let myChart = new Chart(ctx, {
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
			borderWidth: 2,
			pointBorderWidth: 2,
			pointBackgroundColor: 'white',
			pointRadius: 5
        }]
    },
    options: {
        layout: {

        },
		legend: {
            display: false,
            verticalAlign: "center" 
		},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                },
			}],
			xAxes: [{
                ticks: {
                }
			}]
        }
    }
});