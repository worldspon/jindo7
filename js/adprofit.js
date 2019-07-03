'use strict';

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

let mainJsonData;
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

// comparison profit
let curMonHighTitle = document.querySelector('.current-month-high-title');
let curMonHigh = document.querySelector('.current-month-high');
let curMonLowTitle = document.querySelector('.current-month-low-title');
let curMonLow = document.querySelector('.current-month-low');
let curMonAvgTitle = document.querySelector('.current-month-avg-title');
let curMonAvg = document.querySelector('.current-month-avg');

let monAvgHigh = document.querySelector('.month-avg-high');
let monAvgLow = document.querySelector('.month-avg-low');
let monTotalAvg = document.querySelector('.month-total-avg');

const asyncURL ='http://192.168.0.24:8081/adprofit/fetch';


mainAsync(asyncURL);

/**
 * @brief 첫 비동기 통신
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
*/
async function mainAsync(url) {
    try {
        mainJsonData = await AsyncValidateFnc(url);
        mainJsonData = JSON.parse(mainJsonData);
        renderData(mainJsonData);
    } catch (error) {
        console.log(error);
    }
}

function renderData(mainJsonData) {

    let nowData = mainJsonData.ad[nowYear][nowMonth];

    // myData.ad[nowYear][nowMonth];
    if(nowData) {
        // 상단 수익금

        setProfitData(mainJsonData,nowYear,nowMonth);

        setSelectBox(mainJsonData,nowYear,nowMonth);

        createLineChart(mainJsonData,`${nowYear}${nowMonth}`, ``);

        createBarChart(mainJsonData);

        setComparisonData(mainJsonData);


    } else {
        if(nowMonth==1) {
            nowYear-=1;
            nowMonth = 12;    
        } else {
            nowMonth -= 1;
        }
            setProfitData(mainJsonData,nowYear,nowMonth);

            setSelectBox(mainJsonData,nowYear,nowMonth);

            createLineChart(mainJsonData,`${nowYear}${nowMonth}`, ``);

            createBarChart(mainJsonData);

            setComparisonData(mainJsonData);
    }
}






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
 * @brief 첫 접속시 하단 수익비교 박스 데이터 입력 함수
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */
function setComparisonData(data) {
    let myData = Object.assign({},data);
    let curHigh = curLow = curAvg = monMaxAvg = monMinAvg = monAvg = avgCount = 0;
    let curValAry = [];
    let currencyFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0});

    // 데이터의 연도 배열
    dataYear = myData.year;

    // 데이터의 월 객체
    dataMonth = myData.month;

    myData = myData.ad;

    dataYear.forEach((el)=>{

        dataMonth[el].forEach((eel)=>{
            let dummyAry = [];
            let dummyObj = myData[el][eel];
            for(index in dummyObj.dailyprofit) {
                dummyAry.push(dummyObj.dailyprofit[index]-dummyObj.deduction[index]);
            }
            if(el==nowYear && eel==nowMonth) {
                dummyAry.length = nowDay-1;
            }
            monMaxAvg += Math.max(...dummyAry);
            monMinAvg += Math.min(...dummyAry);
            monAvg += dummyAry.reduce((a,b)=>a+b) / dummyAry.length;
            avgCount++;

        });
    });

    monMaxAvg /= avgCount;
    monMinAvg /= avgCount;
    monAvg /= avgCount;


    curValAry = myData[nowYear][nowMonth].dailyprofit;
    for(const i in curValAry) {
        curValAry[i] -= myData[nowYear][nowMonth].deduction[i];
    }
    curValAry.length = nowDay-1;
    curHigh = Math.max(...curValAry);
    curLow = Math.min(...curValAry);

    curAvg = (curValAry.reduce((a,b)=>a+b)/curValAry.length).toFixed(2);
    // totalProfit.innerHTML = `${currencyFormat.format(total)}`;

    curMonHighTitle.innerText = `${nowMonth}월 최고수익`
    curMonHigh.innerText = currencyFormat.format(curHigh);
    curMonLowTitle.innerText = `${nowMonth}월 최저수익`
    curMonLow.innerText = currencyFormat.format(curLow);
    curMonAvgTitle.innerText = `${nowMonth}월 평균수익`
    curMonAvg.innerText = currencyFormat.format(Math.round(curAvg));
    monAvgHigh.innerText = currencyFormat.format(monMaxAvg.toFixed(2));
    monAvgLow.innerText = currencyFormat.format(monMinAvg.toFixed(2));
    monTotalAvg.innerText = currencyFormat.format(monAvg.toFixed(2));

}










// select box에 change event 추가
Array.from(dataSelectBox).forEach((el)=> {
    el.addEventListener('change', ()=> {
        updateSelect();
    });
})



