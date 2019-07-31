class Init {

    static bindEvent() {
        EventList.historyBack();
    }
}

class EventList {
    // 목록 클릭시 뒤로가기 이벤트 등록
    static historyBack() {
        document.querySelector('.list-btn').addEventListener('click', ()=>{
            window.history.back();
        });
    }
}


export { Init, EventList };