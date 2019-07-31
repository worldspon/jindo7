class Init {
    static bindEvent() {
        EventList.bindHistoryBackEvent();
    }
}

class EventList {
    static bindHistoryBackEvent() {
        const listBtn = document.querySelector('.list-btn');
        listBtn.addEventListener('click', ()=>{
            window.location.href = '/faq';
        });
    }
}

export { Init };