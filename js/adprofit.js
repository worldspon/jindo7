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

// line chart
const adProfitChart = document.querySelector('.adprofit-chart-content');
let labelAry=[];
let valAry1 = [];
let valAry2 = [];
let tabletlabelAry=[];
let tabletvalAry1 = [];
let tabletvalAry2 = [];
let mobilelabelAry=[];
let mobilevalAry1 = [];
let mobilevalAry2 = [];
let canvasHeight2 = 0;
let myLineChart;

// bar chart
const situationChart = document.querySelector('.situation-chart-content');
let myBarChart;




profitAsync('js/adprofit.json',nowYear,nowMonth);
selectAsync('js/adprofit.json',nowYear,nowMonth);
lineChartAsync('js/adprofit.json');
barChartAsync('js/adprofit.json');



/**
 * @brief bar chart 생성을 위한 함수
 * @author JJH
 * @param data JSON data
 */
function createBarChart(data) {
    let myData = JSON.parse(data);
    myData = myData.ad[nowYear];

    let curMonth=0,prevMonth=0,pprevMonth=0;

    // 현재달은 조회일 하루전 데이터까지 합산
    myData[nowMonth].dailyprofit.forEach((el, index)=>{
        if(index<=nowDay-2) {
            curMonth+=el;
        }
    });

    myData[nowMonth-1].dailyprofit.forEach((el)=>{
            prevMonth+=el;
    });

    myData[nowMonth-2].dailyprofit.forEach((el)=>{
        pprevMonth+=el;
    });
    

    // 캔버스 생성
    situationChart.innerHTML = `<canvas id='situation-profit-chart' style="height:220px;"></canvas>`;
    
    let ctx = document.getElementById("situation-profit-chart");
    ctx = document.getElementById("situation-profit-chart").getContext("2d");
    myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: [`${nowMonth}월`, `${nowMonth-1}월`, `${nowMonth-2}월`],
            datasets: [{
                label: false,
                data: [curMonth, prevMonth, pprevMonth],
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























Array.from(dataSelectBox).forEach((el)=> {
    el.addEventListener('change', ()=> {
        updateSelect();
    });
})







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
 * @brief line chart 생성을 위한 비동기통신
 * @author JJH
 * @param url 데이터 url
 * @param data1 첫번째 데이터 연월, 없을시 현재년월 데이터
 * @param data2 첫번째 데이터 연월, 없을시 공백
 */
async function lineChartAsync(url,data1=`${nowYear}${nowMonth}`,data2=``) {
    try {
        dataSelectBox[0].disabled = 'true';
        dataSelectBox[1].disabled = 'true';
        let data = await AsyncValidateFnc(url);
        createLineChart(data, data1, data2);
    } catch (error) {
        dataSelectBox[0].removeAttribute('disabled');
        dataSelectBox[1].removeAttribute('disabled');
        console.log(error);
    }
}



/**
 * @brief bar chart 생성을 위한 비동기통신
 * @author JJH
 * @param url 데이터 url
 */
async function barChartAsync(url) {
    try {
        let data = await AsyncValidateFnc(url);
        createBarChart(data);
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
 * @brief selected 속성을 기반으로 select box option을 바꾸는 함수
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



/**
 * @brief line chart 생성을 위한 함수
 * @author JJH
 * @param url 데이터 url
 * @param data1 첫번째 데이터 연월
 * @param data2 첫번째 데이터 연월
 */
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
    myData = myData.ad
    let dataYear1 = data1.slice(0,4);
    let dataYear2 = data2.slice(0,4);
    let dataMonth1 = data1.slice(4);
    let dataMonth2 = data2.slice(4);
    let labelLength;

    // 최초 접속시 화면에 표현할 데이터(mobile, tablet, PC)
    let firstLabel, firstValue1, firstValue2;


    // device별 표시할 데이터 배열
    labelAry=[];
    valAry1 = [];
    valAry2 = [];

    // 3일 단위
    tabletlabelAry=[];
    tabletvalAry1 = [];
    tabletvalAry2 = [];

    // 5일 단위
    mobilelabelAry=[];
    mobilevalAry1 = [];
    mobilevalAry2 = [];



    // 데이터 저장
    valAry1 = myData[dataYear1][dataMonth1].dailyprofit;
    // 기기별 데이터 분리
    valAry1.forEach((el,index)=>{
        if((index==0)||(index%3==2)&&index<=27){
            tabletvalAry1.push(el);
        }
        if((index==0)||(index%5==4)&&index<=25){
            mobilevalAry1.push(el);
        }
    })

    if(data2 != '') {
        valAry2 = myData[dataYear2][dataMonth2].dailyprofit;
        valAry2.forEach((el,index)=>{
            if((index==0)||(index%3==2)&&index<=27){
                tabletvalAry2.push(el);
            }
            if((index==0)||(index%5==4)&&index<=25){
                mobilevalAry2.push(el);
            }
        })
    }

    labelLength = Math.max(valAry1.length, valAry2.length);

    for(let i=1; i<=labelLength; i++) {
        labelAry.push(`${i}일`);
    }

    labelAry.forEach((el,index)=>{
        if((index==0)||(index%3==2)&&index<=27){
            tabletlabelAry.push(el);
        }
        if((index==0)||(index%5==4)&&index<=25){
            mobilelabelAry.push(el);
        }
    })

    // 차트 내부 공백을 위한 데이터 앞 뒤 공백처리
    labelAry.unshift('');
    labelAry.push('');
    valAry1.unshift(null);
    valAry2.unshift(null);
    valAry1.push(null);
    valAry2.push(null);

    tabletlabelAry.unshift('');
    tabletlabelAry.push('');
    tabletvalAry1.unshift(null);
    tabletvalAry2.unshift(null);
    tabletvalAry1.push(null);
    tabletvalAry2.push(null);

    mobilelabelAry.unshift('');
    mobilelabelAry.push('');
    mobilevalAry1.unshift(null);
    mobilevalAry2.unshift(null);
    mobilevalAry1.push(null);
    mobilevalAry2.push(null);


    if(window.innerWidth <= 500 ){
        firstLabel = mobilelabelAry;
        firstValue1 = mobilevalAry1;
        firstValue2 = mobilevalAry2;

    }else if(window.innerWidth <= 960 ){
        firstLabel = tabletlabelAry;
        firstValue1 = tabletvalAry1;
        firstValue2 = tabletvalAry2;
    }else {
        firstLabel = labelAry;
        firstValue1 = valAry1;
        firstValue2 = valAry2;
    }

    // 캔버스 생성
    adProfitChart.innerHTML = `<canvas id='ad-profit-chart' style='height:${lineChartHeight}px;'></canvas>`;
    let ctx = document.getElementById("ad-profit-chart");
    ctx = document.getElementById("ad-profit-chart").getContext("2d");

    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            // dateAry!!!
            labels: firstLabel,
            datasets: [{
                label: false,
                // valueAry!!!
                data: firstValue1,
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
                data: firstValue2,
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

    // 차트 생성 후 canvas id
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
            myLineChart.data.labels = tabletlabelAry;
            myLineChart.data.datasets[0].data = tabletvalAry1;
            myLineChart.data.datasets[1].data = tabletvalAry2;
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