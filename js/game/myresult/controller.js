import { View } from './view.js';
import { gameURL, Handler, EventLogic } from './model.js';


class Init {
    static communicationTableData() {
        Handler.getTableData('좀비레이스', gameURL['좀비레이스']);
    }
    static bindEvent() {
        EventList.bindClickEvent();
    }
}

class Dynamic {
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

    // 에러 감지 함수
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindClickEvent() {
        const buttonList = document.querySelectorAll('.mybet-content-box > button');

        for(const button of buttonList) {
            if(!button.classList.contains('on')) {
                button.addEventListener('click', EventLogic.changeTable);
            }
        }
    }
    
    // 악의적 통신 요청을 막기위한 click event unbind
    static unbindClickEvent() {
        const buttonList = document.querySelectorAll('.mybet-content-box > button');

        for(const button of buttonList) {
            button.removeEventListener('click', EventLogic.changeTable);
        }
    }
}

export {Init, Dynamic, EventList};

