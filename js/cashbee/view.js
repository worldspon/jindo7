import { EventList } from './controller.js';

class View {

    static clearElement() {
        const parentNode = document.querySelector('.cashbeeadmin-content-box');
        parentNode.innerHTML = ``;
    }

    static createCashbeeSearchBox() {
        View.clearElement();
        
        const parentNode = document.querySelector('.cashbeeadmin-content-box');
        const div = document.createElement('div');
        div.classList.add('search-id-box');
        div.innerHTML = 
        `<input type="search" id="personal-id" placeholder="사용자 스마트 아이디">
        <button class="btn-search-id">검색</button>`;

        parentNode.appendChild(div);
        EventList.bindCashbeeSearchEvent();
        EventList.bindSearchInputEnterEvent();
    }
    static createCashbeeList(data) {

        const parentNode = document.querySelector('.cashbeeadmin-content-box');
        const prevTable = document.querySelector('.tb-cashbee-box');
        if( prevTable !== null ) {
            prevTable.remove();
        }

        const tableNode = document.createElement('table');
        tableNode.classList.add('tb-cashbee-box');

        let cashbeeTableHTML =  
        `<thead class="common-cashbee-box">
            <tr>
                <th class="cg-num">NO</th>
                <th class="cg-date">일시</th>
                <th class="cg-user">유저번호</th>
                <th class="cg-nickname">닉네임</th>
                <th class="cg-card">카드 No.</th>
                <th class="cg-tid">TID</th>
                <th>포인트</th>
            </tr>
        </thead>
        <tbody class="cashbee-history-box">`;

        for(const el of data) {
            cashbeeTableHTML +=
            `<tr>
                <td>${el.uniqueId}</td>
                <td>${el.viewDateTime}</td>
                <td>${el.userUniqueId}</td>
                <td>${el.trademark}</td>
                <td>${el.cardNo}</td>
                <td>${el.tid}</td>
                <td>${el.viewPoint}</td>
            </tr>`;
        }
        cashbeeTableHTML += `</tbody>`;
        tableNode.innerHTML = cashbeeTableHTML;
        parentNode.appendChild(tableNode);
    }

    static createLockPointList(data) {
        View.clearElement();
        const parentNode = document.querySelector('.cashbeeadmin-content-box');

        const paragraph = document.createElement('p');
        paragraph.classList.add('heading-lock');
        paragraph.innerText = '캐시비 락포인트 목록';

        const table = document.createElement('table');
        table.classList.add('tb-lockpoint-box');

        let lockPointTableHTML =
        `<thead class="common-lockpoint-box">
            <tr>
                <th class="cl-num">No</th>
                <th class="cl-date">일시</th>
                <th>유저번호</th>
                <th>닉네임</th>
                <th class="cl-card">카드 No.</th>
                <th class="cl-tid">TID</th>
                <th>포인트</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="cashbee-lockpoint-box">`;

        for(const el of data) {
            lockPointTableHTML +=
            `<tr>
                <td>${el.uniqueId}</td>
                <td>${el.viewDateTime}</td>
                <td>${el.userUniqueId}</td>
                <td>${el.trademark}</td>
                <td>${el.cardNo}</td>
                <td>${el.tid}</td>
                <td>${el.viewPoint}</td>
                <td>
                    ${el.state === 0 ? `<button class="btn-point-confirm" data-id="${el.uniqueId}">해제</button>` : '해제완료'}
                </td>
            </tr>`
        }

        table.innerHTML = lockPointTableHTML;

        parentNode.appendChild(paragraph);
        parentNode.appendChild(table);

        EventList.bindLockPointClearEvent();
    }
    static viewAlert(msg) {
        alert(msg);
    }
}

export { View };