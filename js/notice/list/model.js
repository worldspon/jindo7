import { Dynamic } from './controller.js';

class EventLogic {
    static searchButtonClickEvent() {
        const searchInput = document.querySelector('.search-input');
        const searchKeyword = encodeURIComponent(searchInput.value.trim());

        if( searchKeyword === '' ) {
            Dynamic.catchError('검색어를 입력해주세요.');
        } else {
            location.href = `/notice/${0}/ALL/${searchKeyword}`;
        }
    }

    // INPUT ENTER KEY PRESS -> SEARCH
    static searchInputKeyEvent(e) {
        const searchBtn = document.querySelector('.search-btn');
        if( e.keyCode === 13 ) {
            searchBtn.dispatchEvent(new Event('click'));
        }
    }
}

export { EventLogic };