import { communicationURL, currentDate, Communication, AdprofitChart, EventLogic } from './model.js';
import { ErrorView, AdProfitView, NoticeView, FaqView, GameView } from './view.js';

class Init {

    // 광고수익금 비동기통신 호출
    static adProfitSection() {
        Communication.setPromiseResult('adprofit', communicationURL.adprofit);
        AdProfitView.renderMonth(currentDate);
    }

    // 비동기 완료시 상단 광고수익 데이터 표시
    static adProfitTextRender(data) {
        AdProfitView.renderAdprofitText(data);
    }

    // 비동기 완료시 광고수익 차트 데이터 표시
    static adProfitChartRender(data) {
        AdprofitChart.createChartTag();
        const chartObject = AdProfitView.renderAdprofitChart(data);
        AdprofitChart.chartResizeEvent(chartObject);
    }

    // 공지사항 비동기통신 호출
    static noticeSection() {
        Communication.setPromiseResult('notice', communicationURL.notice);
    }

    // 비동기 완료시 공지사항 데이터 표시
    static noticeRender(data) {
        NoticeView.renderNotice(data);
    }

    // FAQ 비동기통신 호출
    static faqSection() {
        Communication.setPromiseResult('faq', communicationURL.faq);
    }

    // 비동기 완료시 FAQ 데이터 표시
    static faqRender(data) {
        FaqView.renderFaq(data);
    }

    // game 비동기통신 호출
    static gameSection() {
        Communication.setPromiseResult('game', communicationURL.game);
    }

    // 비동기 완료시 game 데이터 표시
    static gameRender(data) {
        GameView.raceTableRender(currentDate, data.race);
        GameView.fightTableRender(currentDate, data.fight);
        GameView.breakTableRender(currentDate, data.break);
        GameView.dropTableRender(currentDate, data.drop);
    }
}

class EventList {
    // error catch -> alret view 호출
    static catchError(msg) {
        ErrorView.alertView(msg);
    }

    static bindCloseModalEvent() {
        const closeButton = document.querySelector('.close-modal');

        closeButton.addEventListener('click', EventLogic.closeModal);
    }
}

export { Init,EventList };