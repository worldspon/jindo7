import View from './view.js';

class Handler {

    // 검색 클릭 이벤트 등록
    static bindSearchClickEvent() {
        const searchBtn = document.querySelector('.faq-search-btn');
        searchBtn.addEventListener('click', () => {
            const searchInput = document.querySelector('.faq-search-input');

            if(Handler.inputLengthCheck(searchInput.value)) {
                const searchKeyword = Handler.encodeKeyword(searchInput.value);
                console.log(searchKeyword);
            } else {
                View.viewAlert('검색어를 입력해주세요.');
            }
        })
    }

    // input box enter 입력시 click 이벤트
    static bindSearchEnterEvent() {
        const searchInput = document.querySelector('.faq-search-input');
        searchInput.addEventListener('keyup', (e) => {
            if(e.keyCode === 13) {
                const searchBtn = document.querySelector('.faq-search-btn');
                const clickEventObject = new Event('click');
                searchBtn.dispatchEvent(clickEventObject);
            }
        })
    }

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

export default Handler;