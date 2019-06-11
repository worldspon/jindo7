class View {

    // click 된 버튼에 색상 부여
    static setColorClass(clickedButton) {
        const buttonList = document.querySelectorAll('.mybet-content-box > button');

        for(const button of buttonList) {
            button.classList.remove('on');
        }

        clickedButton.classList.add('on');
    }

    static createRaceTable(resultData) {
        const raceData = resultData.race;

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

    static createFightTable(resultData) {
        const fightData = resultData.fight;

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

    static createBreakTable(resultData) {
        const breakData = resultData.break;

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

    static createDropTable(resultData) {
        const dropData = resultData.drop;

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
                <td>최고등수 : ${el.grade}<br>스폰 : ${el.prizeSpon}개<br>게임머니 : ${el.prizeGameMoney}G<br>랭킹점수 : ${el.prizeRank}점</td>
            </tr>`;
        }

        tableTagString += `</tbody></table>`;

        document.querySelector('.myresult-content-box').innerHTML = tableTagString;
    }

    static viewAlert(msg) {
        alert(msg);
    }
}

export default View