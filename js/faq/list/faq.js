'use strict';


const searchBtn = document.querySelector('.faq-search-btn');
const searchInput = document.querySelector('.faq-search-input');

// 검색 기능
/////////////////////////////////////////////////////////////////////
searchBtn.addEventListener('click', function() {
    searchKeyword = encodeURIComponent(searchInput.value);
    console.log(searchKeyword);
});

searchInput.addEventListener('keyup', function(e) {
    if(e.keyCode==13) {
        let clickEventObject = new Event('click');
        searchBtn.dispatchEvent(clickEventObject);
    }
});
/////////////////////////////////////////////////////////////////////
