import { EventLogic } from './model.js';
import { View } from './view.js';

class Init {
    static bindEvent() {
        EventList.bindCategoryButtonColorEvent();
        EventList.bindPointButtonClickEvent();
        EventList.bindP2PButtonClickEvent();
        EventList.bindAdminFindPwButtonClickEvent();
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
    // POINT
    static pointBox(data, state) {
        View.setPointBox(data, state);
    }

    static pointTable(data, state) {
        View.createPointTable(data, state);
    }
    // POINT

    // P2P
    static p2pBox(data) {
        View.setP2PBox(data);
    }

    static p2pTable(data) {
        View.createP2PTable(data);
    }
    // P2P

    // PASSWORD FIND
    static adminFindPwBox() {
        View.setFindPasswordBox();
    }

    static adminFindPwParagraph(keyword, data) {
        View.createFindPwParagraph(keyword, data);
    }

    static clearParagraph() {
        View.clearParagraph();
    }

    static showLoadingIcon() {
        View.showLoadingIcon();
    }

    static hideLoadingIcon() {
        View.hideLoadingIcon();
    }
    // PASSWORD FIND

    // AD LIST
    static adListBox(data) {
        View.setAdSupplierBox(data);
    }

    static adListTable(data) {
        View.createAdSupplierTable(data);
    }

    static adAddModal() {
        View.createAdAddModal();
    }

    static adModifyModal(data) {
        View.createAdModifyModal(data);
    }

    static resetModal() {
        View.resetModal();
    }

    static destroyModal() {
        View.destroyModal()
    }
    // AD LIST

    // SERVER
    static serverListBox(data) {
        View.setServerListBox(data);
    }

    static serverListTable(data) {
        View.createServerListTable(data);
    }

    static serverAddModal() {
        View.createServerAddModal();
    }

    static serverModifyModal(data) {
        View.createServerModifyModal(data);
    }
    // SERVER

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    // COMMON EVENT
    static bindCategoryButtonColorEvent() {
        const categoryButton = document.querySelectorAll('.sorted-content-box > button');

        for(const button of categoryButton) {
            button.addEventListener('click', EventLogic.categoryButtonColorEvent);
        }
    }
    static bindWindowResizeEvent() {
        window.addEventListener('resize', EventLogic.windowResizeEvent);
    }
    // COMMON EVENT

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
    static bindP2PAllButtonClickEvent() {
        const allListButton = document.querySelector('.btn-primary');
        allListButton.addEventListener('click', EventLogic.p2pAllListButtonClickEvent);
    }
    static bindP2PDisputeClickEvent() {
        const disputeButton = document.querySelector('.btn-dispute');
        disputeButton.addEventListener('click', EventLogic.p2pDisputeClickEvent);
    }

    static bindP2PDisputeResolveClickEvent() {
        const resolveButton = document.querySelectorAll('.p-danger');

        for(const button of resolveButton) {
            button.addEventListener('click', EventLogic.p2pDisputeResolveClickEvent)
        }
    }

    // ADMIN PASSWORD EVENT
    static bindAdminFindPwButtonClickEvent() {
        const adminPwButton = document.querySelector('.s-admin-pw');
        adminPwButton.addEventListener('click', EventLogic.adminFindPwButtonClickEvent);
    }

    static bindFindPwCategoryClickEvent() {
        const phButton = document.querySelector('.btn-phone-num');
        phButton.addEventListener('click', EventLogic.findPwByInput);

        const idButton = document.querySelector('.btn-signify-name');
        idButton.addEventListener('click', EventLogic.findPwByInput);
    }
    // ADMIN PASSWORD EVENT

    // AD SUPPLIER EVENT
    // 카테고리 버튼 클릭 이벤트
    static bindAdSupplierButtonClickEvent() {
        const adSupplierButton = document.querySelector('.s-supplier');
        adSupplierButton.addEventListener('click', EventLogic.adSupplierButtonClickEvent);
    }

    // 추가 버튼 클릭 이벤트
    static bindAdSupplierAddClickEvent() {
        const adAddbutton = document.querySelector('.btn-add-supplier');
        adAddbutton.addEventListener('click', EventLogic.adSupplierAddClickEvent);
    }

    static bindAdAccountFind() {
        const findButton = document.querySelectorAll('.check-supplier-account');

        for(const button of findButton) {
            button.addEventListener('click', EventLogic.adAccountFind);
        }
    }

    static bindAdListModify() {
        const adModifyButton = document.querySelectorAll('.adjust-supplier');

        for(const button of adModifyButton) {
            button.addEventListener('click', EventLogic.adListModify);
        }
    }

    // 삭제 이벤트
    static bindAdListDelete() {
        const adDeleteButton = document.querySelectorAll('.del-supplier');

        for(const button of adDeleteButton) {
            button.addEventListener('click', EventLogic.adListDelete);
        }
    }

    // MODAL 등록 이벤트
    static bindAdListAdd() {
        const adRegButton = document.querySelector('.registration-supplier');
        adRegButton.addEventListener('click', EventLogic.adListAdd);
    }

    // MODAL 수정 등록 이벤트
    static bindAdModifyReg() {
        const adRegButton = document.querySelector('.registration-supplier');
        adRegButton.addEventListener('click', EventLogic.adModifyReg);
    }

    static bindResetModal() {
        const modalResetButton = document.querySelector('.reset-modal');

        modalResetButton.addEventListener('click', Dynamic.resetModal);
    }

    static bindDestroyModal() {
        const modalCancel = document.querySelector('.close-modal');

        modalCancel.addEventListener('click', Dynamic.destroyModal);
    }
    // AD SUPPLIER EVENT

    // SERVER MANAGEMENT EVENT
    static bindServerManageButtonClickEvent() {
        const serverManageButton = document.querySelector('.s-server-care');
        serverManageButton.addEventListener('click', EventLogic.serverManageButtonClickEvent);
    }

    static bindServerAddClickEvent() {
        const serverAddButton = document.querySelector('.btn-add-srvr');
        serverAddButton.addEventListener('click', EventLogic.serverAddClickEvent);
    }

    static bindServerListAdd() {
        const serverRegButton = document.querySelector('.registration-srvr');
        serverRegButton.addEventListener('click', EventLogic.serverListAdd);
    }

    static bindServerListModify() {
        const serverModifyButton = document.querySelectorAll('.adjust-srvr');

        for(const button of serverModifyButton) {
            button.addEventListener('click', EventLogic.serverListModify);
        }
    }

    static bindServerModifyReg() {
        const adRegButton = document.querySelector('.registration-srvr');
        adRegButton.addEventListener('click', EventLogic.serverModifyReg);
    }

    static bindServerListDelete() {
        const serverDeleteButton = document.querySelectorAll('.del-srvr');

        for(const button of serverDeleteButton) {
            button.addEventListener('click', EventLogic.serverListDelete);
        }
    }
}

export { Init, Dynamic, EventList };