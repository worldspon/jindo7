import { EventList } from './controller.js';

class View {
    // POINT EVENT
    static setPointBox(data, state) {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        parentDiv.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('apply-btn-box');
        const applyListButton = document.createElement('button');
        const confirmListButton = document.createElement('button');
        const cancelListButton = document.createElement('button');

        applyListButton.classList.add('apply-list', 'active');
        applyListButton.dataset.state = '0';
        applyListButton.innerText = '신청 내역';

        confirmListButton.classList.add('confirm-list');
        confirmListButton.dataset.state = '1';
        confirmListButton.innerText = '승인 내역';

        cancelListButton.classList.add('cancel-list');
        cancelListButton.dataset.state = '2';
        cancelListButton.innerText = '거절 내역';

        div.appendChild(applyListButton);
        div.appendChild(confirmListButton);
        div.appendChild(cancelListButton);

        parentDiv.appendChild(div);

        View.createPointTable(data, state);
    }

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
                <td>${el.bankUser}</td>`;
            
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
                </td>
                </tr>`;
            } else if (state === 2) {
                tableInnerHTML +=
                `<td>
                    <span style="line-height: 1.5;" class="canceled-refund-point">취소완료<br>${el.resultTime}</span>
                </td>
                </tr>`;
            }
        }

        tableInnerHTML += `</tbody></table>`;
        table.innerHTML = tableInnerHTML;

        parentDiv.appendChild(table);
        window.dispatchEvent(new Event('resize'));
    }

    // P2P EVENT
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

    // FIND PASSWORD EVENT
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
    }

    static createFindPwParagraph(keyword, data) {
        const paragraph = document.querySelector('.ur-pw-result');

        paragraph.innerHTML =
        `${keyword}님의 비밀번호를 ${data}`
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

    static clearParagraph() {
        const paragraph = document.querySelector('.ur-pw-result');
        paragraph.innerHTML = '';
    }

    // AD SUPPLIER EVENT
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
    }

    static createAdAddModal() {
        const parentDiv = document.querySelector('.serviceadmin-content-box');

        const modal = document.createElement('div');
        modal.classList.add('supplier-big-bg');
        modal.innerHTML = 
        `<div class="write-supplier-info">
            <p class="add-new-supplier">광고 공급자 추가</p>
            <div class="sorted-supplier-list">
                <div>
                    <label for="company-name">회사명</label>
                    <input type="text" id="company-name">
                </div>
                <div>
                    <label for="company-site-info">URL</label>
                    <input type="text" id="company-site-info">
                </div>
                <div class="company-identification">
                    <div>
                        <label for="one-identification">아이디</label>
                        <input type="text" id="one-identification">
                    </div>
                    <div>
                        <label for="one-pass">비밀번호</label>
                        <input type="password" id="one-pass">
                    </div>
                </div>
                <div>
                    <label for="company-location">위치</label>
                    <input type="text" id="company-location">
                </div>
                <div>
                    <label for="some-more-blahblah">비고</label>
                    <input type="text" id="some-more-blahblah">
                </div>
            </div>
            <div class="btn-supplier-box">
                <button class="registration-supplier">등록</button>
                <button class="reset-supplier">리셋</button>
                <button class="close-supplier">취소</button>
            </div>
        </div>`;

        parentDiv.appendChild(modal);

        document.getElementById('company-name').focus();

    }

    static resetModal() {
        const companyName = document.getElementById('company-name');
        const companyUrl = document.getElementById('company-site-info');
        const companyId = document.getElementById('one-identification');
        const companyPw = document.getElementById('one-pass');
        const companyLocation = document.getElementById('company-location');
        const companyNote = document.getElementById('some-more-blahblah');

        companyName.value = '';
        companyUrl.value = '';
        companyId.value = '';
        companyPw.value = '';
        companyLocation.value = '';
        companyNote.value = '';
    }

    static destroyModal() {
        const parentDiv = document.querySelector('.serviceadmin-content-box');
        const modal = document.querySelector('.supplier-big-bg');
        parentDiv.removeChild(modal);
    }

    static viewAlert(msg) {
        alert(msg);
    }
}

export { View };