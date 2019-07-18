import { EventList } from './controller.js';

class View {
    static createBanUserBox(data) {
        const parentNode = document.querySelector('.suspenduser-content-box');
        const searchDiv = document.createElement('div');
        searchDiv.classList.add('suspend-id-box');
        searchDiv.innerHTML = 
        `<input type="search" id="suspend-user-id" placeholder="스마트아이디 입력">
        <button class="btn-suspend-id">검색</button>`;

        parentNode.appendChild(searchDiv);
        EventList.bindSearchBanUserEvent();
        EventList.bindSearchInputEnterEvent();

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
                <td>${el.startDate}</td>
                <td>${el.endDate}</td>
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

    static viewAlert(msg) {
        alert(msg);
    }
}

export { View };