import { EventList } from './controller.js';

class View {
    // POINT EVENT
    // POINT BOX CREATE
    static setPointBox(data, state) {
        const nowYear = new Date().getFullYear();
        const parentDiv = document.querySelector('.serviceadmin-content-box');

        parentDiv.innerHTML = 
        `<div class="apply-btn-box">
            <button class="apply-list active" data-state="0">신청 내역</button>
            <button class="confirm-list" data-state="1">승인 내역</button>
            <button class="cancel-list" data-state="2">거절 내역</button>
            <div class="search-div">
                <select class="date-select">
                    <option value="request">신청일</option>
                    <option value="action">실행일</option>
                </select>
                <input type="date" class="date-input" min="2018-01-01" max="${nowYear+1}-12-31">
                <button class="date-change-button">변경</button>
                <select class="search-select">
                    <option value="id">아이디</option>
                    <option value="phone">전화번호</option>
                    <option value="accountHolder">예금주</option>
                </select>
                <input type="search" class="search-input">
                <button class="search-button"><i class="fas fa-search fa-lg"></i></button>
            </div>
        </div>`;

        View.createPointTable(data, state);
    }

    // POINT TABLE AND CONTENT CREATE
    static createPointTable(data, state) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        const previousTable = document.querySelector('.serviceadmin-content-box > table');

        if( previousTable !== null ) {
            parentDiv.removeChild(previousTable);
        }

        const table = document.createElement('table');
        let tableInnerHTML = '';
        tableInnerHTML = 
        `<thead class="common-subject-box">
            <tr>
                <th class="p-check"></th>
                <th class="p-num">No</th>
                <th class="p-date">일시</th>
                <th>아이디</th>
                <th>전화번호</th>
                <th>포인트</th>
                <th class="p-bank">은행</th>
                <th>예금주</th>
                <th class="p-prudence">상태</th>
            </tr>
        </thead>
        <tbody class="point-list-box">`;

        if( data.length === 0 ) {
            tableInnerHTML = 
            `</tbody>
                <span style="display:block; text-align: center; font-size: 1.5rem; font-weight: bold; color: red;">신청내역이 없습니다.</span>
            </table>`;

            table.innerHTML = tableInnerHTML;

            parentDiv.appendChild(table);
    
            window.dispatchEvent(new Event('resize'));

            return;
        }

        for(const el of data) {
            tableInnerHTML +=
            `<tr>
                <td>
                    <input type="checkbox" class="point-check-box">
                </td>
                <td>${el.uniqueId}</td>
                <td>${el.viewDateTime}</td>
                <td>${el.trademark}</td>
                <td>${el.phone}</td>
                <td>${el.viewPoint}</td>
                <td>${el.bankNumber}</td>
                <td class="memo-section" data-memo="${el.memo === null ? '' : el.memo}">${el.bankUser}${el.memo !== null && el.memo !== '' ? `<div class="memo-symbol"></div>` : ''}</td>`;
            
            if(state === 0) {
                tableInnerHTML +=
                `<td>
                    <button class="btn-confirm" data-state="1">승인</button>
                    <button class="btn-reject" data-state="2">거절</button>
                </td>
                </tr>`;
            } else if(state === 1) {
                tableInnerHTML +=
                `<td>
                    <span style="line-height: 1.5;" class="finished-refund-point">환급완료<br>${el.resultTime}</span>
                    <button class="restore-button" data-state="1">되돌리기</button>
                </td>
                </tr>`;
            } else if (state === 2) {
                tableInnerHTML +=
                `<td>
                    <span style="line-height: 1.5;" class="canceled-refund-point">취소완료<br>${el.resultTime}</span>
                    <button class="restore-button" data-state="2">되돌리기</button>
                </td>
                </tr>`;
            }
        }

        tableInnerHTML += `</tbody></table>`;
        table.innerHTML = tableInnerHTML;

        parentDiv.appendChild(table);

