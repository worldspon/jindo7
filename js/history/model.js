import { Init, EventList } from './controller.js';

// search url model
const searchURL = {
    url : 'money'
}

class Communication {
    static asyncPostPromise(url, sendObject) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(sendObject);
        });
    }

    static getPromiseresult(uerId) {
        const sendObject = {
            trademark : uerId
        };
        // 통신 url 정의
        const communicationURL = `/history/${searchURL.url}`;

        const promiseObject = this.asyncPostPromise(communicationURL, JSON.stringify(sendObject));

        promiseObject.then((data) => {
            const resultData = JSON.parse(data);
            if(searchURL.url === 'money') {
                Init.createGameMoneyTable(resultData.moneyHistory);
            } else if(searchURL.url === 'point') {
                Init.createEtcTable(resultData.pointHistory, '포인트');
            } else if(searchURL.url === 'coin') {
                Init.createEtcTable(resultData.coinHistory, '스폰');
            } else if(searchURL.url === 'lockCoin') {
                Init.createEtcTable(resultData.lockCoinHistory, '락스폰');
            } else {
                EventList.catchError('서버와 통신이 원활하지않습니다.');
            }
        }, () => {
            EventList.catchError('서버와 통신이 원활하지않습니다.');
        })
    }
}

class EvnetLogic {
    // 색상 컬러 클래스 추가
    static addButtonColor(clickedButton) {
        clickedButton.classList.add('on');
    }
    // 색상 컬러 클래스 삭제
    static removeButtonColor() {
        const allButton = document.querySelectorAll('.category-btn');
        for(const button of allButton) {
            button.classList.remove('on');
        }
    }
    // 버튼 변경시 url model 변경
    static changeSearchURL(type) {
        searchURL.url = type;
    }

    // 검색어를 이용한 통신 시작
    static searchStart() {
        const searchInput = document.getElementById('search-box');
        const userId = searchInput.value.trim();
        if(userId === '') {
            EventList.catchError('아이디를 입력해주세요.');
        } else {
            Communication.getPromiseresult(userId);
        }
        
    }
}

export { EvnetLogic };