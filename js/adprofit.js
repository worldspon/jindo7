'use strict;'

// 현재 날짜 데이터 저장
let nowYear = new Date().getFullYear();
let nowMonth = new Date().getMonth()+1;
let nowDay = new Date().getDate();

// 상단 수익금
const totalTitle = document.querySelector('.total-profit > .profit-left');
const deductionTitle = document.querySelector('.deduction-profit > .profit-left');
const pureTitle = document.querySelector('.pure-profit > .profit-left');
const totalProfit = document.querySelector('.total-profit > .profit-right');
const deductionProfit = document.querySelector('.deduction-profit > .profit-right');
const pureProfit = document.querySelector('.pure-profit > .profit-right');

// 광고 수익금
const adprofitChartHl = document.querySelector('.adprofit-chart-header > h3');
let dataSelectBox = document.querySelectorAll('.data-select-box');
// select option node id 저장
let dataOption1, dataOption2;
// 현재 가지고 있는 데이터의 연 월 저장
let dataYear, dataMonth;

// 당월 광고수익금 차트
const adProfitChart = document.querySelector('.adprofit-chart-content');
let labelAry=[];
let valAry1 = [];
let valAry2 = [];
let mobilelabelAry=[];
let mobilevalAry1 = [];
let mobilevalAry2 = [];
let canvasHeight2 = 0;
let myLineChart;
let mobileFlag = false;



profitAsync('js/adprofit.json',nowYear,nowMonth);
selectAsync('js/adprofit.json',nowYear,nowMonth);
lineChartAsync('js/adprofit.json');
//createLineChart(myData.dailyprofit);

console.log(`${nowYear}${nowMonth}`);

Array.from(dataSelectBox).forEach((el)=> {
    el.addEventListener('change', ()=> {
        updateSelect();
    });
})




/**
 * @brief 첫 접속시 상단 수익금 박스 초기화를 위한 통신
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */
async function lineChartAsync(url,data1=`${nowYear}${nowMonth}`,data2=``) {
    try {
        let data = await AsyncValidateFnc(url);
        createLineChart(data, data1, data2);
    } catch (error) {
        dataSelectBox[0].removeAttribute('disabled');
        dataSelectBox[1].removeAttribute('disabled');
        console.log(error);
    }
}






