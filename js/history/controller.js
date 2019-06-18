import { EvnetLogic } from './model.js';
import { View } from './view.js';

class Init {
    static createGameMoneyTable(data) {
        View.renderGameMoneyTable(data);
    }
    static createEtcTable(data, type) {
        View.renderEtcTable(data, type);
    }
    static bindEvent() {
        EventList.clickButtonEvent();
        EventList.searchEvent();
        EventList.searchKeyEvent();
    }
}

class EventList {
    static clickButtonEvent() {
        const allButton = document.querySelectorAll('.category-btn');
        for(const button of allButton) {
            button.addEventListener('click', (e)=>{
                EvnetLogic.removeButtonColor();
                View.removeTable();
                EvnetLogic.changeSearchURL(e.target.dataset.type);
                EvnetLogic.addButtonColor(e.target);
                EventList.focusInput();
            })
        }
    }
    static focusInput() {
        const searchInput = document.getElementById('search-box');
        searchInput.focus();
    }
    static searchEvent() {
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.addEventListener('click', () => {
            EvnetLogic.searchStart();
        })
    }
    static searchKeyEvent() {
        const searchInput = document.getElementById('search-box');
        searchInput.addEventListener('keyup', (e) => {
            if(e.keyCode === 13) {
                EvnetLogic.searchStart();
            }
        })
    }

    static catchError(msg) {
        View.viewAlert(msg)
    }
}

export { Init, EventList };