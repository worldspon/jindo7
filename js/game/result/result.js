// import '@babel/polyfill';
import { Init } from './controller.js';


// 접속기기 판단
Init.confirmViewDevice();

// 카운트 시작
Init.setFiveCountDown();
Init.setThreeCountDown();

// 오늘 결과 통신
Init.firstCommunication();
// 어제 결과 통신
Init.getYesterdayData();

// event binding
Init.bindEvent();