function createLineChart(data, data1, data2) {

    let lineChartHeight = 0;
    //창크기에 따라 height 값 지정
    if(window.innerWidth <= 500 ){
        lineChartHeight = 200
    }else if(window.innerWidth <= 960 ){
        lineChartHeight = 300
    }else {
        lineChartHeight = 500
    }

    let myData = JSON.parse(data);
    let dataYear1 = data1.slice(0,4);
    let dataYear2 = data2.slice(0,4);
    let dataMonth1 = data1.slice(4);
    let dataMonth2 = data2.slice(4);
    let labelLength;
    labelAry=[];
    valAry1 = [];
    valAry2 = [];
    mobilelabelAry=[];
    mobilevalAry1 = [];
    mobilevalAry2 = [];

    myData = myData.ad
    valAry1 = myData[dataYear1][dataMonth1].dailyprofit;

    valAry1.forEach((el,index)=>{
        if((index==0)||(index%5==4)&&index<=25){
            mobilevalAry1.push(el);
        }
    })

    if(data2 != '') {
        valAry2 = myData[dataYear2][dataMonth2].dailyprofit;
        valAry2.forEach((el,index)=>{
            if((index==0)||(index%5==4)&&index<=25){
                mobilevalAry2.push(el);
            }
        })
    }

    adProfitChart.innerHTML = `<canvas id='ad-profit-chart' style='height:${lineChartHeight}px;'></canvas>`;
    let ctx = document.getElementById("ad-profit-chart");
    ctx = document.getElementById("ad-profit-chart").getContext("2d");

    labelLength = Math.max(valAry1.length, valAry2.length);
    for(let i=1; i<=labelLength; i++) {
        labelAry.push(`${i}일`);
    }

    labelAry.forEach((el,index)=>{
        if((index==0)||(index%5==4)&&index<=25){
            mobilelabelAry.push(el);
        }
    })
    labelAry.unshift('');
    labelAry.push('');

    valAry1.unshift(null);
    valAry2.unshift(null);
    valAry1.push(null);
    valAry2.push(null);

    mobilevalAry1.unshift(null);
    mobilevalAry2.unshift(null);
    mobilevalAry1.push(null);
    mobilevalAry2.push(null);
    mobilelabelAry.unshift('');
    mobilelabelAry.push('');

    console.log(mobilelabelAry);
    console.log(mobilevalAry1);
    console.log(mobilevalAry2);

    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            // dateAry!!!
            labels: labelAry,
            datasets: [{
                label: false,
                // valueAry!!!
                data: valAry1,
                fill: false,
                borderColor: '#6f569c',
                borderWidth: 5,
                pointBorderWidth: 2,
                pointBackgroundColor: 'white',
                pointRadius: 5,
                tension: 0
            },
            {
                // valueAry!!!
                data: valAry2,
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

    let lineChartAfter = document.getElementById('ad-profit-chart');

    window.addEventListener('resize', () => {
        if(window.innerWidth <= 500 ){
            lineChartAfter.style.height = '200px';
            myLineChart.data.labels = mobilelabelAry;
            myLineChart.data.datasets[0].data = mobilevalAry1;
            myLineChart.data.datasets[1].data = mobilevalAry2;
            myLineChart.update();
        }else if(window.innerWidth <= 960 ){
            lineChartAfter.style.height = '300px';
            myLineChart.data.labels = labelAry;
            myLineChart.data.datasets[0].data = valAry1;
            myLineChart.data.datasets[1].data = valAry2;
            myLineChart.update();
        }else {
            lineChartAfter.style.height = '500px';
            myLineChart.data.labels = labelAry;
            myLineChart.data.datasets[0].data = valAry1;
            myLineChart.data.datasets[1].data = valAry2;
            myLineChart.update();
        }
    });
}


/*

adProfitChart.innerHTML = `<canvas id='ad-profit-chart' style='height:${canvasHeight1}px;'></canvas>`;

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
            // valueAry!!!
            data: valAry2,
            fill: false,
            borderColor: '#ff0000',
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


*/

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
}






/**
 * @brief 첫 접속시 상단 수익금 박스 초기화를 위한 통신
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */
async function profitAsync(url,yy,mm) {
    try {
        // 통신중일시 select box disabled
        dataSelectBox[0].disabled = 'true';
        dataSelectBox[1].disabled = 'true';
        let data = await AsyncValidateFnc(url);
        setProfitData(data,yy,mm);
    } catch (error) {
        dataSelectBox[0].removeAttribute('disabled');
        dataSelectBox[1].removeAttribute('disabled');
        console.log(error);
    }
}



/**
 * @brief 첫 접속시 select box 초기화를 위한 통신
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */
async function selectAsync(url,yy,mm) {
    try {
        let data = await AsyncValidateFnc(url);
        setSelectBox(data,yy,mm);
    } catch (error) {
        console.log(error);
    }
}



/**
 * @brief 상단 수익금 및 차트 제목, 차트내용을 변경하는 함수
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */
function setProfitData(data,yy,mm) {

    //화폐 표기를 위한 포멧 설정
    let currencyFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0});

    let myData = JSON.parse(data);
    myData = myData.ad[yy][mm];


    let total = 0, deduction = 0, pure = 0;
    let count = 0;
    deduction = myData.deduction;

    if(mm == (new Date().getMonth()+1)) {
        for (const it of myData.dailyprofit) {
            total += it;
            count++;
            if(count>=nowDay) {
                break;
            }
        }
        deduction = (total * deduction).toFixed(2);
    } else {
        for (const it of myData.dailyprofit) {
            total += it;
        }
    }

    pure = total - deduction;

    totalTitle.innerHTML = `${mm}월 총수익`;
    deductionTitle.innerHTML = `${mm}월 차감액`;
    pureTitle.innerHTML = `${mm}월 순수익`;
    totalProfit.innerHTML = `${currencyFormat.format(total)}`;
    deductionProfit.innerHTML = `${currencyFormat.format(deduction)}`;
    pureProfit.innerHTML = `${currencyFormat.format(pure)}`;
    adprofitChartHl.innerText = `${mm}월 광고수익금`


    // 통신종료시 select box disabled 해제
    dataSelectBox[0].removeAttribute('disabled');
    dataSelectBox[1].removeAttribute('disabled');
}




/**
 * @brief data를 기반으로 select box option을 그리는 함수
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 * @see 참고사항
 *      해당 함수에서 저장하는 dataYear, dataMonth는 select box update시
 *      연도, 월 정보를 통신 없이 얻기 위함임.
 */
