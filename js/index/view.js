import { EventList } from './controller.js';

// CHART 생성 후 객체 저장
const chartObject = {
    myChart : null
}

class View {

    // 광고수익금 날짜 표현
    static renderMonth(currentDate) {
        const prevMonthTitle = document.querySelector('.prev-month > .profit-left');
        const currentMonthTitle = document.querySelector('.current-month > .profit-left');
        const prevMonth = currentDate.month === 1 ? 12 : currentDate.month-1;
        currentMonthTitle.innerText = `${currentDate.month}월 총 광고수익금`;
        prevMonthTitle.innerText = `${prevMonth}월 총 광고수익금`;
    }

    // 상단 광고수익금 데이터 표현
    static renderAdprofitText(data) {
        const prevMonthValue = document.querySelector('.prev-month > .profit-right');
        const currentMonthValue = document.querySelector('.current-month > .profit-right');
        const changePercentageValue = document.querySelector('.change-percentage > .profit-right');

        prevMonthValue.innerText = data.prevMonth;
        currentMonthValue.innerText = data.currentMonth;
        changePercentageValue.innerText = data.comparePercentage;
        changePercentageValue.style.color = parseFloat(data.comparePercentage) >= 0 ? 'green' : 'red';
    }

    // 광고수익금 CHART 표현 후 객체 저장
    static renderAdprofitChart(chartData) {
        const chartTag = document.getElementById("index-profit-chart").getContext("2d");

        chartObject.myChart =
        new Chart(chartTag, {
            type: 'line',
            data: {
                labels: chartData.dateArray,
                datasets: [{
                    label: false,
                    data: chartData.valueArray,
                    fill: false,
                    borderColor: '#6f569c',
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
    }

    // 공지사항 데이터 표현
    static renderNotice(data) {
        const noticeBoxContent = document.querySelector('.notice-box-content');
        noticeBoxContent.innerHTML = '';

        for(const el of data) {
            noticeBoxContent.innerHTML += 
            `<div class='board-content'>
                <a href="/notice/content/${el.id}">
                    <span class='board-content-header'>${el.title}</span>
                </a>
                <span class='board-content-date'>${el.writeDate}</span>
            </div>`;
        }
    }

    // FAQ 데이터 표현
    static renderFaq(data) {
        const faqBoxContent = document.querySelector('.faq-box-content');
        faqBoxContent.innerHTML = '';

        for(const el of data) {
            faqBoxContent.innerHTML += 
            `<div class='board-content'>
                <a href="/faq/content/${el.id}">
                    <span class='board-content-header'>${el.question}</span>
                </a>
            </div>`;
        }
    }

    // 좀비레이스 데이터 표현
    static raceTableRender(date, data) {
        const raceTable = document.querySelector('.zombie-race');
        let raceTableHTML = '';

        raceTableHTML = 
        `<div class='game-table-header'>
            <h3>${date.month}.${date.day} 좀비레이스 결과</h3>
        </div>
        <table class='game-table-content'>
            <tr class='game-table-row'>
                <th class='col'>회차</th>
                <th>1등</th>
                <th>2등</th>
                <th>3등</th>
                <th>4등</th>
                <th>5등</th>
            </tr>`;

        for(const [index, el] of data.entries()) {
            if(index === 0) {
                if(el.win1 !== '준비중' && el.count !== 288) {
                    raceTableHTML +=
                    `<tr class='game-table-row'>
                        <th class='col'>${el.count+1}</th>
                        <td>준비중</td>
                        <td>준비중</td>
                        <td>준비중</td>
                        <td>준비중</td>
                        <td>준비중</td>
                    </tr>`;
                }
            }

            raceTableHTML +=
            `<tr class='game-table-row'>
                <th class='col'>${el.count}</th>
                <td>${el.win1}</td>
                <td>${el.win2}</td>
                <td>${el.win3}</td>
                <td>${el.win4}</td>
                <td>${el.win5}</td>
            </tr>`;

            if(data[0].win1 !== '준비중') {
                if(index === 3) {
                    break;
                }
            }
        }

        raceTableHTML += `</table>`;

        raceTable.innerHTML = raceTableHTML;
    }

    // 좀비격투 데이터 표현
    static fightTableRender(date, data) {
        const fightTable = document.querySelector('.zombie-fight');
        let fightTableHTML = ``;

        fightTableHTML = 
        `<div class='game-table-header'>
            <h3>${date.month}.${date.day} 좀비격투 결과</h3>
        </div>
        <table class='game-table-content'>
            <tr class='game-table-row'>
                <th class='col'>회차</th>
                <th>좌측</th>
                <th>우측</th>
                <th>승자</th>
                <th>KO여부</th>
            </tr>`;

        for(const [index, el] of data.entries()) {
            if(index === 0) {
                if(el.winner !== '준비중' && el.count !== 288) {
                    fightTableHTML +=
                    `<tr class='game-table-row'>
                        <th class='col'>${el.count+1}</th>
                        <td>준비중</td>
                        <td>준비중</td>
                        <td>준비중</td>
                        <td>준비중</td>
                    </tr>`;
                }
            }

            fightTableHTML +=
            `<tr class='game-table-row'>
                <th class='col'>${el.count}</th>
                <td>${el.leftPlayer}</td>
                <td>${el.rightPlayer}</td>
                <td>${el.winner}</td>
                <td>${el.winner === '준비중' ? '준비중' : el.KO ? 'KO' : '판정승'}</td>
            </tr>`;

            if(data[0].winner !== '준비중') {
                if(index === 3) {
                    break;
                }
            }
        }

        fightTableHTML += `</table>`;

        fightTable.innerHTML = fightTableHTML;
    }

    // 좀비격파 데이터 표현
    static breakTableRender(date, data) {
        const breakTable = document.querySelector('.zombie-break');
        let breakTableHTML = ``;

        breakTableHTML = 
        `<div class='game-table-header'>
            <h3>${date.month}.${date.day} 좀비격파 결과</h3>
        </div>
        <table class='game-table-content'>
            <tr class='game-table-row'>
                <th class='col'>회차</th>
                <th>좌측</th>
                <th>격파수</th>
                <th>우측</th>
                <th>격파수</th>
                <th>승자</th>
            </tr>`;

        for(const [index, el] of data.entries()) {
            if(index === 0) {
                if(el.winner !== '준비중' && el.count !== 480) {
                    breakTableHTML +=
                    `<tr class='game-table-row'>
                        <th class='col'>${el.count+1}</th>
                        <td>준비중</td>
                        <td>준비중</td>
                        <td>준비중</td>
                        <td>준비중</td>
                        <td>준비중</td>
                    </tr>`;
                }
            }

            breakTableHTML +=
            `<tr class='game-table-row'>
                <th class='col'>${el.count}</th>
                <td>${el.leftPlayer}</td>
                <td>${el.leftBroken}</td>
                <td>${el.rightPlayer}</td>
                <td>${el.rightBroken}</td>
                <td>${el.winner}</td>
            </tr>`;

            if(data[0].winner !== '준비중') {
                if(index === 3) {
                    break;
                }
            }
        }

        breakTableHTML += `</table>`;

        breakTable.innerHTML = breakTableHTML;


    }

    // 좀비낙하 데이터 표현
    static dropTableRender(date, data) {
        const dropTable = document.querySelector('.zombie-drop');
        let dropTableHTML = ``;

        dropTableHTML =
        `<div class='game-table-header'>
            <h3>${date.month}.${date.day} 좀비낙하 결과</h3>
        </div>
        <table class='game-table-content'>
            <tr class='game-table-row'>
                <th class='col'>회차</th>
                <th>1번좀비</th>
                <th>2번좀비</th>
                <th>3번좀비</th>
                <th>4번좀비</th>
                <th>5번좀비</th>
            </tr>`;

        if(data[0].count !== 288) {
            dropTableHTML +=
            `<tr class='game-table-row'>
                <th class='col'>${data[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;
        }

        for(const [index, el] of data.entries()) {
            dropTableHTML +=
            `<tr class='game-table-row'>
                <th class='col'>${el.count}</th>
                <td>${el.result[0]}</td>
                <td>${el.result[1]}</td>
                <td>${el.result[2]}</td>
                <td>${el.result[3]}</td>
                <td>${el.result[4]}</td>
            </tr>`;

            if(index === 3) {
                break;
            }
        }

        dropTableHTML += `</table>`;

        dropTable.innerHTML = dropTableHTML;
    }

    // BLOCK MODAL을 표현 후 이벤트 바인딩
    static renderBlockInfoModal(data) {
        const body = document.querySelector('body');
        const modalBox = document.createElement('div');
        modalBox.classList.add('modal-box');
        modalBox.innerHTML = 
        `<div class="modal">
            <p class="modal-header">이용 제한 조치 안내</p>
            <div class="modal-body">
                <p>대상 : <span>${data.trademark}</span></p>
                <p>사유 : <span>${data.blockMemo}</span></p>
                <p>시작일시 : <span>${data.startDate}</span></p>
                <p>종료일시 : <span>${data.endDate}</span></p>
                <p>정지기간 : <span>${data.period}일</span></p>
                <p>제재조치 : <span>게시판 이용 제한</span></p>
            </div>
            <div class="button-box">
                <button class="pause-modal" data-id="${data.trademark}">3일 후에 다시보기</button>
                <a href="./directq.html"><button class="move-directq">1:1 문의</button></a>
                <button class="close-modal">확인</button>
            </div>
        </div>`;
        const modalBackground = document.createElement('div');
        modalBackground.classList.add('modal-backgruond');

        body.appendChild(modalBox);
        body.appendChild(modalBackground);
        const windowHeight = window.innerHeight;
        const bodyHeight = document.querySelector('body').offsetHeight;
        modalBackground.style.height = windowHeight >= bodyHeight ? windowHeight : bodyHeight + 'px';

        // BLOCK MODAL BACKGROUND RESIZE EVENT BIND
        EventList.bindModalHeightResizeEvent();
        // BLOCK MODAL PAUSE EVENT BIND
        EventList.bindPauseBlockModalEvent();
        // BLOCK MODAL CLOSE EVENT BIND
        EventList.bindCloseModalEvent();
    }

    // ERROR CATCH ->  ALERT VIEW
    static viewAlert(msg) {
        alert(msg);
    }
}

export { View, chartObject };