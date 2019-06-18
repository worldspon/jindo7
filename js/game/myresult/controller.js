import {View} from './view.js';
import {gameURL, Handler} from './model.js.js';


class Init {
    static communicationTableData() {
        Handler.getTableData('좀비레이스', gameURL['좀비레이스']);
    }
    static createRaceTable(data) {
        View.renderRaceTable(data);
    }

    static createFightTable(data) {
        View.renderFightTable(data);
    }

    static createBreakTable(data) {
        View.renderBreakTable(data);
    }

    static createDropTable(data) {
        View.renderDropTable(data);
    }

    // 버튼 색상 변환 함수
    static changeButtonColor(target) {
        View.setColorClass(target);
    }

    // 이벤트 등록 함수
    static regClickEvent() {
        Handler.bindClickEvent();
    }

    // 에러 감지 함수
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

export {Init};

