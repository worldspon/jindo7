import { Dynamic } from './controller.js';

// 오늘 날짜 객체
const nowDate = {
    month : new Date().getMonth()+1,
    day : new Date().getDate()
};

// 어제 날짜 객체
const prevDate = {
    month : nowDate.day-1 === 0 ? new Date(new Date().setDate(0)).getMonth()+1 : nowDate.month,
    day : nowDate.day-1 === 0 ? new Date(new Date().setDate(0)).getDate() : nowDate.day-1
}

class CountdownView {

    // 5분 타이머 표시
    static setFiveCountDownSpan(remainMinute, remainSeconds) {
        const fiveCountdownSpan = document.querySelectorAll('.five-countdown');
        for(const el of fiveCountdownSpan) {
            el.innerText = `잔여시간 : 0${remainMinute}:${remainSeconds > 9 ? remainSeconds : `0${remainSeconds}`}`;
        }
    }

    // 3분 타이머 표시
    static setThreeCountDownSpan(remainMinute, remainSeconds) {
        const threeCountdownSpan = document.querySelectorAll('.three-countdown');
        for(const el of threeCountdownSpan) {
            el.innerText = `잔여시간 : 0${remainMinute}:${remainSeconds > 9 ? remainSeconds : `0${remainSeconds}`}`;
        }
    }
}

class View {

