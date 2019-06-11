import View from './view.js';

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
    static createTable(gameType, url) {
        const promiseResult = Communication.asyncPostPromise(url);
        promiseResult.then((result)=>{
            const resultData = JSON.parse(result);
            if(resultData.errorCode === 0) {
                if(gameType === '좀비레이스') {
                    View.createRaceTable(resultData);
                } else if(gameType === '좀비격투') {
                    View.createFightTable(resultData);
                } else if(gameType === '좀비격파') {
                    View.createBreakTable(resultData);
                } else {
                    View.createDropTable(resultData);
                }
            } else {
                View.viewAlert(resultData.msg);
            }
        }, ()=>{
            View.viewAlert('서버와 통신이 원활하지않습니다.');
        });
    }

    static bindClickEvent() {
        const buttonList = document.querySelectorAll('.mybet-content-box > button');

        for(const button of buttonList) {
            if(!button.classList.contains('on')) {
                button.addEventListener('click', this.changeTable);
            }
        }
    }

    static changeTable(e) {
        const gameType = e.target.innerText;
        const communicationURL = Handler.setURL(gameType);

        Handler.unbindClickEvent();
        View.setColorClass(e.target);
        Handler.createTable(gameType, communicationURL);
        Handler.bindClickEvent();
    }

    // 악의적 통신 요청을 막기위한 click event unbind
    static unbindClickEvent() {
        const buttonList = document.querySelectorAll('.mybet-content-box > button');

        for(const button of buttonList) {
            button.removeEventListener('click', this.changeTable);
        }
    }

    static setURL(targetText) {
        if(targetText === '좀비레이스') {
            return 'http://192.168.0.24:8080/game/myBet/zombieRace';
        } else if(targetText === '좀비격투') {
            return 'http://192.168.0.24:8080/game/myBet/zombieFight';
        } else if(targetText === '좀비격파') {
            return 'http://192.168.0.24:8080/game/myBet/zombieBreak';
        } else {
            return 'http://192.168.0.24:8080/game/myBet/zombieDrop';
        }
    }
}


export default Handler

