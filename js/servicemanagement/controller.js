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

    // 로딩 아이콘 활성화
    static showLoadingIcon() {
        View.showLoadingIcon();
    }

    // 로딩 아이콘 비활성화
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

    // 광고공급자 추가 모달 활성화
    static adAddModal() {
        View.createAdAddModal();
    }

    // 광고공급자 수정 모달 활성화
    static adModifyModal(data) {
        View.createAdModifyModal(data);
    }
    // AD LIST

    // SERVER
    static serverListBox(data) {
        View.setServerListBox(data);
    }

    static serverListTable(data) {
        View.createServerListTable(data);
    }

    // 서버관리 추가 모달 활성화
    static serverAddModal() {
        View.createServerAddModal();
    }

    // 서버관리 수정 모달 활성화
    static serverModifyModal(data) {
        View.createServerModifyModal(data);
    }
    // SERVER

    // COMMON MODAL EVENT
    // 모달 초기화
    static resetModal() {
        View.resetModal();
    }

    // 모달 비활성화
    static destroyModal() {
        View.destroyModal()
    }
    // COMMON MODAL EVENT

    static catchError(msg) {
        View.viewAlert(msg);
    }
}

class EventList {
    // COMMON EVENT
    // 카테고리 버튼 클릭시 색 변경
    static bindCategoryButtonColorEvent() {
        const categoryButton = document.querySelectorAll('.sorted-content-box > button');

        for(const button of categoryButton) {
            button.addEventListener('click', EventLogic.categoryButtonColorEvent);
        }
    }

    // RESIZE 이벤트 발생시 화면 맞춤
    static bindWindowResizeEvent() {
        window.addEventListener('resize', EventLogic.windowResizeEvent);
    }
    // COMMON EVENT

    // POINT EVENT
    // 포인트환급 클릭시 데이터 통신
    static bindPointButtonClickEvent() {
        const pointButton = document.querySelector('.s-peer');
        pointButton.addEventListener('click', EventLogic.pointButtonClickEvent);
    }

    // 상세내역 버튼(신청, 승인, 거절) 클릭시 데이터 통신
    static bindPointListButtonClickEvent() {
        const pointListButton = document.querySelectorAll('.apply-btn-box > button');

        for(const button of pointListButton) {
            button.addEventListener('click', EventLogic.pointListButtonClickEvent);
        }
    }

    // 체크박스 체크 시 색상 변경
    static bindPointListCheckBoxClickEvent() {
        const pointCheckBox = document.querySelectorAll('.point-check-box');
        for(const button of pointCheckBox) {
            button.addEventListener('change', EventLogic.pointListCheckBoxClickEvent);
        }
    }

    // 포인트환급 신청내역 승인/거절 이벤트
    static bindPointStateChangeEvent() {
        const confirmButton = document.querySelectorAll('.btn-confirm');
        const rejectButton = document.querySelectorAll('.btn-reject');

        // 승인 이벤트
        for(const button of confirmButton) {
            button.addEventListener('click', EventLogic.pointConfirmClickEvent);
        }

        // 거절 이벤트
        for(const button of rejectButton) {
            button.addEventListener('click', EventLogic.pointRejectClickEvent);
        }
    }
    // POINT EVENT

    // P2P EVENT
    // P2P 버튼 클릭시 데이터 통신
    static bindP2PButtonClickEvent() {
        const p2pButton = document.querySelector('.s-refund');
        p2pButton.addEventListener('click', EventLogic.p2pButtonClickEvent);
    }

    // P2P 데이터 전체보기 버튼 클릭시 데이터 동신
    static bindP2PAllButtonClickEvent() {
        const allListButton = document.querySelector('.btn-primary');
        allListButton.addEventListener('click', EventLogic.p2pAllListButtonClickEvent);
    }

    // P2P 데이터 분쟁상태 버튼 클릭시 데이터 동신
    static bindP2PDisputeClickEvent() {
        const disputeButton = document.querySelector('.btn-dispute');
        disputeButton.addEventListener('click', EventLogic.p2pDisputeClickEvent);
    }

    // 분쟁 해결 이벤트
    static bindP2PDisputeResolveClickEvent() {
        const resolveButton = document.querySelectorAll('.p-danger');

        for(const button of resolveButton) {
            button.addEventListener('click', EventLogic.p2pDisputeResolveClickEvent)
        }
    }
    // P2P EVENT

