import { EventList } from './controller.js';

class View {
    static createBanUserBox(data) {
        const parentNode = document.querySelector('.suspenduser-content-box');
        const searchDiv = document.createElement('div');
        searchDiv.classList.add('suspend-id-box');
        searchDiv.innerHTML = 
        `<div class="search-box">
            <input type="search" id="suspend-user-id" placeholder="스마트아이디 입력">
            <button class="btn-suspend-id">검색</button>
        </div>
        <button class="block-user-register">정지회원등록</button>`;

        parentNode.appendChild(searchDiv);
        EventList.bindSearchBanUserEvent();
        EventList.bindSearchInputEnterEvent();
        EventList.bindBlockUserRegisterEvent();

        View.createBanUserTable(data);
    }

    static createBanUserTable(data) {
        const parentNode = document.querySelector('.suspenduser-content-box');

        const prevTable = document.querySelector('.tb-suspend-box');

        if( prevTable !== null ){
            prevTable.remove();
        }

        const table = document.createElement('table');
        table.classList.add('tb-suspend-box');

        let tableHTML = 
        `<thead class="common-suspend-box">
            <tr>
                <th>유니크아이디</th>
                <th>스마트아이디</th>
                <th class="su-reason">사유</th>
                <th>정지횟수</th>
                <th>정지일자</th>
                <th>종료일자</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="suspend-history-box">`;

        for( const el of data ) {
            tableHTML +=
            `<tr>
                <td>${el.userUniqueId}</td>
                <td>${el.trademark}</td>
                <td class="editable-data" data-id="${el.id}" data-memo="${el.blockMemo}">${el.blockMemo}</td>
                <td>${el.blockCount}</td>
                <td>${el.startDate.slice(0,el.startDate.indexOf('/'))}<br>${el.startDate.slice(el.startDate.indexOf('/')+1)}</td>
                <td>${el.endDate.slice(0,el.endDate.indexOf('/'))}<br>${el.endDate.slice(el.endDate.indexOf('/')+1)}</td>
                <td>
                    <span class="detail-date">${el.blockDay}일</span>
                    <button class="btn-clear">해제</button>
                </td>
            </tr>`;
        }

        tableHTML += `</tbody></table>`;
        table.innerHTML = tableHTML;

        parentNode.appendChild(table);

        EventList.bindTableDataEditEvent();
        EventList.bindBanClearEvent();
    }

    static createUserBlockModal() {
        const prevModal = document.querySelector('.user-modal-background');

        if(prevModal !== null) {
            prevModal.remove();
        }

        const body = document.querySelector('body');
        const blockModal = document.createElement('div')
        blockModal.classList.add('user-modal-background');

        blockModal.innerHTML = 
        `<div class="user-block-modal">
            <div class="radio-box">
                <span>정지기간 : </span>
                <input type="radio" id="block-day" name="block-period" value="1" checked="true">
                <label for="block-day">1일</label>
            
                <input type="radio" id="block-week" name="block-period" value="7">
                <label for="block-week">7일</label>
            
                <input type="radio" id="block-month" name="block-period" value="30">
                <label for="block-month">30일</label>
            </div>
            <p class="block-user">대상유저 : <input class="user-id-input" type="text"></p>
            <label for="memo">재제사유</label>
            <textarea id="memo" placeholder="사유를 적어주세요." maxlength="600"></textarea>
            <div class="user-block-button-box">
                <button class="modal-cancel">취소</button>
                <button class="modal-confirm">확인</button>
            </div>
        </div>`;

        blockModal.style.top = (window.innerHeight * 0.25) + scrollY + 'px';
        body.appendChild(blockModal);
        EventList.bindMemoPreventEnter();
        EventList.bindUserBlockEvent();
        EventList.bindModalCancelEvent();
    }

    static destroyUserBlockModal(target) {
        target.parentNode.parentNode.parentNode.remove();
    }

    static viewAlert(msg) {
        alert(msg);
    }
}


export { View };