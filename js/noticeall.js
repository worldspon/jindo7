'use strict';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');


searchBtn.addEventListener('click', function() {
    let searchKeyword = encodeURIComponent(searchInput.value);
    window.location.href = `/notice/${0}/ALL/${searchKeyword}`;
});

searchInput.addEventListener('keyup', function(e) {
    if(e.keyCode==13) {
        let clickEventObject = new Event('click');
        searchBtn.dispatchEvent(clickEventObject);
    }
});