    // ADMIN PASSWORD EVENT
    // 관리자용비밀번호 버튼 클릭시 화면 출력
    static bindAdminFindPwButtonClickEvent() {
        const adminPwButton = document.querySelector('.s-admin-pw');
        adminPwButton.addEventListener('click', EventLogic.adminFindPwButtonClickEvent);
    }

    // 찾기버튼 클릭시 각 데이터에 맞는 데이터 통신
    static bindFindPwCategoryClickEvent() {
        const phButton = document.querySelector('.btn-phone-num');
        phButton.addEventListener('click', EventLogic.findPwByInput);

        const idButton = document.querySelector('.btn-signify-name');
        idButton.addEventListener('click', EventLogic.findPwByInput);
    }
    // ADMIN PASSWORD EVENT

    // AD SUPPLIER EVENT
    // 광고공급자관리 버튼 클릭 이벤트
    static bindAdSupplierButtonClickEvent() {
        const adSupplierButton = document.querySelector('.s-supplier');
        adSupplierButton.addEventListener('click', EventLogic.adSupplierButtonClickEvent);
    }

    // 추가 버튼 클릭 이벤트
    static bindAdSupplierAddClickEvent() {
        const adAddbutton = document.querySelector('.btn-add-supplier');
        adAddbutton.addEventListener('click', EventLogic.adSupplierAddClickEvent);
    }

    // 계정확인 클릭 이벤트
    static bindAdAccountFind() {
        const findButton = document.querySelectorAll('.check-supplier-account');

        for(const button of findButton) {
            button.addEventListener('click', EventLogic.adAccountFind);
        }
    }

    // 광고공급자 수정 이벤트
    static bindAdListModify() {
        const adModifyButton = document.querySelectorAll('.adjust-supplier');

        for(const button of adModifyButton) {
            button.addEventListener('click', EventLogic.adListModify);
        }
    }

    // 광고공급자 삭제 이벤트
    static bindAdListDelete() {
        const adDeleteButton = document.querySelectorAll('.del-supplier');

        for(const button of adDeleteButton) {
            button.addEventListener('click', EventLogic.adListDelete);
        }
    }

    // MODAL 광고 데이터 등록 이벤트
    static bindAdListAdd() {
        const adRegButton = document.querySelector('.registration-supplier');
        adRegButton.addEventListener('click', EventLogic.adListAdd);
    }

    // MODAL 광고 데이터 수정사항 등록 이벤트
    static bindAdModifyReg() {
        const adRegButton = document.querySelector('.registration-supplier');
        adRegButton.addEventListener('click', EventLogic.adModifyReg);
    }
    // AD SUPPLIER EVENT

    // SERVER MANAGEMENT EVENT
    // 서버관리 버튼 클릭 이벤트
    static bindServerManageButtonClickEvent() {
        const serverManageButton = document.querySelector('.s-server-care');
        serverManageButton.addEventListener('click', EventLogic.serverManageButtonClickEvent);
    }

    // 서버 추가 이벤트
    static bindServerAddClickEvent() {
        const serverAddButton = document.querySelector('.btn-add-srvr');
        serverAddButton.addEventListener('click', EventLogic.serverAddClickEvent);
    }

    // 서버 추가 데이터 등록 이벤트
    static bindServerListAdd() {
        const serverRegButton = document.querySelector('.registration-srvr');
        serverRegButton.addEventListener('click', EventLogic.serverListAdd);
    }

    //서버 수정버튼 클릭 이벤트
    static bindServerListModify() {
        const serverModifyButton = document.querySelectorAll('.adjust-srvr');

        for(const button of serverModifyButton) {
            button.addEventListener('click', EventLogic.serverListModify);
        }
    }

    // 서버 수정 데이터 등록 이벤트
    static bindServerModifyReg() {
        const adRegButton = document.querySelector('.registration-srvr');
        adRegButton.addEventListener('click', EventLogic.serverModifyReg);
    }

    // 서버 삭제 이벤트
    static bindServerListDelete() {
        const serverDeleteButton = document.querySelectorAll('.del-srvr');

        for(const button of serverDeleteButton) {
            button.addEventListener('click', EventLogic.serverListDelete);
        }
    }

    // COMMON MODAL EVENT
    // MODAL RESET EVENT
    static bindResetModal() {
        const modalResetButton = document.querySelector('.reset-modal');

        modalResetButton.addEventListener('click', Dynamic.resetModal);
    }

    // MODAL DESTROY EVENT
    static bindDestroyModal() {
        const modalCancel = document.querySelector('.close-modal');

        modalCancel.addEventListener('click', Dynamic.destroyModal);
    }
    // COMMON MODAL EVENT
}

export { Init, Dynamic, EventList };