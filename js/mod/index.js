"use strict";
'use strict;';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var prevMonthLeft = document.querySelector('.prev-month > .profit-left');
var prevMonthRight = document.querySelector('.prev-month > .profit-right');
var currentMonthLeft = document.querySelector('.current-month > .profit-left');
var currentMonthRight = document.querySelector('.current-month > .profit-right');
var changePercentageRight = document.querySelector('.change-percentage > .profit-right');
var mainChartParent = document.querySelector('.profit-chart-content');
var noticeBoxContent = document.querySelector('.notice-box-content');
var faqBoxContent = document.querySelector('.faq-box-content');
var gameTableContent = document.querySelectorAll('.game-table-content');
var mainChart = ''; //비동기통신

profitAsync('js/index.json');
chartAsync('js/index.json');
noticeAsync('js/index.json');
faqAsync('js/index.json');
raceAsync('js/index.json');
fightAsync('js/index.json');
breakAsync('js/index.json');
dropAsync('js/index.json');
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
 * @brief 수익금 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */

function profitAsync(_x) {
  return _profitAsync.apply(this, arguments);
}

function _profitAsync() {
  _profitAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url) {
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
            setProfitData(data);
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
  return _profitAsync.apply(this, arguments);
}

;
/**
 * @brief 차트 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */

function chartAsync(_x2) {
  return _chartAsync.apply(this, arguments);
}

