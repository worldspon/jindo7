import { View } from './view.js';
import { EventLogic } from './model.js';

class Init {
    static bindEvent() {
        EventList.bindChangePeriodEvent();
        EventList.bindChangeColorEvent();
        EventList.bindApplyAdvertisementEvent();
        EventList.bindCancelClickEvent();
    }
}

class Dynamic {
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindChangePeriodEvent() {
        const periodSelectBox = document.querySelector('.ad-how-long');

        periodSelectBox.addEventListener('change', EventLogic.changePeriod);

    }

    static bindChangeColorEvent() {
        const colorSelectBox = document.querySelector('.ad-color');

        colorSelectBox.addEventListener('change', EventLogic.changeColor);
    }

    static bindApplyAdvertisementEvent() {
        const applyButton = document.querySelector('.applyad');

        applyButton.addEventListener('click', EventLogic.applyAdvertisement);
    }

    static bindCancelClickEvent() {
        const cancelButton = document.querySelector('.cancelad');

        cancelButton.addEventListener('click', () => {
            window.history.back();
        })
    }
}

export { Init, Dynamic, EventList };