/**
 * @brief 상단 수익금 및 차트 제목, 최초 차트내용을 변경하는 함수
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */
function setProfitData(data,yy,mm) {

    //화폐 표기를 위한 포멧 설정
    let currencyFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD', minimumFractionDigits: 0});
    let myData = Object.assign({},data);
    myData = myData.ad[yy][mm];


    let total = 0, deduction = 0, pure = 0;
    let count = 0;
    // deduction = myData.deduction;

    if(mm == (new Date().getMonth()+1)) {
        for (const it of myData.dailyprofit) {
            total += it;
            count++;
            if(count>=nowDay-1) {
                break;
            }
        }
        count = 0;

        for (const it of myData.deduction) {
            deduction += it;
            count++;
            if(count>=nowDay-1) {
                break;
            }
        }
        // deduction = (total * deduction).toFixed(2);
    } else {
        for (const it of myData.dailyprofit) {
            total += it;
        }

        for (const it of myData.deduction) {
            deduction += it;
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
    // dataSelectBox[0].removeAttribute('disabled');
    // dataSelectBox[1].removeAttribute('disabled');
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
    let myData = Object.assign({},data);
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

    // selected 된 value 값 저장
    let dataSelect1, dataSelect2;
    // 각 value를 연도, 월 로 구분하여 저장
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

    // 첫번째 selected 된 value가 각 box의 제목과 내용이 됨
    // profitAsync('js/adprofit.json',dataSelectYear1,dataSelectMonth1);
    setProfitData(mainJsonData,dataSelectYear1,dataSelectMonth1);

    dataOption2.forEach((el)=>{
        if(el.selected) {
            dataSelect2 = el.value;
            dataSelectYear2 = parseInt(dataSelect2.slice(0,4));
            dataSelectMonth2 = parseInt(dataSelect2.slice(4));
        }
    });

    /**
     * select box option 규칙
     * data1과 data2에 선택된 값은 option에 그리지 않는다.
     * data2에서 select를 선택하면 차트2가 사라진다.
     */
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
        // lineChartAsync('js/adprofit.json',dataSelect1);
        createLineChart(mainJsonData, dataSelect1);
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
        createLineChart(mainJsonData, dataSelect1,dataSelect2);
        // lineChartAsync('js/adprofit.json',dataSelect1, dataSelect2);
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
function createLineChart(data, data1=`${nowYear}${nowMonth}`, data2=``) {

    let lineChartHeight = 0;
    //창크기에 따라 height 값 지정
    if(window.innerWidth <= 500 ){
        lineChartHeight = 200
    }else if(window.innerWidth <= 960 ){
        lineChartHeight = 300
    }else {
        lineChartHeight = 500
    }
    let myData = Object.assign({},data);

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
    // valAry1 = myData[dataYear1][dataMonth1].dailyprofit;
    valAry1 = Object.assign([],myData[dataYear1][dataMonth1].dailyprofit);
    
    // 순수익 계산
    for (const key in valAry1) {
        valAry1[key] -= myData[dataYear1][dataMonth1].deduction[key];
    }

    
    

    // 현재월 조회시 오늘-1일까지만 데이터 저장
    if(nowYear==dataYear1 && nowMonth == dataMonth1) {
        valAry1.length = nowDay-1;
    }
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

        // valAry2 = myData[dataYear2][dataMonth2].dailyprofit;
        valAry2 = Object.assign([],myData[dataYear2][dataMonth2].dailyprofit);

        // 순수익 계산
        for (const key in valAry2) {
            valAry2[key] -= myData[dataYear2][dataMonth2].deduction[key];
        }

        // 현재월 조회시 오늘-1일까지만 데이터 저장
        if(nowYear==dataYear2 && nowMonth == dataMonth2) {
            valAry2.length = nowDay-1;
        }

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
            labels: firstLabel,
            datasets: [{
                label: false,
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



/**
 * @brief bar chart 생성을 위한 함수
 * @author JJH
 * @param data JSON data
 */
function createBarChart(data) {
    let myData = Object.assign({},data);
    myData = myData.ad[nowYear];

    let curMonth=0,prevMonth=0,pprevMonth=0;

    // 현재달은 조회일 하루전 데이터까지 합산
    myData[nowMonth].dailyprofit.forEach((el, index)=>{
        if(index<=nowDay-1) {
            curMonth+=(el- myData[nowMonth].deduction[index]);
        }
    });

    myData[nowMonth-1].dailyprofit.forEach((el, index)=>{
        prevMonth+=(el- myData[nowMonth-1].deduction[index]);
    });

    myData[nowMonth-2].dailyprofit.forEach((el, index)=>{
        pprevMonth+=(el- myData[nowMonth-2].deduction[index]);
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