import { Dynamic } from './controller.js';

class Handler {
    // 빈 검색어 확인
    static inputLengthCheck(value) {
        if(value.trim().length > 0) {
            return true
        } else {
            return false;
        }
    }
    
    // 검색어 인코딩
    static encodeKeyword(value) {
        return encodeURIComponent(value);
    }
}

class EventLogic {
    static searchClickEvent() {
        const searchInput = document.querySelector('.faq-search-input');

        if(Handler.inputLengthCheck(searchInput.value)) {
            const searchKeyword = Handler.encodeKeyword(searchInput.value.trim());
            console.log(searchKeyword);
        } else {
            Dynamic.catchError('검색어를 입력해주세요.');
        }
    }

    static searchEnterEvent(e) {
        if(e.keyCode === 13) {
            EventLogic.searchClickEvent();
        }
    }
}

export { EventLogic };