class View {
    static renderGameMoneyTable(data) {
        View.removeTable();
        const tableParent = document.querySelector('.moneyhistory-content-box');
        const tableNode = document.createElement('table');
        tableNode.classList.add('gameing-history');

        let tableInnerHTML = 
        `<thead class="main-tb-subject">
            <tr>
                <th class="gm-no">No</th>
                <th class="gm-date">일시</th>
                <th>유저번호</th>
                <th class="gm-name">닉네임</th>
                <th>코드</th>
                <th>게임회차</th>
                <th>획득게임머니</th>
                <th>전</th>
                <th>후</th>
                <th class="gm-memo">메모</th>
            </tr>
        </thead>
        <tbody class="history-tb">`;

        for(const el of data) {
            
            tableInnerHTML +=
            `<tr>
                <td>${el.uniqueId}</td>
                <td>${el.viewDateTime}</td>
                <td>${el.userUniqueId}</td>
                <td>${el.trademark}</td>
                <td>${el.processCode}</td>
                <td>${el.gameCount}</td>
                <td>${el.viewMoney}</td>
                <td>${el.viewBeforeMoney}</td>
                <td>${el.viewAfterMoney}</td>
                <td>${el.memo}</td>
            </tr>`;
        }

        tableInnerHTML += `</tbody></table>`;
        tableNode.innerHTML = tableInnerHTML;
        tableParent.appendChild(tableNode);

    }

    static renderEtcTable(data, type) {
        View.removeTable();
        const tableParent = document.querySelector('.moneyhistory-content-box');
        const tableNode = document.createElement('table');
        tableNode.classList.add('gameing-history');

        let tableInnerHTML = 
        `<thead class="main-tb-subject">
            <tr>
                <th class="gm-no">No</th>
                <th class="gm-date">일시</th>
                <th>유저번호</th>
                <th class="gm-name">닉네임</th>
                <th>코드</th>
                <th>획득${type}</th>
                <th>전</th>
                <th>후</th>
                <th class="gm-memo">메모</th>
            </tr>
        </thead>
        <tbody class="history-tb">`;

        for(const el of data) {
            tableInnerHTML +=
            `<tr>
                <td>${el.uniqueId}</td>
                <td>${el.viewDateTime}</td>
                <td>${el.userUniqueId}</td>
                <td>${el.trademark}</td>
                <td>${el.processCode}</td>
                <td>${type === '포인트' ? el.viewPoint : type === '스폰' ? el.viewCoin : el.viewLockCoin}</td>
                <td>${type === '포인트' ? el.viewBeforePoint : type === '스폰' ? el.viewBeforeCoin : el.viewBeforeLockCoin}</td>
                <td>${type === '포인트' ? el.viewAfterPoint : type === '스폰' ? el.viewAfterCoin : el.viewAfterLockCoin}</td>
                <td>${el.memo}</td>
            </tr>`;
        }

        tableInnerHTML += `</tbody></table>`;
        tableNode.innerHTML = tableInnerHTML;
        tableParent.appendChild(tableNode);
    }

    static removeTable() {
        const prevTable = document.querySelector('.gameing-history');
        if(prevTable !== null) {
            prevTable.remove();
        }
    }

    static viewAlert(msg) {
        alert(msg)
    }
}

export { View };