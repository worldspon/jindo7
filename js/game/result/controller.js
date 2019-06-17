import { Timer, Handler } from './model.js';
import { CountdownView, View } from './view.js';

class Init {
    // 현재 접속 기기 판단
    static confirmViewDevice() {
        Handler.setViewDevice();
    }

    // 5분 타이머 계산 함수 호출
    static setFiveMinuteTimer() {
        const {minute, second, millisecond} = Timer.calcRemainNextFiveCount();

        // 5분 타이머 시작
        CountdownView.setFiveCountdownSpan(minute, second);
        setTimeout(()=>{
            CountdownView.setFiveCountdown(minute, second);
        }, millisecond+1000);
    }

    // 3분 타이머 계산 함수 호출
    static setThreeMinuteTimer() {
        const {minute, second, millisecond} = Timer.calcRemainNextThreeCount();

        // 3분 타이머 시작
        CountdownView.setThreeCountdownSpan(minute, second);
        setTimeout(()=>{
            CountdownView.setThreeCountdown(minute, second);
        }, millisecond+1000);
    }

    // 현재 5분 게임 턴수 계산 함수 호출
    static calcFiveGameTurn() {
        return Timer.getFiveGameTurn();
    }

    // 현재 3분 게임 턴수 계산 함수 호출
    static calcThreeGameTurn() {
        return Timer.getThreeGameTurn();
    }

    // 오늘 데이터 통신
    static getRaceData() {
        Handler.getData('zombieRace', 'today');
    }

    static getFightData() {
        Handler.getData('zombieFight', 'today');
    }

    static getBreakData() {
        Handler.getData('zombieBreak', 'today');
    }

    static getDropData() {
        Handler.getData('zombieDrop', 'today');
    }

    // 어제 데이터 통신
    static getYesterdayData() {
        Handler.getData('zombieRace', 'yesterday');
        Handler.getData('zombieFight', 'yesterday');
        Handler.getData('zombieBreak', 'yesterday');
        Handler.getData('zombieDrop', 'yesterday');
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

    // event binding
    static bindEvent() {
        Handler.bindResizeEvent();
        Handler.showMoreEvent();
        Handler.showPrevEvent();
        Handler.closeEvent();
        Handler.escEvent();
    }

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

export { Init };