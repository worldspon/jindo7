'use strict';

const todayResult = {
    zombieRace : '',
    zombieFight : '',
    zombieBreak : '',
    zombieDrop : ''
}

const yesterdayResult = {
    zombieRace : '',
    zombieFight : '',
    zombieBreak : '',
    zombieDrop : ''
}

 // Model Class
class gameData {
    constructor(data) {
        return JSON.parse(data);
    }
}

class Communication {
    static asyncGetTableData(url) {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }
}


// Timer Class
class Timer {

    static getNowMonthAndDay() {
        const month = new Date().getMonth()+1;
        const day = new Date().getDate();

        return `${month >= 10 ? month : `0${month}`}.${day >= 10 ? day : `0${day}`}`;
    }

    static getYesterdayMonthAndDay() {
        const month = new Date().getMonth()+1;
        const day = new Date().getDate()-1;

        return `${month >= 10 ? month : `0${month}`}.${day >= 10 ? day : `0${day}`}`;
    }

    static setFiveCountdown(remainMinute, remainSeconds) {
        if(remainMinute >= 0 && remainSeconds > 0) {
            View.setFiveCountdownSpan(remainMinute, remainSeconds-1);
            setTimeout(()=>{
                this.setFiveCountdown(remainMinute, remainSeconds-1);
            }, 1000);
        } else if(remainMinute > 0 && remainSeconds <= 0) {
            View.setFiveCountdownSpan(remainMinute-1, 59);
            setTimeout(()=>{
                this.setFiveCountdown(remainMinute-1, 59);
            }, 1000);
        } else {
            View.setFiveCountdownSpan(4, 59);
            Handler.getData('zombieRace', 'today');
            Handler.getData('zombieFight', 'today');
            Handler.getData('zombieDrop', 'today');
            setTimeout(()=>{
                this.setFiveCountdown(4, 59);
            }, 1000);
        }
    }

    static setThreeCountdown(remainMinute, remainSeconds) {
        if(remainMinute >= 0 && remainSeconds > 0) {
            View.setThreeCountdownSpan(remainMinute, remainSeconds-1);
            setTimeout(()=>{
                this.setThreeCountdown(remainMinute, remainSeconds-1);
            }, 1000);
        } else if(remainMinute > 0 && remainSeconds <= 0) {
            View.setThreeCountdownSpan(remainMinute-1, 59);
            setTimeout(()=>{
                this.setThreeCountdown(remainMinute-1, 59);
            }, 1000);
        } else {
            View.setThreeCountdownSpan(2, 59);
            Handler.getData('zombieBreak', 'today');
            setTimeout(()=>{
                this.setThreeCountdown(2, 59);
            }, 1000);
        }
    }

    static calcRemainNextFiveCount() {
        const passTimeByMidnight = this.passTimeByMidnight();
        const fiveMinuteMilliSeconds = 300000;
        const oneMinuteMilliSeconds = 60000;
        const oneSecondsMilleSeconds = 1000;

        const remainTimeNextFiveCount = fiveMinuteMilliSeconds - (passTimeByMidnight % fiveMinuteMilliSeconds);
        const remainMinuteNextFiveCount = Math.floor(remainTimeNextFiveCount / oneMinuteMilliSeconds);
        const remainSecondsNextFiveCount = Math.floor((remainTimeNextFiveCount % oneMinuteMilliSeconds) / oneSecondsMilleSeconds);
        const remainMilliSecondsNextFiveCount = (remainTimeNextFiveCount % oneMinuteMilliSeconds) % oneSecondsMilleSeconds;

        View.setFiveCountdownSpan(remainMinuteNextFiveCount, remainSecondsNextFiveCount);

        setTimeout(()=>{
            this.setFiveCountdown(remainMinuteNextFiveCount, remainSecondsNextFiveCount);
        }, remainMilliSecondsNextFiveCount+1000);
    }

    static calcRemainNextThreeCount() {
        const passTimeByMidnight = this.passTimeByMidnight();
        const threeMinuteMilliSeconds = 180000;
        const oneMinuteMilliSeconds = 60000;
        const oneSecondsMilleSeconds = 1000;

        const remainTimeNextThreeCount = threeMinuteMilliSeconds - (passTimeByMidnight % threeMinuteMilliSeconds);
        const remainMinuteNextThreeCount = Math.floor(remainTimeNextThreeCount / oneMinuteMilliSeconds);
        const remainSecondsNextThreeCount = Math.floor((remainTimeNextThreeCount % oneMinuteMilliSeconds) / oneSecondsMilleSeconds);
        const remainMilliSecondsNextThreeCount = (remainTimeNextThreeCount % oneMinuteMilliSeconds) % oneSecondsMilleSeconds;

        View.setThreeCountdownSpan(remainMinuteNextThreeCount, remainSecondsNextThreeCount);

        setTimeout(()=>{
            this.setThreeCountdown(remainMinuteNextThreeCount, remainSecondsNextThreeCount);
        }, remainMilliSecondsNextThreeCount+1000);
    }

