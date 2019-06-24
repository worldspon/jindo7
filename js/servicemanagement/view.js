class View {
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
    }

    static viewAlert(msg) {
        alert(msg);
    }
}

export { View };