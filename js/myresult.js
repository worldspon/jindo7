'use strict';

const myResultContentBox = document.querySelector('.myresult-content-box');
const gameCategoryButton = document.querySelectorAll('.mybet-content-box > button');

gameCategoryButton.forEach((gameButton)=>{
    gameButton.addEventListener('click', function() {

        setColorClass(this);

        if(this.innerText == '좀비낙하') {
            createDropTable(this.innerText);
        } else {
            createTable(this.innerText);
        }
    })
})

function setColorClass(clickedButton) {
    gameCategoryButton.forEach((nonClickedButton)=>{
        nonClickedButton.classList.remove('on');
    });
    clickedButton.classList.add('on');
}

function createTable(gameTitle) {
    myResultContentBox.innerHTML = `<table>
    <caption class="tb-main-title">${gameTitle} 결과표 내용</caption>
    <thead>
        <tr class="myresult-small-title one-line">
            <th>일시</th>
            <th class="count-star">회차</th> 
            <th>베팅한 <span class="more-spare">좀비</span></th>
            <th>베팅쿠폰</th>
            <th>당첨 <span class="more-spare">게임머니</span></th>
            <th>당첨 <span class="more-spare">랭킹점수</span></th>
            <th class="result-grade">결과<span class="more-spare">(등수)</span></th>
        </tr>
    </thead>
    <tbody>
        <tr class="one-line border-bottom">
            <td>19.05.02</td>
            <td>488</td>
            <td>코코엄마</td>
            <td>1</td>
            <td>38,000</td>
            <td>12,800</td>
            <td>1</td>
        </tr>
        <tr class="one-line border-bottom">
            <td>19.05.02</td>
            <td>16</td>
            <td>군인</td>
            <td>2</td>
            <td>24,000</td>
            <td>5,000</td>
            <td>무승부</td>
        </tr>
        <tr class="one-line border-bottom">
            <td>19.05.02</td>
            <td>16</td>
            <td>피아니스트</td>
            <td>2</td>
            <td>0</td>
            <td>0</td>
            <td>KO</td>
        </tr>
        <tr class="one-line border-bottom">
            <td>19.05.02</td>
            <td>16</td>
            <td>교통경찰</td>
            <td>2</td>
            <td>0</td>
            <td>0</td>
            <td>판정승</td>
        </tr>
        <tr class="one-line border-bottom">
            <td>19.05.02</td>
            <td>16</td>
            <td>간호사</td>
            <td>2</td>
            <td>0</td>
            <td>0</td>
            <td>5</td>
        </tr>
    </tbody>
</table>`;
}

function createDropTable(gameTitle) {
    myResultContentBox.innerHTML = `<table>
    <caption class="tb-main-title">${gameTitle} 결과표 내용</caption>
    <thead>
        <tr class="myresult-small-title one-line">
            <th class="drop-date">일시</th>
            <th class="drop-times">회차</th>
            <th class="selected-num">선택번호</th>
            <th class="goal-times">당첨수</th>
            <th class="goal-money">당첨 <span class="more-spare">게임머니</span></th>
            <th class="goal-spons">당첨 <span class="more-spare">스폰</span></th>
            <th class="goal-rank">당첨 <span class="more-spare">랭킹점수</span></th>
            <th class="high-grade">최고<span class="more-spare">등수</span></th>
        </tr>
    </thead>
    <tbody>
        <tr class="one-line border-bottom">
            <td>2019.05.07</td>
            <td>288</td>
            <td>14/16/20/22/26</td>
            <td>5</td>
            <td>100,000</td>
            <td>100</td>
            <td>200,000</td>
            <td>5등</td>
        </tr>
        <tr class="one-line border-bottom">
            <td>2019.05.07</td>
            <td>288</td>
            <td>5/19/22/27/28</td>
            <td>4</td>
            <td>100,000</td>
            <td>100</td>
            <td>200,000</td>
            <td>5등</td>
        </tr>
        <tr class="one-line border-bottom">
            <td>2019.05.07</td>
            <td>288</td>
            <td>14/16/20/22/26</td>
            <td>5</td>
            <td>100,000</td>
            <td>100</td>
            <td>200,000</td>
            <td>꽝</td>
        </tr>
    </tbody>
</table>`;
}