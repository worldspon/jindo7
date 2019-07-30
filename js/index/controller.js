import { Logic, currentDate, EventLogic } from './model.js';
import { View } from './view.js';

class Init {

    // 광고수익금 비동기통신 호출
    static adProfitSection() {
        Logic.adProfitData();
    }

    // 공지사항 비동기통신 호출
    static noticeSection() {
        Logic.noticeData();
    }

    // FAQ 비동기통신 호출
    static faqSection() {
        Logic.faqData();
    }

    // GAME 비동기통신 호출
    static gameSection() {
        Logic.gameData();
    }

    // 유저 BLOCK 유무 비동기통신 호출
    static userBlockInfo() {
        Logic.userBlockInfoData();
    }
}

class Dynamic {

    // 비동기 완료시 상단 광고수익 데이터 표시
    static adProfitTextRender(data) {
        View.renderMonth(currentDate);
        View.renderAdprofitText(data);
    }

    // 비동기 완료시 광고수익 차트 데이터 표시
    static adProfitChartRender(data) {
        Logic.createChartTag();
        View.renderAdprofitChart(data);
        EventList.bindChartResizeEvent();
    }

    // 비동기 완료시 공지사항 데이터 표시
    static noticeRender(data) {
        View.renderNotice(data);
    }

    // 비동기 완료시 FAQ 데이터 표시
    static faqRender(data) {
        View.renderFaq(data);
    }

    // 비동기 완료시 game 데이터 표시
    static gameRender(data) {
        View.raceTableRender(currentDate, data.race);
        View.fightTableRender(currentDate, data.fight);
        View.breakTableRender(currentDate, data.break);
        View.dropTableRender(currentDate, data.drop);
    }

    // BLOCK MODAL VIEW 함수 호출
    static renderBlockInfoModal(data) {
        View.renderBlockInfoModal(data);
    }

    // error catch -> alret view 호출
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {

    // 완성된 CHART 객체에 RESIZE 이벤트 추가
    static bindChartResizeEvent() {
        window.addEventListener('resize', EventLogic.chartResize);
    }

    // BLOCK MODAL BACKGROUND RESIZE EVENT BIND
    static bindModalHeightResizeEvent() {
        window.addEventListener('resize', EventLogic.modalHeightResize);
    }

    // BLOCK MODAL PAUSE EVENT BIND
    static bindPauseBlockModalEvent() {
        const pauseButton = document.querySelector('.pause-modal');

        pauseButton.addEventListener('click', EventLogic.pauseBlockModal);
    }
    
    // BLOCK MODAL CLOSE EVENT BIND
    static bindCloseModalEvent() {
        const closeButton = document.querySelector('.close-modal');

        closeButton.addEventListener('click', EventLogic.closeModal);
    }
}

export { Init, Dynamic, EventList };