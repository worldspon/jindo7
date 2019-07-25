import { Logic, currentDate, EventLogic } from './model.js';
import { View } from './view.js';

class Init {

    // 유저 BLOCK 유무 비동기통신 호출
    static userBlockInfo() {
        Logic.userBlockInfoData();
    }

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

    // game 비동기통신 호출
    static gameSection() {
        Logic.gameData();
    }
}

class Dynamic {

    static renderBlockInfoModal(data) {
        View.renderBlockInfoModal(data);
    }
    // 비동기 완료시 상단 광고수익 데이터 표시
    static adProfitTextRender(data) {
        View.renderMonth(currentDate);
        View.renderAdprofitText(data);
    }

    // 비동기 완료시 광고수익 차트 데이터 표시
    static adProfitChartRender(data) {
        Logic.createChartTag();
        const chartObject = View.renderAdprofitChart(data);
        EventList.bindChartResizeEvent(chartObject);
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

    // error catch -> alret view 호출
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {

    static bindChartResizeEvent(chartObject) {
        window.addEventListener('resize', ()=>{
            const chartHeight = Logic.setChartHeight();
            const chartTag = document.getElementById("index-profit-chart");
            chartTag.style.height = chartHeight+'px';
            chartObject.update();
        });
    }

    static bindModalHeightResizeEvent() {
        window.addEventListener('resize', EventLogic.modalHeightResize);
    }

    static bindPauseBlockModalEvent() {
        const pauseButton = document.querySelector('.pause-modal');

        pauseButton.addEventListener('click', EventLogic.pauseBlockModal);
    }

    static bindCloseModalEvent() {
        const closeButton = document.querySelector('.close-modal');

        closeButton.addEventListener('click', EventLogic.closeModal);
    }
}

export { Init, Dynamic, EventList };