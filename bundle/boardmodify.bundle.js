!function(t){var r={};function o(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=r,o.d=function(n,e,t){o.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},o.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(e,"a",e),e},o.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},o.p="",o(o.s=5)}({5:function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function o(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function u(n,e,t){return e&&o(n.prototype,e),t&&o(n,t),n}t.r(e);var i=function(){function n(){r(this,n)}return u(n,null,[{key:"postPromise",value:function(r,o){return new Promise(function(n,e){var t=new XMLHttpRequest;t.open("POST",r),t.setRequestHeader("Content-Type","application/json"),t.onload=function(){return n(t.responseText)},t.onerror=function(){return e(t.statusText)},t.send(JSON.stringify(o))})}}]),n}(),c=function(){function e(){r(this,e)}return u(e,null,[{key:"modifyBoard",value:function(){var n=e.checkNull();n?i.postPromise("/board/modify",n).then(function(n){var e=JSON.parse(n);v.catchError(e.msg),0===e.errorCode?window.location.href="/board/content/".concat(e.boardId):v.catchError(e.msg)},function(){v.catchError("서버와 통신이 원활하지 않습니다.")}):v.catchError("내용을 전부 입력해주세요.")}},{key:"checkNull",value:function(){var n={boardId:null,title:null,content:null},e=document.querySelector(".board-writing-title"),t=document.querySelector(".board-writing-content");return""!==e.value.trim()&&""!==t.value.trim()&&(n.boardId=document.querySelector(".board-writing-title-box").dataset.boardId,n.title=e.value.trim(),n.content=t.value.trim(),n)}}]),e}();function a(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}var l=function(){function n(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n)}return function(n,e,t){e&&a(n.prototype,e),t&&a(n,t)}(n,null,[{key:"viewAlert",value:function(n){alert(n)}}]),n}();function f(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function d(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function s(n,e,t){return e&&d(n.prototype,e),t&&d(n,t),n}var b=function(){function n(){f(this,n)}return s(n,null,[{key:"bindEvent",value:function(){y.bindModifyButtonClickEnvet(),y.bindCancelButtonClickEvent()}}]),n}(),v=function(){function n(){f(this,n)}return s(n,null,[{key:"catchError",value:function(n){l.viewAlert(n)}}]),n}(),y=function(){function n(){f(this,n)}return s(n,null,[{key:"bindModifyButtonClickEnvet",value:function(){document.querySelector(".btn-writing").addEventListener("click",c.modifyBoard)}},{key:"bindCancelButtonClickEvent",value:function(){document.querySelector(".btn-cancel").addEventListener("click",function(){window.history.back()})}}]),n}();b.bindEvent()}});