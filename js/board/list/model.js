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
            try {
                searchButton.dispatchEvent(new Event('click'));
            } catch (error) {
                const event = document.createEvent('Event');
                event.initEvent('click', true, true);
                searchButton.dispatchEvent(event);
            }
        }
    }
}

export { EventLogic };