    static midnightTime() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const date = new Date().getDate();
        const midnightTime = new Date(year, month, date, '0', '0', '0', '0').getTime();

        return midnightTime;
    }

    static passTimeByMidnight() {
        const userContactTime = new Date().getTime();
        const todayMidnightTime = this.midnightTime();

        return userContactTime - todayMidnightTime;
    }
}

class Handler {
    
    static getData(gameType, date) {
        const data = Communication.asyncGetTableData(`http://192.168.0.24:8080/game/${gameType}/${date}`);
        data.then((data)=>{
            if(gameType === 'zombieRace') {
                date === 'today' ? View.createRaceTable(new gameData(data)) : View.createRaceYesterdayTable(new gameData(data));
            } else if(gameType === 'zombieBreak') {
                date === 'today' ? View.createBreakTable(new gameData(data)) : View.createBreakYesterdayTable(new gameData(data));
            } else if(gameType === 'zombieFight') {
                date === 'today' ? View.createFightTable(new gameData(data)) : View.createFightYesterdayTable(new gameData(data));
            } else {
                date === 'today' ? View.createDropTable(new gameData(data)) : View.createDropYesterdayTable(new gameData(data));
            }
        }, () => {
            alert('err!');
        })
    }

    static setAllTodayGameTable() {
        this.getData('zombieRace', 'today');
        this.getData('zombieFight', 'today');
        this.getData('zombieBreak', 'today');
        this.getData('zombieDrop', 'today');
    }
}


// View Class
class View {
    static setFiveCountdownSpan(remainMinute, remainSeconds) {
        const fiveCountdownSpan = document.querySelectorAll('.five-countdown');
        for(const el of fiveCountdownSpan) {
            el.innerText = `잔여시간 : 0${remainMinute}:${remainSeconds > 9 ? remainSeconds : `0${remainSeconds}`}`;
        }
    }

    static setThreeCountdownSpan(remainMinute, remainSeconds) {
        const threeCountdownSpan = document.querySelectorAll('.three-countdown');
        for(const el of threeCountdownSpan) {
            el.innerText = `잔여시간 : 0${remainMinute}:${remainSeconds > 9 ? remainSeconds : `0${remainSeconds}`}`;
        }
    }

