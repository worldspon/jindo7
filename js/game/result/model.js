import { Dynamic } from "./controller.js";

const promiseResultValue = {resolveCount : 0, rejectCount : 0};

// promise 결과를 저장 -> reject가 하나라도 있으면
// 모든 통신이 끝나고 alert 표현
const promiseProxy = new Proxy(promiseResultValue, {

    set(el, result, count) {

        el[result] = count;
        let endPromise = 0;

        for(let resultCount in el) {
            endPromise += el[resultCount];
        }

        if(endPromise >= 8 && el.rejectCount >= 1) {
            setTimeout(()=>{
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            },1000);
        }

        return true;
    }
});

// 타이머 계산을 위한 time model
const timeModel = {
    fiveMinuteMilliSeconds : 300000,
    threeMinuteMilliSeconds : 180000,
    oneMinuteMilliSeconds : 60000,
    oneSecondsMilleSeconds : 1000
}

// 오늘 결과 저장
const todayResult = {
    zombieRace : '',
    zombieFight : '',
    zombieBreak : '',
    zombieDrop : ''
}

// 어제 결과 저장
const yesterdayResult = {
    zombieRace : '',
    zombieFight : '',
    zombieBreak : '',
    zombieDrop : ''
}

// 현재 접속 기기 정보 저장
const viewDevice = {
    value : null
};

class Communication {
    // promise 비동기 통신
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

    // 접속일 자정부터 접속시간까지 흐른 시간 계산
    static passTimeByMidnight() {
        const userContactTime = new Date().getTime();
        const todayMidnightTime = this.midnightTime();

        return userContactTime - todayMidnightTime;
    }

    // 접속일 자정
    static midnightTime() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const date = new Date().getDate();
        const midnightTime = new Date(year, month, date, '0', '0', '0', '0').getTime();

        return midnightTime;
    }

    // 5분 타이머 계산 / 다음 게임까지 남은 분,초,밀리초 리턴
    static calcRemainNextFiveCount() {
        const passTimeByMidnight = this.passTimeByMidnight();
        const remainTimeNextFiveCount = timeModel.fiveMinuteMilliSeconds - (passTimeByMidnight % timeModel.fiveMinuteMilliSeconds);
        const remainMinuteNextFiveCount = Math.floor(remainTimeNextFiveCount / timeModel.oneMinuteMilliSeconds);
        const remainSecondsNextFiveCount = Math.floor((remainTimeNextFiveCount % timeModel.oneMinuteMilliSeconds) / timeModel.oneSecondsMilleSeconds);
        const remainMilliSecondsNextFiveCount = (remainTimeNextFiveCount % timeModel.oneMinuteMilliSeconds) % timeModel.oneSecondsMilleSeconds;

        return {
            minute : remainMinuteNextFiveCount,
            second : remainSecondsNextFiveCount,
            millisecond : remainMilliSecondsNextFiveCount
        };
    }

    static cycleFiveCountdown(remainMinute, remainSeconds) {
        if(remainMinute >= 0 && remainSeconds > 0) {
            Dynamic.changeFiveCountDown(remainMinute, remainSeconds-1);
            setTimeout(()=>{
                this.cycleFiveCountdown(remainMinute, remainSeconds-1);
            }, 1000);
        } else if(remainMinute > 0 && remainSeconds <= 0) {
            Dynamic.changeFiveCountDown(remainMinute-1, 59);
            setTimeout(()=>{
                this.cycleFiveCountdown(remainMinute-1, 59);
            }, 1000);
        } else {
            Dynamic.changeFiveCountDown(4, 59);
            Handler.getData('zombieRace', 'today');
            Handler.getData('zombieFight', 'today');
            Handler.getData('zombieDrop', 'today');

            setTimeout(()=>{
                this.cycleFiveCountdown(4, 59);
            }, 1000);
        }
    }

    // 3분 타이머 계산 / 다음 게임까지 남은 분,초,밀리초 리턴
    static calcRemainNextThreeCount() {
        const passTimeByMidnight = this.passTimeByMidnight();
        const remainTimeNextThreeCount = timeModel.threeMinuteMilliSeconds - (passTimeByMidnight % timeModel.threeMinuteMilliSeconds);
        const remainMinuteNextThreeCount = Math.floor(remainTimeNextThreeCount / timeModel.oneMinuteMilliSeconds);
        const remainSecondsNextThreeCount = Math.floor((remainTimeNextThreeCount % timeModel.oneMinuteMilliSeconds) / timeModel.oneSecondsMilleSeconds);
        const remainMilliSecondsNextThreeCount = (remainTimeNextThreeCount % timeModel.oneMinuteMilliSeconds) % timeModel.oneSecondsMilleSeconds;

        return {
            minute : remainMinuteNextThreeCount,
            second : remainSecondsNextThreeCount,
            millisecond : remainMilliSecondsNextThreeCount
        };
    }
    
    // 3분 타이머 갱신 함수
    static cycleThreeCountdown(remainMinute, remainSeconds) {
        if(remainMinute >= 0 && remainSeconds > 0) {
            Dynamic.changeThreeCountDown(remainMinute, remainSeconds-1);
            setTimeout(()=>{
                this.cycleThreeCountdown(remainMinute, remainSeconds-1);
            }, 1000);
        } else if(remainMinute > 0 && remainSeconds <= 0) {
            Dynamic.changeThreeCountDown(remainMinute-1, 59);
            setTimeout(()=>{
                this.cycleThreeCountdown(remainMinute-1, 59);
            }, 1000);
        } else {
            Dynamic.changeThreeCountDown(2, 59);
            Handler.getData('zombieBreak', 'today');
            setTimeout(()=>{
                this.cycleThreeCountdown(2, 59);
            }, 1000);
        }
    }

    // 현재 5분 게임 턴수 계산
    static getFiveGameTurn() {
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const fiveMinuteMilliSeconds = 300000;
        return Math.floor(passTimeByMidnight / fiveMinuteMilliSeconds);
    }

    // 현재 3분 게임 턴수 계산
    static getThreeGameTurn() {
        const passTimeByMidnight = Timer.passTimeByMidnight();
        const threeMinuteMilliSeconds = 180000;
        return Math.floor(passTimeByMidnight / threeMinuteMilliSeconds);
    }
}