    // 오늘 게임 데이터 테이블 표현
    static renderRaceToday(data) {
        const raceData = data;
        const modalWrap = document.querySelector('.md-wrap');
        const fiveGameTurn = Dynamic.calcFiveGameTurn();
        const headLine = document.querySelector('.zombie-race .content-hl');
        const todayTableNode = document.querySelector('.zombie-race > table > tbody');
        let raceTableMarkupText = ``;

        let count = 0;
        if(raceData[0].count <= fiveGameTurn && raceData[0].count !== 288) {
            raceTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${raceData[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;
            count++;
        }

        for(const el of raceData) {
            raceTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win1}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win2}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win3}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win4}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win5}</td>
            </tr>`;
            count++;

            if(window.innerWidth <= 1860) {
                if(count >= 5) {
                    break;
                }
            }
        }

        headLine.innerText = `${nowDate.month}.${nowDate.day} 좀비레이스`;
        todayTableNode.innerHTML = raceTableMarkupText;

        if(modalWrap.dataset.type === 'zombieRace') {
            this.renderRaceModal(data);
        }
    }

    static renderFightToday(data) {
        const fightData = data;
        const fiveGameTurn = Dynamic.calcFiveGameTurn();
        const modalWrap = document.querySelector('.md-wrap');
        const headLine = document.querySelector('.zombie-fight .content-hl');
        const todayTableNode = document.querySelector('.zombie-fight > table > tbody');
        let fightTableMarkupText = ``;

        let count = 0;
        if(fightData[0].count <= fiveGameTurn && fightData[0].count !== 288) {
            fightTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${fightData[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;
            count++;
        }

        for(const el of fightData) {
            fightTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.leftPlayer}</td>
                <td>${el.rightPlayer}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.winner}</td>
                <td>${el.count > fiveGameTurn || el.winner === '준비중' ? '준비중' : el.KO ? 'KO승' : '판정승'}</td>
            </tr>`;
            count++;
            
            if(window.innerWidth <= 1860) {
                if(count >= 5) {
                    break;
                }
            }
            
        }

        headLine.innerText = `${nowDate.month}.${nowDate.day} 좀비격투`;
        todayTableNode.innerHTML = fightTableMarkupText;

        if(modalWrap.dataset.type === 'zombieFight') {
            this.renderFightModal(data);
        }
    }

    static renderBreakToday(data) {
        const breakData = data;
        const modalWrap = document.querySelector('.md-wrap');
        const threeGameTurn = Dynamic.calcThreeGameTurn();
        const headLine = document.querySelector('.zombie-break .content-hl');
        const todayTableNode = document.querySelector('.zombie-break > table > tbody');
        let breakTableMarkupText = ``;

        let count = 0;
        if(breakData[0].count <= threeGameTurn && breakData[0].count !== 480) {
            breakTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${breakData[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;

            count++;
        }

        for(const el of breakData) {
            breakTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.leftPlayer}</td>
                <td>${el.count > threeGameTurn ? '준비중' : el.leftBroken}</td>
                <td>${el.rightPlayer}</td>
                <td>${el.count > threeGameTurn ? '준비중' : el.rightBroken}</td>
                <td>${el.count > threeGameTurn ? '준비중' : el.winner}</td>
            </tr>`;

            count++;

            if(window.innerWidth <= 1860) {
                if(count >= 5) {
                    break;
                }
            }
        }

        headLine.innerText = `${nowDate.month}.${nowDate.day} 좀비격파`;
        todayTableNode.innerHTML = breakTableMarkupText;

        if(modalWrap.dataset.type === 'zombieBreak') {
            this.renderBreakModal(data);
        }
    }

    static renderDropToday(data) {
        const dropData = data;
        const modalWrap = document.querySelector('.md-wrap');
        const fiveGameTurn = Dynamic.calcFiveGameTurn();
        const headLine = document.querySelector('.zombie-drop .content-hl');
        const todayTableNode = document.querySelector('.zombie-drop > table > tbody');
        let dropTableMarkupText = ``;

        let count = 0;
        if(dropData[0].count <= fiveGameTurn && dropData[0].count !== 288) {
            dropTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${dropData[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;

            count++;
        }

        for(const el of dropData) {
            dropTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[0]}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[1]}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[2]}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[3]}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[4]}</td>
            </tr>`;

            count++;

            if(window.innerWidth <= 1860) {
                if(count >= 5) {
                    break;
                }
            }
        }

        headLine.innerText = `${nowDate.month}.${nowDate.day} 좀비낙하`;
        todayTableNode.innerHTML = dropTableMarkupText;

        if(modalWrap.dataset.type === 'zombieDrop') {
            this.renderDropModal(data);
        }
    }

    // 오늘 게임 데이터 모달 테이블 표현
    static renderRaceModal(data) {
        const raceData = data;
        const fiveGameTurn = Dynamic.calcFiveGameTurn();
        let raceTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th>1등</th>
                <th>2등</th>
                <th>3등</th>
                <th>4등</th>
                <th>5등</th>
            </tr>
        </thead>`;

        if(raceData[0].count <= fiveGameTurn) {
            raceTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${raceData[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;
        }

        for(const el of raceData) {
            raceTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win1}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win2}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win3}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win4}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.win5}</td>
            </tr>`;
        }

        const modalTable = document.querySelector('.md-wrap table');
        const modalHeadLine = document.querySelector('.md-wrap .content-hl');

        document.querySelector('.md-wrap .five-countdown').style.display = 'block';
        document.querySelector('.md-wrap .three-countdown').style.display = 'none';
    

        modalHeadLine.innerText = `${nowDate.month}.${nowDate.day} 좀비레이스`;
        modalTable.innerHTML = raceTableMarkupText;
    }

    static renderFightModal(data) {
        const fightData = data;
        const fiveGameTurn = Dynamic.calcFiveGameTurn();
        let fightTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th>좌측</th>
                <th>우측</th>
                <th>승자</th>
                <th>KO여부</th>
            </tr>
        </thead>`;

        if(fightData[0].count <= fiveGameTurn) {
            fightTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${fightData[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;
        }

        for(const el of fightData) {
            fightTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.leftPlayer}</td>
                <td>${el.rightPlayer}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.winner}</td>
                <td>${el.count > fiveGameTurn || el.winner === '준비중' ? '준비중' : el.KO ? 'KO승' : '판정승'}</td>
            </tr>`;
        }

        const modalTable = document.querySelector('.md-wrap table');
        const modalHeadLine = document.querySelector('.md-wrap .content-hl');

        document.querySelector('.md-wrap .five-countdown').style.display = 'block';
        document.querySelector('.md-wrap .three-countdown').style.display = 'none';

        modalHeadLine.innerText = `${nowDate.month}.${nowDate.day} 좀비격투`;
        modalTable.innerHTML = fightTableMarkupText;
    }

    static renderBreakModal(data) {
        const breakData = data;
        const threeGameTurn = Dynamic.calcThreeGameTurn();
        let breakTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th>좌측</th>
                <th>격파수</th>
                <th>우측</th>
                <th>격파수</th>
                <th>승자</th>
            </tr>
        </thead>`;

        if(breakData[0].count <= threeGameTurn) {
            breakTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${breakData[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;
        }

        for(const el of breakData) {
            breakTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.leftPlayer}</td>
                <td>${el.count > threeGameTurn ? '준비중' : el.leftBroken}</td>
                <td>${el.rightPlayer}</td>
                <td>${el.count > threeGameTurn ? '준비중' : el.rightBroken}</td>
                <td>${el.count > threeGameTurn ? '준비중' : el.winner}</td>
            </tr>`;
        }
        
        const modalTable = document.querySelector('.md-wrap table');
        const modalHeadLine = document.querySelector('.md-wrap .content-hl');

        document.querySelector('.md-wrap .five-countdown').style.display = 'none';
        document.querySelector('.md-wrap .three-countdown').style.display = 'block';
        modalHeadLine.innerText = `${nowDate.month}.${nowDate.day} 좀비격파`;
        modalTable.innerHTML = breakTableMarkupText;
    }

    static renderDropModal(data) {
        const dropData = data;
        const fiveGameTurn = Dynamic.calcFiveGameTurn();
        let dropTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th colspan="5">당첨번호</th>
            </tr>
        </thead>`;

        if(dropData[0].count <= fiveGameTurn) {
            dropTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${dropData[0].count+1}</th>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
                <td>준비중</td>
            </tr>`;
        }

        for(const el of dropData) {
            dropTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[0]}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[1]}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[2]}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[3]}</td>
                <td>${el.count > fiveGameTurn ? '준비중' : el.result[4]}</td>
            </tr>`;
        }

        const modalTable = document.querySelector('.md-wrap table');
        const modalHeadLine = document.querySelector('.md-wrap .content-hl');

        document.querySelector('.md-wrap .five-countdown').style.display = 'block';
        document.querySelector('.md-wrap .three-countdown').style.display = 'none';

        modalHeadLine.innerText = `${nowDate.month}.${nowDate.day} 좀비낙하`;
        modalTable.innerHTML = dropTableMarkupText;
    }

    // 어제 데이터 테이블 표현
    static renderRaceYesterday(data) {

        const raceData = data;
        const headLine = document.querySelector('.md-wrap .content-hl');
        const yesterdayTableNode = document.querySelector('.md-wrap table');
        let raceTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th>1등</th>
                <th>2등</th>
                <th>3등</th>
                <th>4등</th>
                <th>5등</th>
            </tr>
        </thead>`;

        for(const el of raceData) {
            raceTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.win1}</td>
                <td>${el.win2}</td>
                <td>${el.win3}</td>
                <td>${el.win4}</td>
                <td>${el.win5}</td>
            </tr>`;
        }

        headLine.innerText = `${prevDate.month}.${prevDate.day} 좀비레이스`;
        yesterdayTableNode.innerHTML = raceTableMarkupText;

        this.setmodalWrapHeight();
    }

    static renderFightYesterday(data) {
        const fightData = data;
        const headLine = document.querySelector('.md-wrap .content-hl');
        const yesterdayTableNode = document.querySelector('.md-wrap table');
        let fightTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th>좌측</th>
                <th>우측</th>
                <th>승자</th>
                <th>KO여부</th>
            </tr>
        </thead>`;

        for(const el of fightData) {
            fightTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.leftPlayer}</td>
                <td>${el.rightPlayer}</td>
                <td>${el.winner}</td>
                <td>${el.KO ? 'KO승' : '판정승'}</td>
            </tr>`;
        }

        headLine.innerText = `${prevDate.month}.${prevDate.day} 좀비격투`;
        yesterdayTableNode.innerHTML = fightTableMarkupText;

        this.setmodalWrapHeight();
    }

    static renderBreakYesterday(data) {
        const breakData = data;
        const headLine = document.querySelector('.md-wrap .content-hl');
        const yesterdayTableNode = document.querySelector('.md-wrap table');
        let breakTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th>좌측</th>
                <th>격파수</th>
                <th>우측</th>
                <th>격파수</th>
                <th>승자</th>
            </tr>
        </thead>`;

        for(const el of breakData) {
            breakTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.leftPlayer}</td>
                <td>${el.leftBroken}</td>
                <td>${el.rightPlayer}</td>
                <td>${el.rightBroken}</td>
                <td>${el.winner}</td>
            </tr>`;
        }

        headLine.innerText = `${prevDate.month}.${prevDate.day} 좀비격파`;
        yesterdayTableNode.innerHTML = breakTableMarkupText;

        this.setmodalWrapHeight();
    }

    static renderDropYesterday(data) {
        const dropData = data;
        const headLine = document.querySelector('.md-wrap .content-hl');
        const yesterdayTableNode = document.querySelector('.md-wrap table');

        let dropTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th colspan="5">당첨번호</th>
            </tr>
        </thead>`;

        for(const el of dropData) {
            dropTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${el.count}</th>
                <td>${el.result[0]}</td>
                <td>${el.result[1]}</td>
                <td>${el.result[2]}</td>
                <td>${el.result[3]}</td>
                <td>${el.result[4]}</td>
            </tr>`;
        }

        headLine.innerText = `${prevDate.month}.${prevDate.day} 좀비낙하`;
        yesterdayTableNode.innerHTML = dropTableMarkupText;
        this.setmodalWrapHeight();
    }

    // modal 크기가 main height와 일치하도록 변경
    static setmodalWrapHeight() {
        const modalTable = document.querySelector('.md-tb');
        const modalWrap = document.querySelector('.md-wrap');
        const main = document.querySelector('main');
        main.offsetHeight > modalTable.clientHeight ? modalWrap.style.height = main.offsetHeight + 'px' : modalWrap.style.height = 'auto';
    }

    static viewAlert(msg) {
        alert(msg);
    }
}

export { CountdownView, View };