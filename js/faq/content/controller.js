class Handler {
    static bindHistoryBackClickEvent() {
        const listBtn = document.querySelector('.list-btn');

        listBtn.addEventListener('click', ()=>{
            window.history.back();
        })
    }
}

export default Handler;