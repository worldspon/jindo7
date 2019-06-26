import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindCategoryButtonColorEvent();
        EventList.bindPointButtonClickEvent();
        EventList.bindP2PButtonClickEvent();
        EventList.bindAdminPwButtonClickEvent();
        EventList.bindAdSupplierButtonClickEvent();
        EventList.bindServerManageButtonClickEvent();
        EventList.bindWindowResizeEvent();
    }

    static firstCommunication() {
        const pointButton = document.querySelector('.s-peer');
        pointButton.dispatchEvent(new Event('click'));
    }
}

class Dynamic {
    static pointBox(data, state) {
        View.setPointBox(data, state);
    }

    static pointTable(data, state) {
        View.createPointTable(data, state);
    }

    static p2pBox(data) {
        View.setP2PBox(data);
    }
    
    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    static bindCategoryButtonColorEvent() {
        const categoryButton = document.querySelectorAll('.sorted-content-box > button');

        for(const button of categoryButton) {
            button.addEventListener('click', EventLogic.categoryButtonColorEvent);
        }

    }
    static bindWindowResizeEvent() {
        window.addEventListener('resize', EventLogic.windowResizeEvent);
    }

    // POINT EVENT
    static bindPointButtonClickEvent() {
        const pointButton = document.querySelector('.s-peer');
        pointButton.addEventListener('click', EventLogic.pointButtonClickEvent);
    }

    static bindPointListButtonClickEvent() {
        const pointListButton = document.querySelectorAll('.apply-btn-box > button');

        for(const button of pointListButton) {
            button.addEventListener('click', EventLogic.pointListButtonClickEvent);
        }
    }

    static bindPointListCheckBoxClickEvent() {
        const pointCheckBox = document.querySelectorAll('.point-check-box');
        for(const button of pointCheckBox) {
            button.addEventListener('change', EventLogic.pointListCheckBoxClickEvent);
        }
    }

    static bindPointStateChangeEvent() {
        const confirmButton = document.querySelectorAll('.btn-confirm');
        const rejectButton = document.querySelectorAll('.btn-reject');

        for(const button of confirmButton) {
            button.addEventListener('click', EventLogic.pointConfirmClickEvent);
        }

        for(const button of rejectButton) {
            button.addEventListener('click', EventLogic.pointRejectClickEvent);
        }
    }
    // POINT EVENT

    // P2P EVENT
    static bindP2PButtonClickEvent() {
        const p2pButton = document.querySelector('.s-refund');
        p2pButton.addEventListener('click', EventLogic.p2pButtonClickEvent);
    }

    static bindAdminPwButtonClickEvent() {
        const adminPwButton = document.querySelector('.s-admin-pw');
        adminPwButton.addEventListener('click', () => {
            console.log('c');
        })
    }

    static bindAdSupplierButtonClickEvent() {
        const adSupplierButton = document.querySelector('.s-supplier');
        adSupplierButton.addEventListener('click', () => {
            console.log('d');
        })
    }

    static bindServerManageButtonClickEvent() {
        const serverManageButton = document.querySelector('.s-server-care');
        serverManageButton.addEventListener('click', () => {
            console.log('e');
        })
    }
}

export { Init, Dynamic, EventList };