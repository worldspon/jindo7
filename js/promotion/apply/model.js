import { Dynamic } from './controller.js';

const communicationURL = 'http://192.168.0.24:8080/promotion/request';
const basicPrice = 17;

class Communication {

    static postPromise(url, sendObject) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(sendObject));
        })
    }

}

class EventLogic {
    static changePeriod(e) {
        const eventTarget = e.target;
        const priceBox = document.querySelector('.detail-price');
        for(const option of eventTarget.children) {
            if( option.selected === true ) {
                priceBox.innerText = option.value * basicPrice;
            }
        }
    }

    static changeColor(e) {
        const eventTarget = e.target;
        const adTextArea = document.querySelector('.ad-text-space');

        for(const option of eventTarget.children) {
            if( option.selected === true ) {
                eventTarget.style.backgroundColor = option.style.backgroundColor;
                eventTarget.style.color = 'white';

                const tempText = adTextArea.value;
                adTextArea.value = '';
                adTextArea.style.color = option.style.backgroundColor;
                adTextArea.value = tempText;
            }
        }
    }

    static applyAdvertisement() {
        const periodSelectBox = document.querySelector('.ad-how-long');
        const periodValue = periodSelectBox.options[periodSelectBox.selectedIndex].value;

        const colorSelectBox = document.querySelector('.ad-color');
        const colorValue = colorSelectBox.options[colorSelectBox.selectedIndex].value;

        const adTextArea = document.querySelector('.ad-text-space');

        if( periodValue !== '' && colorValue !== '' &&  adTextArea.value.trim() !== '') {
            const sendObject = {
                chat : adTextArea.value.trim().replace(/\n/g, ''), 
                colorKey : colorValue, 
                state : 0,
                useDate : periodValue
            }

            const promiseResult = Communication.postPromise(communicationURL, sendObject);

            promiseResult.then((result) => {
                const resultData = JSON.parse(result);
                Dynamic.catchError(resultData.msg);

                if(resultData.errorCode === 0 ){
                    window.location = './adlist';
                }
            }, () => {
                Dynamic.catchError('서버와 통신이 원활하지않습니다.');
            })
        } else {
            Dynamic.catchError('모든 항목을 입력해주세요.');
        }
    }
}

export { EventLogic };