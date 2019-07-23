import { Dynamic } from './controller.js';

class EventLogic {
    static searchEvent() {
        const searchInput = document.querySelector('.search-input');
        const searchKeyword = encodeURIComponent(searchInput.value.trim());

        if( searchKeyword === '' ) {
            Dynamic.catchError('검색어를 입력해주세요.');
        } else {
            window.location.href = `/board/0/${searchKeyword}`;
        }
    }

    static inputEnterEvent(e) {
        const searchButton = document.querySelector('.search-btn');

        if(e.keyCode === 13) {
            searchButton.dispatchEvent(new Event('click'));
        }
    }
}

export { EventLogic };