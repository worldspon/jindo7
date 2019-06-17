import {Init} from './controller.js.js'

// 통신 URL 객체
const gameURL = {
    '좀비레이스' : 'http://192.168.0.24:8080/game/myBet/zombieRace',
    '좀비격투' : 'http://192.168.0.24:8080/game/myBet/zombieFight',
    '좀비격파' : 'http://192.168.0.24:8080/game/myBet/zombieBreak',
    '좀비낙하' : 'http://192.168.0.24:8080/game/myBet/zombieDrop'
}

class Communication {
    static asyncPostPromise(url) {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            const connectURL = window.location.href;
            const userUID = connectURL.slice(connectURL.lastIndexOf('/')+1);
            const sendObject = {
                appid : userUID
            }
            xhr.send(JSON.stringify(sendObject));
        })
    }
}

class Handler {
    // 테이블 데이터 통신 함수
    static getTableData(gameType, url) {
        const promiseResult = Communication.asyncPostPromise(url);
        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                if(gameType === '좀비레이스') {
                    Init.createRaceTable(resultData.race);
                } else if(gameType === '좀비격투') {
                    Init.createFightTable(resultData.fight);
                } else if(gameType === '좀비격파') {
                    Init.createBreakTable(resultData.break);
                } else {
                    Init.createDropTable(resultData.drop);
                }
            } else {
                Init.catchError(resultData.msg);
            }
        }, ()=>{
            Init.catchError('서버와 통신이 원활하지않습니다.');
        });
    }

    // click evnet bind
    static bindClickEvent() {
        const buttonList = document.querySelectorAll('.mybet-content-box > button');

        for(const button of buttonList) {
            if(!button.classList.contains('on')) {
                button.addEventListener('click', this.changeTable);
            }
        }
    }

    // click시 table 변환
    static changeTable(e) {
        const gameType = e.target.innerText;
        const communicationURL = gameURL[gameType];

        Handler.unbindClickEvent();
        Init.changeButtonColor(e.target);
        if(gameType === '좀비레이스') {
            Handler.getTableData(gameType, communicationURL);
        } else if(gameType === '좀비격투') {
            Handler.getTableData(gameType, communicationURL);
        } else if(gameType === '좀비격파') {
            Handler.getTableData(gameType, communicationURL);
        } else {
            Handler.getTableData(gameType, communicationURL);
        }
        Handler.bindClickEvent();
    }

    // 악의적 통신 요청을 막기위한 click event unbind
    static unbindClickEvent() {
        const buttonList = document.querySelectorAll('.mybet-content-box > button');

        for(const button of buttonList) {
            button.removeEventListener('click', this.changeTable);
        }
    }
}

export { gameURL, Handler };