function setSelectBox(data, yy, mm) {
    let myData = JSON.parse(data);
    let tempHtml = '';
    adprofitChartHl.innerText = `${mm}월 광고수익금`
    
    // 데이터의 연도 배열
    dataYear = myData.year;

    // 데이터의 월 객체
    dataMonth = myData.month;

    // Data1 Select Box start
    // YYYY-MM 형식으로 option 설정
    myData.year.forEach((el)=>{
        myData.month[el].forEach((eel) => {
            // 현재 연,월을 선택하고 숨김
            if(el == yy && eel == mm) {
                tempHtml += `<option value='${el}${eel}' style='display:none;' selected='selected'>${el}-${(eel>9 ? eel : '0'+eel)}</option>`
            } else {
                tempHtml += `<option value='${el}${eel}'>${el}-${(eel>9 ? eel : '0'+eel)}</option>`
            }
        });
    });
    dataSelectBox[0].innerHTML = tempHtml;
    dataOption1 = dataSelectBox[0].childNodes;
    // Data1 Select Box end


    // Data2 Select Box start
    // 태그 저장 변수 초기화
    tempHtml='';
    tempHtml += `<option value="select" style='display:none;' selected="selected">select</option>`;

    myData.year.forEach((el)=>{
        myData.month[el].forEach((eel) => {
            if(el != yy || eel != mm) {
                tempHtml += `<option value='${el}${eel}'>${el}-${(eel>9 ? eel : '0'+eel)}</option>`;
            }
        });
    });
    dataSelectBox[1].innerHTML = tempHtml;
    dataOption2 = dataSelectBox[1].childNodes;
    // Data2 Select Box end
    
}



/**
 * @brief selected 속성을 기반으로 select bos option을 바꾸는 함수
 * @author JJH
 * @see 참고사항
 *      해당 함수에서 참조하는 dataYear, dataMonth는 setSelectBox함수에서
 *      할당 된 것으로 setSelectBox 함수 변경시 따로 설정해야한다.
 */
function updateSelect() {
    let dataSelect1, dataSelect2;
    let dataSelectYear1, dataSelectMonth1;
    let dataSelectYear2, dataSelectMonth2;
    let tempHtml = '';

    dataOption1.forEach((el)=>{
        if(el.selected) {
            dataSelect1 = el.value;
            dataSelectYear1 = parseInt(dataSelect1.slice(0,4));
            dataSelectMonth1 = parseInt(dataSelect1.slice(4));
        }
    });

    profitAsync('js/adprofit.json',dataSelectYear1,dataSelectMonth1);

    dataOption2.forEach((el)=>{
        if(el.selected) {
            dataSelect2 = el.value;
            dataSelectYear2 = parseInt(dataSelect2.slice(0,4));
            dataSelectMonth2 = parseInt(dataSelect2.slice(4));
        }
    });

    dataYear.forEach((el)=>{
        dataMonth[el].forEach((eel)=>{
            if(el != dataSelectYear2 || eel != dataSelectMonth2) {
                if(el == dataSelectYear1 && eel == dataSelectMonth1) {
                    tempHtml += `<option value='${el}${eel}' style='display:none;' selected='selected'>${el}-${(eel>9 ? eel : '0'+eel)}</option>`;
                }else {
                    tempHtml += `<option value='${el}${eel}'>${el}-${(eel>9 ? eel : '0'+eel)}</option>`;
                }
            }
        })
    });

    dataSelectBox[0].innerHTML = tempHtml;

    tempHtml='';

    if(dataSelect2 == 'select'){
        tempHtml += `<option value="select" style='display:none;' selected="selected">select</option>`;
        dataYear.forEach((el)=>{
            dataMonth[el].forEach((eel)=>{
                if(el != dataSelectYear1 || eel != dataSelectMonth1) {
                    tempHtml += `<option value='${el}${eel}'>${el}-${(eel>9 ? eel : '0'+eel)}</option>`;
                }
            });
        });
        lineChartAsync('js/adprofit.json',dataSelect1)
    } else {
        tempHtml += `<option value="select">select</option>`;
        dataYear.forEach((el)=>{
            dataMonth[el].forEach((eel)=>{
                if((el != dataSelectYear1) || (eel != dataSelectMonth1)) {
                    if(el == dataSelectYear2 && eel == dataSelectMonth2) {
                        tempHtml += `<option value='${el}${eel}' style='display:none;' selected='selected'>${el}-${(eel>9 ? eel : '0'+eel)}</option>`;
                    }else {
                        tempHtml += `<option value='${el}${eel}'>${el}-${(eel>9 ? eel : '0'+eel)}</option>`;
                    }
                }
            })
        });
        lineChartAsync('js/adprofit.json',dataSelect1, dataSelect2);
    }
    dataSelectBox[1].innerHTML = tempHtml;
}






















const BB = document.querySelector('.situation-chart-content');

let dummyval = [null,345,432,654,123,76,256,333,null];
let dummylab = ['','1일','5일','10일','15일','20일','25일','30일',''];



BB.innerHTML = `<canvas id='situation-profit-chart' style="height:220px;"></canvas>`;

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