import { View } from './view.js';
import { EventLogic } from './model.js';

class Init {
    static getBanUserData() {
        EventLogic.getBanUserData();
    }
}

class Dynamic {
    static createBanUserBox(data) {
        View.createBanUserBox(data);
    }

    static createBanUserTable(data) {
        View.createBanUserTable(data);
    }

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindSearchBanUserEvent() {
        const searchButton = document.querySelector('.btn-suspend-id');
        searchButton.addEventListener('click', EventLogic.searchBanUser)
    }

    static bindSearchInputEnterEvent() {
        const searchInput = document.getElementById('suspend-user-id');
        searchInput.addEventListener('keydown', EventLogic.searchInputEnter);
    }

    static bindTableDataEditEvent() {
        const targetTable = document.querySelectorAll('.editable-data');

        for(const table of targetTable) {
            table.addEventListener('click', EventLogic.tableDataEdit);
        }
    }

    static bindReasonEditEvent(target) {
        target.addEventListener('keydown', EventLogic.reasonEdit);
    }

    static bindReasonFocusOutEvent(target) {
        target.addEventListener('focusout', EventLogic.reasonFocusOut)
    }

    static bindBanClearEvent() {
        const clearButton = document.querySelectorAll('.btn-clear');

        for(const button of clearButton) {
            button.addEventListener('click', EventLogic.banClear);
        }
    }
}

export { Init, Dynamic, EventList };