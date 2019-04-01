"use strict";
'use strict;';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var faqContent = document.querySelector('.faq-content');
var faqContentWrap = document.querySelector('.faq-content-wrap');
var pagenationInner = document.querySelector('.pagination-inner');
var firstBtn = document.querySelector('.first-btn');
var prevBtn = document.querySelector('.prev-btn');
var nextBtn = document.querySelector('.next-btn');
var lastBtn = document.querySelector('.last-btn');
var faqUrl = 'js/noticeall.json';
var pageNum, lastPage, startPage, endPage, contentLength; //현재 페이지

var nowPage = 1; // 한 페이지 최대 게시물

var maxContent = 20; // 한 phrase에 표현 될 게시판 수

var countPage = 5; // 첫 로드시 1페이지 마크업

firstLoadAsync(faqUrl, 1); // 처음 버튼 클릭시 첫 페이지로

firstBtn.addEventListener('click', function () {
  setPageAsync(faqUrl, 1);
}); // 이전 버튼 클릭시 1phrase 이전 페이지로 이동

prevBtn.addEventListener('click', function () {
  if (nowPage - countPage >= 1) {
    nowPage -= countPage;
    setPageAsync(faqUrl, nowPage);
  } else {
    nowPage = 1;
    setPageAsync(faqUrl, 1);
  }
}); // 다음 버튼 클릭시 1phrase 다음 페이지로 이동

nextBtn.addEventListener('click', function () {
  console.log(lastPage);

  if (nowPage + countPage < lastPage) {
    nowPage += countPage;
    setPageAsync(faqUrl, nowPage);
  } else {
    nowPage = lastPage;
    setPageAsync(faqUrl, lastPage);
  }
}); // 마지막 버튼 클릭시 마지막으로

lastBtn.addEventListener('click', function () {
  setPageAsync(faqUrl, lastPage);
});
/**
 * @brief promise 객체 생성
 * @author JJH
 * @see url만 바꿔서 쓰면 된다.
 */

function AsyncValidateFnc(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = function () {
      return resolve(xhr.responseText);
    };

    xhr.onerror = function () {
      return reject(xhr.statusText);
    };

    xhr.send();
  });
}

;
/**
 * @brief 페이지 최초 로드시 비동기 통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 * @param nowPage 현재 페이지
 */

function firstLoadAsync(_x, _x2) {
  return _firstLoadAsync.apply(this, arguments);
}

function _firstLoadAsync() {
  _firstLoadAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url, nowPage) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return AsyncValidateFnc(url);

          case 3:
            data = _context.sent;
            firstPageLoad(data, nowPage);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _firstLoadAsync.apply(this, arguments);
}

;
/**
 * @brief 현재 페이지 값을 받아 해당 페이지를 로드하는 비동기 통신
 * @author JJH
 * @param url 통신할 url
 * @param nowPage 현재 페이지
 */

function setPageAsync(_x3, _x4) {
  return _setPageAsync.apply(this, arguments);
}

function _setPageAsync() {
  _setPageAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(url, nowPage) {
    var data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return AsyncValidateFnc(url);

          case 3:
            data = _context2.sent;
            setPageData(data, nowPage);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _setPageAsync.apply(this, arguments);
}

;
/**
 * @brief 페이지 최초 로드시 비동기 통신, promise 생성 후 검증
 * @author JJH
 * @param data json 데이터
 * @param viewPage 보여줄 페이지, nowPage 기본값으로 제어 가능
 */

function firstPageLoad(data, viewPage) {
  var myData = JSON.parse(data);
  myData = myData.notice;
  contentLength = myData.length;
  lastPage = contentLength % maxContent > 0 ? Math.floor(contentLength / maxContent) + 1 : Math.floor(contentLength / maxContent);
  startPage = Math.floor((viewPage - 1) / countPage) * countPage + 1;
  endPage = startPage + countPage - 1;
  endPage > lastPage ? endPage = lastPage : endPage = endPage;
  var tempHtml = '';

  if (contentLength <= maxContent) {
    for (var i = 0; i < contentLength; i++) {
      tempHtml += "<div class='faq-content border-bottom'>\n            <div class='faq-content-hl'>\n                <a href='faqcontent.html'><span class='question-span'>Q.</span> ".concat(myData[i].title, "</a>\n            </div>\n        </div>");
    }
  } else {
    for (var _i = 0; _i < maxContent; _i++) {
      tempHtml += "<div class='faq-content border-bottom'>\n            <div class='faq-content-hl'>\n                <a href='faqcontent.html'><span class='question-span'>Q.</span> ".concat(myData[_i].title, "</a>\n            </div>\n        </div>");
    }
  }

  faqContentWrap.innerHTML = tempHtml;
  tempHtml = '';

  for (var _i2 = startPage; _i2 <= endPage; _i2++) {
    viewPage == _i2 ? tempHtml += "<li class='page-number' style='font-weight:700;'>".concat(_i2, "</li>") : tempHtml += "<li class='page-number'>".concat(_i2, "</li>");
  }

  pagenationInner.innerHTML = tempHtml;
  pageNum = document.querySelectorAll('.page-number');
  Array.from(pageNum).forEach(function (el) {
    el.addEventListener('click', function () {
      viewPage = parseInt(this.innerText);
      setPageAsync('js/noticeall.json', viewPage);
    });
  });
}
/**
 * @brief 버튼으로 이동한 페이지 로드
 * @author JJH
 * @param data json 데이터
 * @param viewPage 보여줄 페이지
 */


function setPageData(data, viewPage) {
  var myData = JSON.parse(data);
  myData = myData.notice;
  var startContent, endContent;
  startPage = Math.floor((viewPage - 1) / countPage) * countPage + 1;
  endPage = startPage + countPage - 1;
  endPage > lastPage ? endPage = lastPage : endPage = endPage;
  startContent = (viewPage - 1) * maxContent;
  endContent = viewPage * maxContent;
  var tempHtml = '';

  if (endContent >= contentLength) {
    for (var i = startContent; i < contentLength; i++) {
      tempHtml += "<div class='faq-content border-bottom'>\n            <div class='faq-content-hl'>\n                <a><span class='question-span'>Q.</span> ".concat(myData[i].title, "</a>\n            </div>\n        </div>");
    }
  } else {
    for (var _i3 = startContent; _i3 < endContent; _i3++) {
      tempHtml += "<div class='faq-content border-bottom'>\n            <div class='faq-content-hl'>\n                <a><span class='question-span'>Q.</span> ".concat(myData[_i3].title, "</a>\n            </div>\n        </div>");
    }
  }

  faqContentWrap.innerHTML = tempHtml;
  tempHtml = '';

  for (var _i4 = startPage; _i4 <= endPage; _i4++) {
    viewPage == _i4 ? tempHtml += "<li class='page-number' style='font-weight:700;'>".concat(_i4, "</li>") : tempHtml += "<li class='page-number'>".concat(_i4, "</li>");
  }

  pagenationInner.innerHTML = tempHtml;
  pageNum = document.querySelectorAll('.page-number');
  Array.from(pageNum).forEach(function (el) {
    el.addEventListener('click', function () {
      viewPage = parseInt(this.innerText);
      setPageAsync(faqUrl, viewPage);
    });
  });
  nowPage = viewPage;
}

;