function _chartAsync() {
  _chartAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(url) {
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
            setChartData(data);
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
  return _chartAsync.apply(this, arguments);
}

;
/**
 * @brief 공지사항 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */

function noticeAsync(_x3) {
  return _noticeAsync.apply(this, arguments);
}

function _noticeAsync() {
  _noticeAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(url) {
    var data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return AsyncValidateFnc(url);

          case 3:
            data = _context3.sent;
            setNoticeData(data);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _noticeAsync.apply(this, arguments);
}

;
/**
 * @brief FAQ 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */

function faqAsync(_x4) {
  return _faqAsync.apply(this, arguments);
}

function _faqAsync() {
  _faqAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(url) {
    var data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return AsyncValidateFnc(url);

          case 3:
            data = _context4.sent;
            setFaqData(data);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _faqAsync.apply(this, arguments);
}

;
/**
 * @brief 좀비레이스 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */

function raceAsync(_x5) {
  return _raceAsync.apply(this, arguments);
}

function _raceAsync() {
  _raceAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(url) {
    var data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return AsyncValidateFnc(url);

          case 3:
            data = _context5.sent;
            setRaceData(data);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return _raceAsync.apply(this, arguments);
}

;
/**
 * @brief 좀비격투 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */

function fightAsync(_x6) {
  return _fightAsync.apply(this, arguments);
}

function _fightAsync() {
  _fightAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(url) {
    var data;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return AsyncValidateFnc(url);

          case 3:
            data = _context6.sent;
            setFightData(data);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return _fightAsync.apply(this, arguments);
}

;
/**
 * @brief 좀비격파 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */

function breakAsync(_x7) {
  return _breakAsync.apply(this, arguments);
}

function _breakAsync() {
  _breakAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(url) {
    var data;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return AsyncValidateFnc(url);

          case 3:
            data = _context7.sent;
            setBreakData(data);
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _breakAsync.apply(this, arguments);
}

;
/**
 * @brief 좀비격파 비동기통신, promise 생성 후 검증
 * @author JJH
 * @param url 통신할 url
 */

function dropAsync(_x8) {
  return _dropAsync.apply(this, arguments);
}

function _dropAsync() {
  _dropAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(url) {
    var data;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return AsyncValidateFnc(url);

          case 3:
            data = _context8.sent;
            setDropData(data);
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return _dropAsync.apply(this, arguments);
}

;
/**
 * @brief 월별 수익금, 증감률 계산후 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */

function setProfitData(data) {
  // 화폐 표기 format 저장
  var currencyFormat = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  var myData = JSON.parse(data); // 데이터 조회를 위해 월 데이터를 YYYYMM 형식으로 저장

  var nowMonth = "".concat(new Date().getFullYear(), "0").concat(new Date().getMonth() + 1);
  var prevMonth, nowMonthValue, prevMonthValue, chPercentage; // 현재월이 1월인 경우 대응

  if (new Date().getMonth() == 0) {
    prevMonth = "".concat(new Date().getFullYear(), "0").concat(new Date().getMonth() + 11);
    currentMonthLeft.innerText = "".concat(new Date().getMonth() + 1, "\uC6D4 \uCD1D \uAD11\uACE0\uC218\uC775\uAE08");
    prevMonthLeft.innerText = "".concat(new Date().getMonth() + 11, "\uC6D4 \uCD1D \uAD11\uACE0\uC218\uC775\uAE08");
  } else {
    prevMonth = "".concat(new Date().getFullYear(), "0").concat(new Date().getMonth());
    currentMonthLeft.innerText = "".concat(new Date().getMonth() + 1, "\uC6D4 \uCD1D \uAD11\uACE0\uC218\uC775\uAE08");
    prevMonthLeft.innerText = "".concat(new Date().getMonth(), "\uC6D4 \uCD1D \uAD11\uACE0\uC218\uC775\uAE08");
  } // 키, 값 조회 후 존재하면 입력 - 전월


  Array.from(myData.totalProfit).forEach(function (el) {
    if (el[prevMonth] != undefined) {
      prevMonthValue = el[prevMonth];
      prevMonthRight.innerText = "".concat(currencyFormat.format(el[prevMonth]));
    }
  }); // 키, 값 조회 후 존재하면 입력 - 당월

  Array.from(myData.totalProfit).forEach(function (el) {
    if (el[nowMonth] != undefined) {
      nowMonthValue = el[nowMonth];
      currentMonthRight.innerText = "".concat(currencyFormat.format(el[nowMonth]));
    }
  }); // 증감률 계산

  chPercentage = (nowMonthValue - prevMonthValue) / nowMonthValue * 100;

  if (!Number.isInteger(chPercentage)) {
    changePercentageRight.innerText = "".concat(chPercentage.toFixed(2), "%");
  } else {
    changePercentageRight.innerText = "".concat(chPercentage, "%");
  }

  if (chPercentage != 0) {
    changePercentageRight.style.color = chPercentage > 0 ? 'green' : 'red';
  }
}

;
/**
 * @brief 차트 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */

function setChartData(data) {
  var myData = JSON.parse(data);
  var nowDate = new Date().getDate(); // 날짜 데이터 저장 배열

  var dateAry = []; // 값 데이터 저장 배열

  var valueAry = []; // 여백을 위한 공백 데이터 추가

  dateAry.push('');
  valueAry.push(null); // 최근 일주일 데이터 입력

  for (var i = nowDate - 6; i <= nowDate; i++) {
    dateAry.push("".concat(i, "\uC77C"));
    Array.from(myData.dailyProfit).forEach(function (el) {
      if (el[i] != undefined) {
        valueAry.push(el[i]);
      }
    });
  } // 여백을 위한 공백 데이터 추가


  dateAry.push('');
  valueAry.push(null); // 날짜, 값 데이터로 차트 생성

  createMainChart(dateAry, valueAry); // 생성 후 차트 객체

  var chartAfterRender = document.getElementById("index-profit-chart"); // window resize시 canvas size 변경

  window.addEventListener('resize', function () {
    if (window.innerWidth <= 500) {
      chartAfterRender.style.height = '200px';
      mainChart.update();
    } else if (window.innerWidth <= 960) {
      chartAfterRender.style.height = '300px';
      mainChart.update();
    } else {
      chartAfterRender.style.height = '500px';
      mainChart.update();
    }
  });
}

;
/**
 * @brief 공지사항 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */

function setNoticeData(data) {
  var myData = JSON.parse(data);
  var tempHtml = '';
  myData.notice.forEach(function (el) {
    tempHtml += "<div class='board-content'>\n            <span class='board-content-header'>".concat(el.title, "</span>\n            <span class='board-content-date'>").concat(el.date, "</span>\n        </div>");
  });
  noticeBoxContent.innerHTML = tempHtml;
}

;
/**
 * @brief FAQ 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */

function setFaqData(data) {
  var myData = JSON.parse(data);
  var tempHtml = '';
  myData.faq.forEach(function (el) {
    tempHtml += "<div class='board-content'>\n            <span class='board-content-header'>".concat(el.title, "</span>\n            <span class='board-content-date'>").concat(el.date, "</span>\n        </div>");
  });
  faqBoxContent.innerHTML = tempHtml;
}

;
/**
 * @brief 좀비레이스 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */

function setRaceData(data) {
  var myData = JSON.parse(data);
  var tempHtml = "<tr class='game-table-row'>\n        <th class='col'>\uD68C\uCC28</th>\n        <th>1\uB4F1</th>\n        <th>2\uB4F1</th>\n        <th>3\uB4F1</th>\n        <th>4\uB4F1</th>\n        <th>5\uB4F1</th>\n    </tr>";
  myData.zombierace.forEach(function (el) {
    tempHtml += "<tr class='game-table-row'>\n            <th class='col'>".concat(el.turn, "</th>");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = el.result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;
        tempHtml += "<td>".concat(i, "</td>");
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    ;
    tempHtml += "</tr>";
  });
  gameTableContent[0].innerHTML = tempHtml;
}

;
/**
 * @brief 좀비격투 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */

function setFightData(data) {
  var myData = JSON.parse(data);
  var tempHtml = "<tr class='game-table-row'>\n        <th class='col'>\uD68C\uCC28</th>\n        <th>\uC88C\uCE21</th>\n        <th>\uC6B0\uCE21</th>\n        <th>\uC2B9\uC790</th>\n        <th>KO\uC5EC\uBD80</th>\n    </tr>";
  myData.zombiefight.forEach(function (el) {
    tempHtml += "<tr class='game-table-row'>\n            <th class='col'>".concat(el.turn, "</th>");
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = el.result[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var i = _step2.value;
        tempHtml += "<td>".concat(i, "</td>");
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    ;
    tempHtml += "</tr>";
  });
  gameTableContent[1].innerHTML = tempHtml;
}

;
/**
 * @brief 좀비격파 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */

function setBreakData(data) {
  var myData = JSON.parse(data);
  var tempHtml = "<tr class='game-table-row'>\n        <th class='col'>\uD68C\uCC28</th>\n        <th>\uC88C\uCE21</th>\n        <th>\uACA9\uD30C\uC218</th>\n        <th>\uC6B0\uCE21</th>\n        <th>\uACA9\uD30C\uC218</th>\n        <th>\uC2B9\uC790</th>\n    </tr>";
  myData.zombiebreak.forEach(function (el) {
    tempHtml += "<tr class='game-table-row'>\n            <th class='col'>".concat(el.turn, "</th>");
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = el.result[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var i = _step3.value;
        tempHtml += "<td>".concat(i, "</td>");
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    ;
    tempHtml += "</tr>";
  });
  gameTableContent[2].innerHTML = tempHtml;
}

;
/**
 * @brief 좀비격파 그리는 함수
 * @author JJH
 * @param data 통신 완료시 받아온 data
 */

function setDropData(data) {
  var myData = JSON.parse(data);
  var tempHtml = "<tr class='game-table-row'>\n        <th class='col'>\uD68C\uCC28</th>\n        <th>1\uBC88\uC880\uBE44</th>\n        <th>2\uBC88\uC880\uBE44</th>\n        <th>3\uBC88\uC880\uBE44</th>\n        <th>4\uBC88\uC880\uBE44</th>\n        <th>5\uBC88\uC880\uBE44</th>\n    </tr>";
  myData.zombiedrop.forEach(function (el) {
    tempHtml += "<tr class='game-table-row'>\n            <th class='col'>".concat(el.turn, "</th>");
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = el.result[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var i = _step4.value;
        tempHtml += "<td>".concat(i, "</td>");
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    ;
    tempHtml += "</tr>";
  });
  gameTableContent[3].innerHTML = tempHtml;
}

;
/**
 * @brief 차트 생성
 * @author JJH
 * @param dataAry 차트에 표시할 날짜 데이터
 * @param valueAry 차트에 표시할 값 데이터
 */

function createMainChart(dateAry, valueAry) {
  var canvasHeight = 0; //창크기에 따라 height 값 지정

  if (window.innerWidth <= 500) {
    canvasHeight = 200;
  } else if (window.innerWidth <= 960) {
    canvasHeight = 300;
  } else {
    canvasHeight = 500;
  }

  mainChartParent.innerHTML = "<canvas id='index-profit-chart' style='height:".concat(canvasHeight, "px;'></canvas>");
  var ctx = document.getElementById("index-profit-chart");
  ctx = document.getElementById("index-profit-chart").getContext("2d");
  mainChart = new Chart(ctx, {
    type: 'line',
    data: {
      // dateAry!!!
      labels: dateAry,
      datasets: [{
        label: false,
        // valueAry!!!
        data: valueAry,
        fill: false,
        borderColor: '#6f569c',
        borderWidth: 5,
        pointBorderWidth: 2,
        pointBackgroundColor: 'white',
        pointRadius: 5,
        tension: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          offsetGridLines: false,
          ticks: {}
        }]
      }
    }
  });
}

;