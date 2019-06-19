import { Timer, Handler, EventLogic } from './model.js';
import { CountdownView, View } from './view.js';

class Init {
    // 현재 접속 기기 판단
    static confirmViewDevice() {
        Handler.setViewDevice();
    }

    // 5분 타이머 계산 함수 호출
    static setFiveCountDown() {
        const {minute, second, millisecond} = Timer.calcRemainNextFiveCount();

        // 5분 타이머 시작
        CountdownView.setFiveCountDownSpan(minute, second);
        setTimeout(()=>{
            Timer.cycleFiveCountdown(minute, second);
        }, millisecond+1000);
    }

    // 3분 타이머 계산 함수 호출
    static setThreeCountDown() {
        const {minute, second, millisecond} = Timer.calcRemainNextThreeCount();

        // 3분 타이머 시작
        CountdownView.setThreeCountDownSpan(minute, second);
        setTimeout(()=>{
            Timer.cycleThreeCountdown(minute, second);
        }, millisecond+1000);
    }

    // 첫 접속시 데이터 통신
    static firstCommunication() {
        Handler.getData('zombieRace', 'today');
        Handler.getData('zombieFight', 'today');
        Handler.getData('zombieBreak', 'today');
        Handler.getData('zombieDrop', 'today');
    }

    // 이벤트 리스트 바인딩
    static bindEvent() {
        EventList.bindResizeEvent();
        EventList.bindShowMoreClickEvent();
        EventList.bindShowPrevClickEvent();
        EventList.bindCloseClickEvent();
        EventList.bindEscKeyEvent();
    }

    // 어제 데이터 통신
    static getYesterdayData() {
        Handler.getData('zombieRace', 'yesterday');
        Handler.getData('zombieFight', 'yesterday');
        Handler.getData('zombieBreak', 'yesterday');
        Handler.getData('zombieDrop', 'yesterday');
    }
}

class Dynamic {
    static changeFiveCountDown(minute, second) {
        CountdownView.setFiveCountDownSpan(minute, second);
    }

    static changeThreeCountDown(minute, second) {
        CountdownView.setThreeCountDownSpan(minute, second);
    }

    // 현재 5분 게임 턴수 계산 함수 호출
    static calcFiveGameTurn() {
        return Timer.getFiveGameTurn();
    }

    // 현재 3분 게임 턴수 계산 함수 호출
    static calcThreeGameTurn() {
        return Timer.getThreeGameTurn();
    }

    // 테이블 생성
    static createRaceTable(data, date) {
        if(date === 'today') {
            View.renderRaceToday(data);
        } else {
            View.renderRaceYesterday(data);
        }
    }

    static createFightTable(data, date) {
        if(date === 'today') {
            View.renderFightToday(data);
        } else {
            View.renderFightYesterday(data);
        }
    }

    static createBreakTable(data, date) {
        if(date === 'today') {
            View.renderBreakToday(data);
        } else {
            View.renderBreakYesterday(data);
        }
    }

    static createDropTable(data, date) {
        if(date === 'today') {
            View.renderDropToday(data);
        } else {
            View.renderDropYesterday(data);
        }
    }

    // 모달 테이블 생성
    static createRaceModal(data) {
        View.renderRaceModal(data);
    }

    static createFightModal(data) {
        View.renderFightModal(data);
    }

    static createBreakModal(data) {
        View.renderBreakModal(data);
    }

    static createDropModal(data) {
        View.renderDropModal(data);
    }

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindResizeEvent() {
        window.addEventListener('resize', EventLogic.resizeEvent);
    }

    static bindShowMoreClickEvent() {
        for(const moreButton of document.getElementsByClassName('btn-today')) {
            moreButton.addEventListener('click', EventLogic.showMoreEvent)
        }
    }

    static bindShowPrevClickEvent() {
        for(const yesterdayResultButton of document.getElementsByClassName('btn-prev')) {
            yesterdayResultButton.addEventListener('click', EventLogic.showPrevEvent);
        }  
    }

    static bindCloseClickEvent() {
        document.querySelector('.md-close-btn').addEventListener('click', EventLogic.closeEvent)
    }

    static bindEscKeyEvent() {
        window.addEventListener('keydown', EventLogic.escEvent)
    }
}

export { Init, Dynamic };