    static createRaceTable(data) {
        const raceData = data.zombieRace;
        todayResult.zombieRace = data.zombieRace;
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const fiveMinuteMilliSeconds = 300000;
        const fiveGameTurn = Math.floor(passTimeByMidnight / fiveMinuteMilliSeconds);
        const modalWrap = document.querySelector('.md-wrap');
        const headLine = document.querySelector('.zombie-race .content-hl');
        const todayTableNode = document.querySelector('.zombie-race > table > tbody');
        let raceTableMarkupText = ``;

        let count = 0;
        if(raceData.length <= fiveGameTurn) {
            raceTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${raceData.length+1}</th>
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

        headLine.innerText = `${Timer.getNowMonthAndDay()} 좀비레이스`;
        todayTableNode.innerHTML = raceTableMarkupText;
        if(modalWrap.dataset.type === 'zombieRace') {
            this.createRaceModalTable(data);
        }
    }

    static createFightTable(data) {
        const fightData = data.zombieFight;
        todayResult.zombieFight = data.zombieFight;
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const fiveMinuteMilliSeconds = 300000;
        const fiveGameTurn = Math.floor(passTimeByMidnight / fiveMinuteMilliSeconds);
        const modalWrap = document.querySelector('.md-wrap');
        const headLine = document.querySelector('.zombie-fight .content-hl');
        const todayTableNode = document.querySelector('.zombie-fight > table > tbody');
        let fightTableMarkupText = ``;

        let count = 0;
        if(fightData.length <= fiveGameTurn) {
            fightTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${fightData.length+1}</th>
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

        headLine.innerText = `${Timer.getNowMonthAndDay()} 좀비격투`;
        todayTableNode.innerHTML = fightTableMarkupText;
        if(modalWrap.dataset.type === 'zombieFight') {
            this.createFightModalTable(data);
        }
    }

    static createBreakTable(data) {
        const breakData = data.zombieBreak;
        todayResult.zombieBreak = data.zombieBreak;
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const threeMinuteMilliSeconds = 180000;
        const threeGameTurn = Math.floor(passTimeByMidnight / threeMinuteMilliSeconds);
        const modalWrap = document.querySelector('.md-wrap');
        const headLine = document.querySelector('.zombie-break .content-hl');
        const todayTableNode = document.querySelector('.zombie-break > table > tbody');
        let breakTableMarkupText = ``;

        let count = 0;
        if(breakData.length <= threeGameTurn) {
            breakTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${breakData.length+1}</th>
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

        headLine.innerText = `${Timer.getNowMonthAndDay()} 좀비격파`;
        todayTableNode.innerHTML = breakTableMarkupText;

        if(modalWrap.dataset.type === 'zombieBreak') {
            this.createBreakModalTable(data);
        }
    }

    static createDropTable(data) {
        const dropData = data.zombieDrop;
        todayResult.zombieDrop = data.zombieDrop;
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const fiveMinuteMilliSeconds = 300000;
        const fiveGameTurn = Math.floor(passTimeByMidnight / fiveMinuteMilliSeconds);
        const modalWrap = document.querySelector('.md-wrap');
        const headLine = document.querySelector('.zombie-drop .content-hl');
        const todayTableNode = document.querySelector('.zombie-drop > table > tbody');
        let dropTableMarkupText = ``;

        let count = 0;
        if(dropData.length <= fiveGameTurn) {
            dropTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${dropData.length+1}</th>
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

        headLine.innerText = `${Timer.getNowMonthAndDay()} 좀비낙하`;
        todayTableNode.innerHTML = dropTableMarkupText;

        if(modalWrap.dataset.type === 'zombieDrop') {
            this.createDropModalTable(data);
        }
    }

    static createRaceModalTable(data) {
        const raceData = data.zombieRace;
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const fiveMinuteMilliSeconds = 300000;
        const fiveGameTurn = Math.floor(passTimeByMidnight / fiveMinuteMilliSeconds);
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

        if(raceData.length <= fiveGameTurn) {
            raceTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${raceData.length+1}</th>
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
    

        modalHeadLine.innerText = `${Timer.getNowMonthAndDay()} 좀비레이스`;
        modalTable.innerHTML = raceTableMarkupText;
    }

    static createFightModalTable(data) {
        const fightData = data.zombieFight;
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const fiveMinuteMilliSeconds = 300000;
        const fiveGameTurn = Math.floor(passTimeByMidnight / fiveMinuteMilliSeconds);
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

        if(fightData.length <= fiveGameTurn) {
            fightTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${fightData.length+1}</th>
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

        modalHeadLine.innerText = `${Timer.getNowMonthAndDay()} 좀비격투`;
        modalTable.innerHTML = fightTableMarkupText;
    }

    static createBreakModalTable(data) {
        const breakData = data.zombieBreak;
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const threeMinuteMilliSeconds = 180000;
        const threeGameTurn = Math.floor(passTimeByMidnight / threeMinuteMilliSeconds);
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

        if(breakData.length <= threeGameTurn) {
            breakTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${breakData.length+1}</th>
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
        modalHeadLine.innerText = `${Timer.getNowMonthAndDay()} 좀비격파`;
        modalTable.innerHTML = breakTableMarkupText;
    }

    static createDropModalTable(data) {
        console.log('ghcnf');
        const dropData = data.zombieDrop;
        console.log(dropData);
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const fiveMinuteMilliSeconds = 300000;
        const fiveGameTurn = Math.floor(passTimeByMidnight / fiveMinuteMilliSeconds);
        let dropTableMarkupText = 
        `<thead>
            <tr class="th-row row">
                <th class="first-tab">회차</th>
                <th colspan="5">당첨번호</th>
            </tr>
        </thead>`;

        if(dropData.length <= fiveGameTurn) {
            dropTableMarkupText +=
            `<tr class="tb-row row">
                <th class="first-tab">${dropData.length+1}</th>
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

        modalHeadLine.innerText = `${Timer.getNowMonthAndDay()} 좀비낙하`;
        modalTable.innerHTML = dropTableMarkupText;
    }

    static createRaceYesterdayTable(data) {

        const raceData = data.zombieRace;
        yesterdayResult.zombieRace = raceData;
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

        headLine.innerText = `${Timer.getYesterdayMonthAndDay()} 좀비레이스`;
        yesterdayTableNode.innerHTML = raceTableMarkupText;

        this.setmodalWrapHeight();
    }

    static createFightYesterdayTable(data) {
        const fightData = data.zombieFight;
        yesterdayResult.zombieFight = fightData;
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

        headLine.innerText = `${Timer.getYesterdayMonthAndDay()} 좀비격투`;
        yesterdayTableNode.innerHTML = fightTableMarkupText;

        this.setmodalWrapHeight();
    }

    static createBreakYesterdayTable(data) {
        const breakData = data.zombieBreak;
        yesterdayResult.zombieBreak = breakData;
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

        headLine.innerText = `${Timer.getYesterdayMonthAndDay()} 좀비격파`;
        yesterdayTableNode.innerHTML = breakTableMarkupText;

        this.setmodalWrapHeight();
    }

    static createDropYesterdayTable(data) {
        const dropData = data.zombieDrop;
        yesterdayResult.zombieDrop = dropData;
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

        headLine.innerText = `${Timer.getYesterdayMonthAndDay()} 좀비낙하`;
        yesterdayTableNode.innerHTML = dropTableMarkupText;
        this.setmodalWrapHeight();
    }

    static setmodalWrapHeight() {
        const modalWrap = document.querySelector('.md-wrap');
        const main = document.querySelector('main');
        main.offsetHeight > modalWrap.offsetHeight ? modalWrap.style.height = main.offsetHeight + 'px' : modalWrap.style.height = 'auto';
    }
}

Timer.getNowMonthAndDay();
Timer.calcRemainNextFiveCount();
Timer.calcRemainNextThreeCount();
Handler.setAllTodayGameTable();


window.addEventListener('resize', () => {
    View.createRaceTable(todayResult);
    View.createFightTable(todayResult);
    View.createBreakTable(todayResult);
    View.createDropTable(todayResult);
})

// 더보기 버튼
for(const moreButton of document.getElementsByClassName('btn-today')) {
    moreButton.addEventListener('click', (el) => {
        const modalWrap = document.querySelector('.md-wrap');
        const gameType = el.target.dataset.type;
        document.querySelector('.md-wrap').style.display = 'block';
        modalWrap.dataset.type = gameType;

        if(todayResult[gameType] === '') {
            Handler.getData(gameType, 'today')    
        } else if(gameType === 'zombieRace') {
            View.createRaceModalTable(todayResult, el.target);
        } else if(gameType === 'zombieBreak') {
            View.createBreakModalTable(todayResult, el.target);
        } else if(gameType === 'zombieFight') {
            View.createFightModalTable(todayResult, el.target);
        } else {
            View.createDropModalTable(todayResult, el.target);
        }
    })
}


// 어제결과 모달 생성 버튼
for(const yesterdayResultButton of document.getElementsByClassName('btn-prev')) {

    yesterdayResultButton.addEventListener('click', () => {
        const gameType = yesterdayResultButton.dataset.type;
        document.querySelector('.md-wrap').style.display = 'block';
        if(yesterdayResult[gameType] === '') {
            Handler.getData(gameType, 'yesterday')    
        } else if(gameType === 'zombieRace') {
            View.createRaceYesterdayTable(yesterdayResult);
        } else if(gameType === 'zombieBreak') {
            View.createBreakYesterdayTable(yesterdayResult);
        } else if(gameType === 'zombieFight') {
            View.createFightYesterdayTable(yesterdayResult);
        } else {
            View.createDropYesterdayTable(yesterdayResult);
        }
    })

}

// x버튼 클릭시 modal 초기화 후 꺼짐
document.querySelector('.md-close-btn').addEventListener('click', (el)=>{
    document.querySelector('.md-wrap table').innerHTML = '';
    document.querySelector('.md-wrap').style.display = 'none';
    document.querySelector('.md-wrap .five-countdown').style.display = 'none';
    document.querySelector('.md-wrap .three-countdown').style.display = 'none';
    el.target.parentNode.parentNode.parentNode.dataset.type = '';
});


// ESC 버튼 클릭시 모달 닫음
window.addEventListener('keydown', (el) => {
    if(el.keyCode === 27) {
        document.querySelector('.md-close-btn').dispatchEvent(new Event('click'));
    }
})