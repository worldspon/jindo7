import '@babel/polyfill';
import { Init } from './controller.js';

// 첫 접속시 통신
Init.communicationTableData();
Init.bindEvent();