import View from './view.js';

class Communication {
    static asyncPostPromise(url) {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            const connectURL = 'http://www.worldspon.net/game/myBet/1670';
            const userUID = connectURL.slice(connectURL.lastIndexOf('/')+1);
            const sendObject = {
                appid : '1670'
            }
            xhr.send(JSON.stringify(sendObject));
        })
    }
}

class Handler {
    static createFirstTable() {
        const userGameData = Communication.asyncPostPromise('http://192.168.0.24:8080/game/myBet/zombieRace');
        userGameData.then((result)=>{
            const resultData = JSON.parse(result);
            View.createRaceTable(resultData);
        }, ()=>{
            console.log("서버통신 불가");
        })
    }
}


export { Communication, Handler }