        window.dispatchEvent(new Event('resize'));
    }
    // POINT EVENT

    // P2P EVENT
    // P2P BOX CREATE
    static setP2PBox(data) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        parentDiv.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('state-btn-box');
        const primaryButton = document.createElement('button');
        const disputeButton = document.createElement('button');

        primaryButton.classList.add('btn-primary', 'alive');
        primaryButton.innerText = '전체보기';

        disputeButton.classList.add('btn-dispute');
        disputeButton.innerText = '분쟁상태';

        div.appendChild(primaryButton);
        div.appendChild(disputeButton);

        parentDiv.appendChild(div);

        View.createP2PTable(data);
    }

    // P2P TABLE AND CONTENT CREATE
    static createP2PTable(data) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        const previousTable = document.querySelector('.serviceadmin-content-box > table');

        if( previousTable !== null ) {
            parentDiv.removeChild(previousTable);
        }

        const table = document.createElement('table');
        let tableInnerHTML = '';
        tableInnerHTML = 
        `<thead class="common-subject-box">
            <tr>
                <th class="s-num">순서</th>
                <th>거래고유번호</th>
                <th class="s-apply">신청일시</th>
                <th>보내는 사람</th>
                <th class="s-deal">보내는 품목 / 수량</th>
                <th>받는 사람</th>
                <th class="s-deal">받는 품목 / 수량</th>
                <th class="s-step">단계</th>
                <th>승인한 사람</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="peer-list-box">`;

        for(const el of data) {
            tableInnerHTML +=
            `<tr>
                <td>${el.no}</td>
                <td>#${el.uniqueId}</td>
                <td>${el.viewDateTime}</td>
                <td>${el.toTrademark}</td>`;
            if( el.type === 0 ) {
                tableInnerHTML +=
                `<td><button class="p-point p-bind">포인트</button> / ${el.point}원</td>
                <td>${el.fromTrademark}</td>`;

                if( el.coin > 0 ) {
                    tableInnerHTML +=
                    `<td><button class="p-spon p-bind">스폰</button> / ${el.coin}개</td>`;
                } else if ( el.lockCoin > 0 ) {
                    tableInnerHTML +=
                    `<td><button class="p-lock-spon p-bind">락스폰</button> / ${el.lockCoin}개</td>`;
                } else {
                    tableInnerHTML +=
                    `<td>-</td>`;
                }
            } else {
                if( el.coin > 0 ) {
                    tableInnerHTML +=
                    `<td><button class="p-spon p-bind">스폰</button> / ${el.coin}개</td>`;
                } else if ( el.lockCoin > 0 ) {
                    tableInnerHTML +=
                    `<td><button class="p-lock-spon p-bind">락스폰</button> / ${el.lockCoin}개</td>`;
                } else {
                    tableInnerHTML +=
                    `<td>-</td>`;
                }

                tableInnerHTML += 
                `<td>${el.fromTrademark}</td>
                <td><button class="p-point p-bind">포인트</button> / ${el.point}원</td>`;
            }

            tableInnerHTML += 
            `<td>${el.state === 0 ? el.state + 1 : 2}</td>`;

            if( el.toYesNo === 1 ) {
                tableInnerHTML += 
                `<td>${el.toTrademark}</td>`;
            } else if( el.fromYesNo === 1 ) {
                tableInnerHTML += 
                `<td>${el.fromTrademark}</td>`;
            } else {
                tableInnerHTML += 
                `<td>-</td>`;
            }

            if( (el.state === 0 || el.state === 1) && el.toYesNo !== 2 && el.fromYesNo !== 2 ){
                tableInnerHTML += 
                `<td>진행중</td>`;
            } else if( el.state === 0 && (el.toYesNo === 2 || el.fromYesNo === 2) ) {
                tableInnerHTML += 
                `<td>취소중</td>`;
            } else if( el.state !== 0 && el.state !== 1 ) {
                tableInnerHTML += 
                `<td><button class="p-danger" data-uid="${el.uniqueId}">분쟁</button></td>`;
            }
        }

        tableInnerHTML += `</tbody></table>`;
        table.innerHTML = tableInnerHTML;

        parentDiv.appendChild(table);
        EventList.bindP2PDisputeResolveClickEvent();
        window.dispatchEvent(new Event('resize'));
    }
    // P2P EVENT

    // FIND PASSWORD EVENT
    // FIND PASSWORD BOX CREATE
    static setFindPasswordBox() {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        parentDiv.innerHTML = '';

        const contentBox = document.createElement('div');
        contentBox.classList.add('find-admin-pw');

        const adminInput = document.createElement('input');
        adminInput.id = 'busy-hands';
        adminInput.placeholder = '전화번호 또는 아이디를 입력하세요.';
        adminInput.maxLength = '15';

        const phButton = document.createElement('button');
        phButton.classList.add('btn-phone-num');
        phButton.dataset.type = 'phone';
        phButton.innerText = '전화번호로 찾기';

        const idButton = document.createElement('button');
        idButton.classList.add('btn-signify-name');
        idButton.dataset.type = 'id';
        idButton.innerText = '아이디로 찾기';

        const paragraph = document.createElement('p');
        paragraph.classList.add('ur-pw-result');

        contentBox.appendChild(adminInput);
        contentBox.appendChild(phButton);
        contentBox.appendChild(idButton);
        contentBox.appendChild(paragraph);

        parentDiv.appendChild(contentBox);

        window.dispatchEvent(new Event('resize'));
    }

    // FIND PASSWORD CONTENT CREATE
    static createFindPwParagraph(keyword, data) {
        const paragraph = document.querySelector('.ur-pw-result');

        paragraph.innerHTML =
        `${keyword}님의 비밀번호를 ${data}`;
    }

    static showLoadingIcon() {
        View.clearParagraph();
        const adminInput = document.querySelector('.find-admin-pw');

        const loadingIcon = document.createElement('i');
        loadingIcon.classList.add('loading', 'fas', 'fa-spinner', 'fa-3x', 'fa-spin');
        loadingIcon.style.color = '#48228d';

        adminInput.appendChild(loadingIcon);
    }

    static hideLoadingIcon() {
        View.clearParagraph();
        const adminInput = document.querySelector('.find-admin-pw');
        const loadingIcon = document.querySelector('.loading');
        if(loadingIcon !== null) {
            adminInput.removeChild(loadingIcon);
        }
    }

    // CLEAR CONTENT
    static clearParagraph() {
        const paragraph = document.querySelector('.ur-pw-result');
        paragraph.innerHTML = '';
    }
    // FIND PASSWORD EVENT

    // AD SUPPLIER EVENT
    // ADD SUPPLIER BOX CREATE
    static setAdSupplierBox(data) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        parentDiv.innerHTML = '';

        const div = document.createElement('div');
        div.classList.add('plus-more-supplier');
        const button = document.createElement('button');
        button.classList.add('btn-add-supplier');
        button.innerText = '추가';

        div.appendChild(button);

        parentDiv.appendChild(div);

        View.createAdSupplierTable(data);
    }

    // AD SUPPLIER TABLE AND CONTENT CREATE
    static createAdSupplierTable(data) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');

        const previousTable = document.querySelector('.serviceadmin-content-box > table');

        if( previousTable !== null ) {
            parentDiv.removeChild(previousTable);
        }

        const table = document.createElement('table');
        table.classList.add('admin-advertisement-supplier');
        let tableInnerHTML =
        `<thead class="common-subject-box">
            <tr>
                <th class="identify-num">식별No.</th>
                <th class="co-name">회사명</th>
                <th class="follow-site">URL</th>
                <th class="account-info">계정정보</th>
                <th class="place-advertisement">삽입 위치</th>
                <th class="more-writing">비고</th>
                <th class="btn-adjust-box"></th>
            </tr>
        </thead>
        <tbody class="supplier-list-box">`;

        for(const el of data) {
            tableInnerHTML +=
            `<tr>
                <td>${el.no}</td>
                <td>${el.companyName}</td>
                <td>
                    <a class="move-to-supplier" href="${el.siteAddress}" title="바로가기" target="_blank">이동</a>
                </td>
                <td>
                    <button class="check-supplier-account" data-id="${el.no}">계정확인</button>
                </td>
                <td>${el.partName}</td>
                <td>${el.note}</td>
                <td>
                    <button class="adjust-supplier" data-id="${el.no}">수정</button>
                    <button class="del-supplier" data-id="${el.no}">삭제</button>
                </td>
            </tr>`;
        }

        tableInnerHTML += `</tbody></table>`;
        table.innerHTML = tableInnerHTML;

        parentDiv.appendChild(table);

        window.dispatchEvent(new Event('resize'));
    }

    // AD ADD MODAL SHOW
    static createAdAddModal() {
        const parentDiv = document.querySelector('.serviceadmin-content-box');

        const modal = document.createElement('div');
        modal.classList.add('supplier-big-bg', 'modal');
        modal.innerHTML = 
        `<div class="write-supplier-info">
            <p class="add-new-supplier">광고 공급자 추가</p>
            <div class="sorted-supplier-list">
                <div>
                    <label for="company-name">회사명</label>
                    <input type="text" class="modal-input" id="company-name" placeholder="Google">
                </div>
                <div>
                    <label for="company-site-info">URL</label>
                    <input type="text" class="modal-input" id="company-site-info" placeholder="https://www.worldspon.net">
                </div>
                <div class="company-identification">
                    <div>
                        <label for="one-identification">아이디</label>
                        <input type="text" class="modal-input" id="one-identification" placeholder="worldspon">
                    </div>
                    <div>
                        <label for="one-pass">비밀번호</label>
                        <input type="password" class="modal-input" id="one-pass">
                    </div>
                </div>
                <div>
                    <label for="company-location">위치</label>
                    <input type="text" class="modal-input" id="company-location" placeholder="월드스폰 앱 상단">
                </div>
                <div>
                    <label for="some-more-blahblah">비고</label>
                    <input type="text" class="modal-input" id="some-more-blahblah" placeholder="비고사항">
                </div>
            </div>
            <div class="btn-supplier-box">
                <button class="registration-supplier">등록</button>
                <button class="reset-modal">리셋</button>
                <button class="close-modal">취소</button>
            </div>
        </div>`;

        parentDiv.appendChild(modal);

        document.getElementById('company-name').focus();

    }

    // AD MODIFY MODAL SHOW
    static createAdModifyModal(data) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');

        const modal = document.createElement('div');
        modal.classList.add('supplier-big-bg', 'modal');
        modal.innerHTML = 
        `<div class="write-supplier-info">
            <p class="add-new-supplier">광고 공급자 수정</p>
            <div class="sorted-supplier-list">
                <div>
                    <label for="company-name">회사명</label>
                    <input type="text" class="modal-input" id="company-name" value="${data.companyName}">
                </div>
                <div>
                    <label for="company-site-info">URL</label>
                    <input type="text" class="modal-input" id="company-site-info" value="${data.siteAddress}">
                </div>
                <div class="company-identification">
                    <div>
                        <label for="one-identification">아이디</label>
                        <input type="text" class="modal-input" id="one-identification" value="${data.loginId}">
                    </div>
                    <div>
                        <label for="one-pass">비밀번호</label>
                        <input type="password" class="modal-input" id="one-pass">
                    </div>
                </div>
                <div>
                    <label for="company-location">위치</label>
                    <input type="text" class="modal-input" id="company-location" value="${data.partName}">
                </div>
                <div>
                    <label for="some-more-blahblah">비고</label>
                    <input type="text" class="modal-input" id="some-more-blahblah" value="${data.note}">
                </div>
            </div>
            <div class="btn-supplier-box">
                <button class="registration-supplier" data-no="${data.no}">등록</button>
                <button class="reset-modal">리셋</button>
                <button class="close-modal">취소</button>
            </div>
        </div>`;

        parentDiv.appendChild(modal);

        document.getElementById('company-name').focus();
    }
    // AD SUPPLIER EVENT

    // SERVER EVENT
    // SERVER LIST BOX CREATE
    static setServerListBox(data) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        parentDiv.innerHTML = '';

        const div = document.createElement('div');
        div.classList.add('plus-more-srvr');
        const button = document.createElement('button');
        button.classList.add('btn-add-srvr');
        button.innerText = '추가';

        div.appendChild(button);

        parentDiv.appendChild(div);

        View.createServerListTable(data);
    }

    // SERVER LIST TABLE AND CONTENT CREATE
    static createServerListTable(data) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');

        const previousTable = document.querySelector('.serviceadmin-content-box > table');

        if( previousTable !== null ) {
            parentDiv.removeChild(previousTable);
        }

        const table = document.createElement('table');
        table.classList.add('admin-advertisement-supplier');
        let tableInnerHTML =
        `<thead class="common-subject-box">
            <tr>
                <th class="num-count">No</th>
                <th class="place-computer">아이피</th>
                <th>포트</th>
                <th>위치</th>
                <th>아이디</th>
                <th class="more-words-needed">서버정보</th>
                <th>결제일</th>
                <th class="choose-what-want"></th>
            </tr>
        </thead>
        <tbody class="srvr-list-box">`;

        for(const el of data) {
            tableInnerHTML +=
            `<tr>
                <td>${el.no}</td>
                <td>${el.ip}</td>
                <td>${el.port}</td>
                <td>${el.location}</td>
                <td>${el.loginId}</td>
                <td>${el.note}</td>
                <td>${el.payment}</td>
                <td>
                    <button class="adjust-srvr" data-id="${el.no}">수정</button>
                    <button class="del-srvr" data-id="${el.no}">삭제</button>
                </td>
            </tr>`;
        }

        tableInnerHTML += `</tbody></table>`;
        table.innerHTML = tableInnerHTML;

        parentDiv.appendChild(table);

        window.dispatchEvent(new Event('resize'));
    }

    // SERVER LIST ADD MODAL SHOW
    static createServerAddModal() {
        const parentDiv = document.querySelector('.serviceadmin-content-box');

        const modal = document.createElement('div');
        modal.classList.add('supplier-big-bg', 'modal');
        modal.innerHTML = 
        `<div class="write-srvr-info">
            <p class="add-new-srvr">서버 추가</p>
            <div class="sorted-srvr-list">
                <div>
                    <label for="srvr-place">아이피</label>
                    <input type="text" class="modal-input" id="srvr-place" placeholder="000.000.000.000">
                </div>
                <div class="bind-srvr-a">
                    <div>
                        <label for="srvr-port">포트</label>
                        <input type="text" class="modal-input" id="srvr-port" placeholder="0000">
                    </div>
                    <div>
                        <label for="srvr-come-from">위치</label>
                        <input type="text" class="modal-input" id="srvr-come-from" placeholder="Korea">
                    </div>
                </div>
                <div class="bind-srvr-a">
                    <div>
                        <label for="srvr-nickname">아이디</label>
                        <input type="text" class="modal-input" id="srvr-nickname" placeholder="administor">
                    </div>
                    <div>
                        <label for="srvr-payment-day">결제일</label>
                        <input type="text" class="modal-input" id="srvr-payment-day" placeholder="15일">
                    </div>
                </div>
                <div>
                    <label for="srvr-more-things">서버정보</label>
                    <input type="text" class="modal-input" id="srvr-more-things" placeholder="월드스폰-회원정보">
                </div>
            </div>
            <div class="btn-srvr-box">
                <button class="registration-srvr">등록</button>
                <button class="reset-modal">리셋</button>
                <button class="close-modal">취소</button>
            </div>
        </div>`;

        parentDiv.appendChild(modal);

        document.getElementById('srvr-place').focus();

    }

    // SERVER LIST MODIFY MODAL SHOW
    static createServerModifyModal(data) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');

        const modal = document.createElement('div');
        modal.classList.add('supplier-big-bg', 'modal');
        modal.innerHTML = 
        `<div class="write-srvr-info">
            <p class="add-new-srvr">서버 수정</p>
            <div class="sorted-srvr-list">
                <div>
                    <label for="srvr-place">아이피</label>
                    <input type="text" class="modal-input" id="srvr-place" value="${data.ip}">
                </div>
                <div class="bind-srvr-a">
                    <div>
                        <label for="srvr-port">포트</label>
                        <input type="text" class="modal-input" id="srvr-port" value="${data.port}">
                    </div>
                    <div>
                        <label for="srvr-come-from">위치</label>
                        <input type="text" class="modal-input" id="srvr-come-from" value="${data.location}">
                    </div>
                </div>
                <div class="bind-srvr-a">
                    <div>
                        <label for="srvr-nickname">아이디</label>
                        <input type="text" class="modal-input" id="srvr-nickname" value="${data.loginId}">
                    </div>
                    <div>
                        <label for="srvr-payment-day">결제일</label>
                        <input type="text" class="modal-input" id="srvr-payment-day" value="${data.payment}">
                    </div>
                </div>
                <div>
                    <label for="srvr-more-things">서버정보</label>
                    <input type="text" class="modal-input" id="srvr-more-things" value="${data.note}">
                </div>
            </div>
            <div class="btn-srvr-box">
                <button class="registration-srvr" data-no="${data.no}">등록</button>
                <button class="reset-modal">리셋</button>
                <button class="close-modal">취소</button>
            </div>
        </div>`;

        parentDiv.appendChild(modal);

        document.getElementById('srvr-place').focus();

    }
    // SERVER EVENT

    // COMMON MODAL EVENT
    // RESET MODAL CONTENT
    static resetModal() {
        const modalInput = document.querySelectorAll('.modal-input');
        for(const el of modalInput) {
            el.value = '';
        }
    }

    // DESTROY MODAL BOX
    static destroyModal() {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        const modal = document.querySelector('.modal');
        parentDiv.removeChild(modal);
    }
    // COMMON MODAL EVENT

    static viewAlert(msg) {
        alert(msg);
    }
}

export { View };