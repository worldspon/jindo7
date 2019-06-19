class View {

    // click 된 버튼에 색상 부여
    static setColorClass(clickedButton) {
        const buttonList = document.querySelectorAll('.mybet-content-box > button');

        for(const button of buttonList) {
            button.classList.remove('on');
        }

        clickedButton.classList.add('on');
    }

    static renderRaceTable(resultData) {
        const raceData = resultData;

        let tableTagString = 
        `<table>
            <caption class="tb-main-title">좀비레이스 베팅기록</caption>
            <thead>
                <tr class="myresult-small-title one-line">
                    <th class="date-col">일시</th>
                    <th class="betting-zombie">베팅결과</th>
                    <th class="game-money-col">당첨보상</th>
                    <th class="result-grade">결과</th>
                </tr>
            </thead>
            <tbody>`;

        for(const el of raceData) {
            tableTagString +=
            `<tr class="one-line border-bottom">
                <td>${el.gameCount}회차<br>${el.dateTime}</td>
                <td>${el.zombieName}<br>배팅쿠폰 : ${el.coupon}개</td>
                <td>게임머니 : ${el.resultGameMoney}G<br>랭킹점수 : ${el.resultRank}점</td>
                <td>${el.result}</td>
            </tr>`;
        }

        tableTagString += `</tbody></table>`;

        document.querySelector('.myresult-content-box').innerHTML = tableTagString;
    }

    static renderFightTable(resultData) {
        const fightData = resultData;

        let tableTagString = 
        `<table>
            <caption class="tb-main-title">좀비격투 베팅기록</caption>
            <thead>
                <tr class="myresult-small-title one-line">
                    <th class="date-col">일시</th>
                    <th class="betting-zombie">베팅결과</th>
                    <th class="game-money-col">당첨보상</th>
                    <th class="result-grade">결과</th>
                </tr>
            </thead>
            <tbody>`;

        for(const el of fightData) {
            tableTagString +=
            `<tr class="one-line border-bottom">
                <td>${el.gameCount}회차<br>${el.dateTime}</td>
                <td>${el.zombieName}<br>${el.koChoice}<br>배팅쿠폰 ${el.coupon}개</td>
                <td>게임머니 : ${el.resultGameMoney}G<br>랭킹점수 : ${el.resultRank}점</td>
                <td>${el.gameResult}</td>
            </tr>`;
        }

        tableTagString += `</tbody></table>`;

        document.querySelector('.myresult-content-box').innerHTML = tableTagString;
    }

    static renderBreakTable(resultData) {
        const breakData = resultData;

        let tableTagString = 
        `<table>
            <caption class="tb-main-title">좀비격파 베팅기록</caption>
            <thead>
                <tr class="myresult-small-title one-line">
                    <th class="date-col">일시</th>
                    <th class="betting-zombie">베팅결과</th>
                    <th class="game-money-col">당첨보상</th>
                    <th class="result-grade">결과</th>
                </tr>
            </thead>
            <tbody>`;

        for(const el of breakData) {
            tableTagString +=
            `<tr class="one-line border-bottom">
                <td>${el.gameCount}회차<br>${el.dateTime}</td>
                <td>${el.zombieName}<br>배팅쿠폰 : ${el.coupon}개</td>
                <td>게임머니 : ${el.resultGameMoney}G<br>랭킹점수 : ${el.resultRank}점</td>
                <td>${el.result}</td>
            </tr>`;
        }

        tableTagString += `</tbody></table>`;

        document.querySelector('.myresult-content-box').innerHTML = tableTagString;
    }

    static renderDropTable(resultData) {
        const dropData = resultData;

        let tableTagString = 
        `<table>
            <caption class="tb-main-title">좀비낙하 베팅기록</caption>
            <thead>
                <tr class="myresult-small-title one-line">
                    <th class="date-col">일시</th>
                    <th class="choice-number">선택번호</th> 
                    <th class="goal-times">당첨수</th>
                    <th class="game-reward">당첨보상</th>
                </tr>
            </thead>
            <tbody>`;

        for(const el of dropData) {
            tableTagString +=
            `<tr class="one-line border-bottom">
                <td>${el.gameCount}회차<br>${el.dateTime}</td>
                <td>${el.result}</td>
                <td>${el.matchPoint}</td>
                <td>등수 : ${el.grade}<br>스폰 : ${el.prizeSpon}개<br>게임머니 : ${el.prizeGameMoney}G<br>랭킹점수 : ${el.prizeRank}점</td>
            </tr>`;
        }

        tableTagString += `</tbody></table>`;

        document.querySelector('.myresult-content-box').innerHTML = tableTagString;
    }

    static viewAlert(msg) {
        alert(msg);
    }
}

export { View }