class Handler {
    // window width에 따른 기기 판별
    static setViewDevice() {
        window.innerWidth <= 1860 ? viewDevice.value = 'mobile' : viewDevice.value = 'pc';
    }
    
    // 통신 종료 후 rendering 함수 호출
    static getData(gameType, date) {
        const data = Communication.asyncGetTableData(`http://192.168.0.24:8080/game/${gameType}/${date}`);
        data.then( result => {
            promiseProxy.resolveCount++;
            if(gameType === 'zombieRace') {
                if(date === 'today') {
                    const resultData = JSON.parse(result).zombieRace;
                    todayResult.zombieRace = resultData;
                    Dynamic.createRaceTable(resultData, 'today');
                } else {
                    const resultData = JSON.parse(result).zombieRace;
                    yesterdayResult.zombieRace = resultData;
                }
            } else if(gameType === 'zombieFight') {
                if(date === 'today') {
                    const resultData = JSON.parse(result).zombieFight;
                    todayResult.zombieFight = resultData;
                    Dynamic.createFightTable(resultData, 'today');
                } else {
                    const resultData = JSON.parse(result).zombieFight;
                    yesterdayResult.zombieFight = resultData;
                }
            } else if(gameType === 'zombieBreak') {
                if(date === 'today') {
                    const resultData = JSON.parse(result).zombieBreak;
                    todayResult.zombieBreak = resultData;
                    Dynamic.createBreakTable(resultData, 'today');
                } else {
                    const resultData = JSON.parse(result).zombieBreak
                    yesterdayResult.zombieBreak = resultData;
                }
            } else {
                if(date === 'today') {
                    const resultData = JSON.parse(result).zombieDrop;
                    todayResult.zombieDrop = resultData;
                    Dynamic.createDropTable(resultData, 'today');
                } else {
                    const resultData = JSON.parse(result).zombieDrop
                    yesterdayResult.zombieDrop = resultData;
                }
            }
        }, () => {
            promiseProxy.rejectCount++;
        })
    }
}

class EventLogic {
    static resizeEvent() {
        // resize시 현재 기기 정보와 이전과 다르다면 layout 변경
        window.addEventListener('resize', ()=>{
            if(window.innerWidth <= 1860) {
                if(viewDevice.value === 'pc') {
                    viewDevice.value = 'mobile';
                    Dynamic.createRaceTable(todayResult.zombieRace, 'today');
                    Dynamic.createFightTable(todayResult.zombieFight, 'today');
                    Dynamic.createBreakTable(todayResult.zombieBreak, 'today');
                    Dynamic.createDropTable(todayResult.zombieDrop, 'today');
                }
            } else {
                if(viewDevice.value === 'mobile') {
                    viewDevice.value = 'pc';
                    Dynamic.createRaceTable(todayResult.zombieRace, 'today');
                    Dynamic.createFightTable(todayResult.zombieFight, 'today');
                    Dynamic.createBreakTable(todayResult.zombieBreak, 'today');
                    Dynamic.createDropTable(todayResult.zombieDrop, 'today');
                }
            }
        });
    }

    static showMoreEvent(e) {
        // 더보기 버튼
        const modalWrap = document.querySelector('.md-wrap');
        const gameType = e.target.dataset.type;
        document.querySelector('.md-wrap').style.display = 'block';
        modalWrap.dataset.type = gameType;

        if(gameType === 'zombieRace') {
            Dynamic.createRaceModal(todayResult.zombieRace);
        } else if(gameType === 'zombieFight') {
            Dynamic.createFightModal(todayResult.zombieFight);
        } else if(gameType === 'zombieBreak') {
            Dynamic.createBreakModal(todayResult.zombieBreak);
        } else {
            Dynamic.createDropModal(todayResult.zombieDrop);
        }
    }

    static showPrevEvent(e) {
        const gameType = e.target.dataset.type;
        document.querySelector('.md-wrap').style.display = 'block';

        if(gameType === 'zombieRace') {
            Dynamic.createRaceTable(yesterdayResult.zombieRace, 'yesterday');
        } else if(gameType === 'zombieBreak') {
            Dynamic.createBreakTable(yesterdayResult.zombieBreak, 'yesterday');
        } else if(gameType === 'zombieFight') {
            Dynamic.createFightTable(yesterdayResult.zombieFight, 'yesterday');
        } else {
            Dynamic.createDropTable(yesterdayResult.zombieDrop, 'yesterday');
        }
    }

    static closeEvent(e) {
        // x버튼 클릭시 modal 초기화 후 꺼짐
        document.querySelector('.md-wrap table').innerHTML = '';
        document.querySelector('.md-wrap').style.display = 'none';
        document.querySelector('.md-wrap .five-countdown').style.display = 'none';
        document.querySelector('.md-wrap .three-countdown').style.display = 'none';
        e.target.parentNode.parentNode.parentNode.dataset.type = '';
    }

    static escEvent(e) {
        // ESC 버튼 클릭시 모달 닫음
        if(e.keyCode === 27) {
            document.querySelector('.md-close-btn').dispatchEvent(new Event('click'));
        }
    }
}

export { Timer, Handler, EventLogic };