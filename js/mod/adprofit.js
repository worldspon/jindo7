"use strict";
'use strict;'; // 현재 날짜 데이터 저장

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nowYear = new Date().getFullYear();
var nowMonth = new Date().getMonth() + 1;
var nowDay = new Date().getDate(); // 상단 수익금

var totalTitle = document.querySelector('.total-profit > .profit-left');
var deductionTitle = document.querySelector('.deduction-profit > .profit-left');
var pureTitle = document.querySelector('.pure-profit > .profit-left');
var totalProfit = document.querySelector('.total-profit > .profit-right');
var deductionProfit = document.querySelector('.deduction-profit > .profit-right');
var pureProfit = document.querySelector('.pure-profit > .profit-right'); // 광고 수익금

var adprofitChartHl = document.querySelector('.adprofit-chart-header > h3');
var dataSelectBox = document.querySelectorAll('.data-select-box'); // select option node id 저장

var dataOption1, dataOption2; // 현재 가지고 있는 데이터의 연 월 저장

var dataYear, dataMonth; // line chart

var adProfitChart = document.querySelector('.adprofit-chart-content');
var labelAry = [];
var valAry1 = [];
var valAry2 = [];
var tabletlabelAry = [];
var tabletvalAry1 = [];
var tabletvalAry2 = [];
var mobilelabelAry = [];
var mobilevalAry1 = [];
var mobilevalAry2 = [];
var canvasHeight2 = 0;
var myLineChart; // bar chart

var situationChart = document.querySelector('.situation-chart-content');
var myBarChart; // comparison profit

var curMonHighTitle = document.querySelector('.current-month-high-title');
var curMonHigh = document.querySelector('.current-month-high');
var curMonLowTitle = document.querySelector('.current-month-low-title');
var curMonLow = document.querySelector('.current-month-low');
var curMonAvgTitle = document.querySelector('.current-month-avg-title');
var curMonAvg = document.querySelector('.current-month-avg');
var monAvgHigh = document.querySelector('.month-avg-high');
var monAvgLow = document.querySelector('.month-avg-low');
var monTotalLow = document.querySelector('.month-total-low');
profitAsync('js/adprofit.json', nowYear, nowMonth);
selectAsync('js/adprofit.json', nowYear, nowMonth);
lineChartAsync('js/adprofit.json');
barChartAsync('js/adprofit.json');
comparisonAsync('js/adprofit.json');
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
/**
 * @brief 첫 접속시 하단 수익비교 박스 초기화를 위한 통신
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */


function comparisonAsync(_x) {
  return _comparisonAsync.apply(this, arguments);
}
/**
 * @brief 첫 접속시 상단 수익금 박스 초기화를 위한 통신
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */


function _comparisonAsync() {
  _comparisonAsync = _asyncToGenerator(
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
            setComparisonData(data);
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
  return _comparisonAsync.apply(this, arguments);
}

function setComparisonData(data) {
  console.log(Math.round(2.1999999));
  var myData = JSON.parse(data);
  myData = myData.comparison;
  curMonHighTitle.innerText = "".concat(nowMonth, "\uC6D4 \uCD5C\uACE0\uC218\uC775");
  curMonHigh.innerText = myData.curhigh;
  curMonLowTitle.innerText = "".concat(nowMonth, "\uC6D4 \uCD5C\uC800\uC218\uC775");
  curMonLow.innerText = myData.curlow;
  curMonAvgTitle.innerText = "".concat(nowMonth, "\uC6D4 \uD3C9\uADE0\uC218\uC775");
  curMonAvg.innerText = Math.round(myData.curavg);
  monAvgHigh.innerText = Math.round(myData.monhighavg);
  monAvgLow.innerText = Math.round(myData.monlowavg);
  monTotalLow.innerText = Math.round(myData.monavg);
} // select box에 change event 추가


Array.from(dataSelectBox).forEach(function (el) {
  el.addEventListener('change', function () {
    updateSelect();
  });
});
/**
 * @brief 첫 접속시 상단 수익금 박스 초기화를 위한 통신
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */

function profitAsync(_x2, _x3, _x4) {
  return _profitAsync.apply(this, arguments);
}
/**
 * @brief 첫 접속시 select box 초기화를 위한 통신
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */


function _profitAsync() {
  _profitAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(url, yy, mm) {
    var data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // 통신중일시 select box disabled
            dataSelectBox[0].disabled = 'true';
            dataSelectBox[1].disabled = 'true';
            _context2.next = 5;
            return AsyncValidateFnc(url);

          case 5:
            data = _context2.sent;
            setProfitData(data, yy, mm);
            _context2.next = 14;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            dataSelectBox[0].removeAttribute('disabled');
            dataSelectBox[1].removeAttribute('disabled');
            console.log(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _profitAsync.apply(this, arguments);
}

function selectAsync(_x5, _x6, _x7) {
  return _selectAsync.apply(this, arguments);
}
/**
 * @brief line chart 생성을 위한 비동기통신
 * @author JJH
 * @param url 데이터 url
 * @param data1 첫번째 데이터 연월, 없을시 현재년월 데이터
 * @param data2 첫번째 데이터 연월, 없을시 공백
 */


function _selectAsync() {
  _selectAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(url, yy, mm) {
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
            setSelectBox(data, yy, mm);
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
  return _selectAsync.apply(this, arguments);
}

function lineChartAsync(_x8) {
  return _lineChartAsync.apply(this, arguments);
}
/**
 * @brief bar chart 생성을 위한 비동기통신
 * @author JJH
 * @param url 데이터 url
 */


function _lineChartAsync() {
  _lineChartAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(url) {
    var data1,
        data2,
        data,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data1 = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : "".concat(nowYear).concat(nowMonth);
            data2 = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : "";
            _context4.prev = 2;
            dataSelectBox[0].disabled = 'true';
            dataSelectBox[1].disabled = 'true';
            _context4.next = 7;
            return AsyncValidateFnc(url);

          case 7:
            data = _context4.sent;
            createLineChart(data, data1, data2);
            _context4.next = 16;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](2);
            dataSelectBox[0].removeAttribute('disabled');
            dataSelectBox[1].removeAttribute('disabled');
            console.log(_context4.t0);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 11]]);
  }));
  return _lineChartAsync.apply(this, arguments);
}

function barChartAsync(_x9) {
  return _barChartAsync.apply(this, arguments);
}
/**
 * @brief 상단 수익금 및 차트 제목, 최초 차트내용을 변경하는 함수
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 */


function _barChartAsync() {
  _barChartAsync = _asyncToGenerator(
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
            createBarChart(data);
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
  return _barChartAsync.apply(this, arguments);
}

function setProfitData(data, yy, mm) {
  //화폐 표기를 위한 포멧 설정
  var currencyFormat = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  var myData = JSON.parse(data);
  myData = myData.ad[yy][mm];
  var total = 0,
      deduction = 0,
      pure = 0;
  var count = 0;
  deduction = myData.deduction;

  if (mm == new Date().getMonth() + 1) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = myData.dailyprofit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var it = _step.value;
        total += it;
        count++;

        if (count >= nowDay) {
          break;
        }
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

    deduction = (total * deduction).toFixed(2);
  } else {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = myData.dailyprofit[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _it = _step2.value;
        total += _it;
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
  }

  pure = total - deduction;
  totalTitle.innerHTML = "".concat(mm, "\uC6D4 \uCD1D\uC218\uC775");
  deductionTitle.innerHTML = "".concat(mm, "\uC6D4 \uCC28\uAC10\uC561");
  pureTitle.innerHTML = "".concat(mm, "\uC6D4 \uC21C\uC218\uC775");
  totalProfit.innerHTML = "".concat(currencyFormat.format(total));
  deductionProfit.innerHTML = "".concat(currencyFormat.format(deduction));
  pureProfit.innerHTML = "".concat(currencyFormat.format(pure));
  adprofitChartHl.innerText = "".concat(mm, "\uC6D4 \uAD11\uACE0\uC218\uC775\uAE08"); // 통신종료시 select box disabled 해제

  dataSelectBox[0].removeAttribute('disabled');
  dataSelectBox[1].removeAttribute('disabled');
}
/**
 * @brief data를 기반으로 select box option을 그리는 함수
 * @author JJH
 * @param url 데이터 url
 * @param yy 현재 년도
 * @param mm 현재 월
 * @see 참고사항
 *      해당 함수에서 저장하는 dataYear, dataMonth는 select box update시
 *      연도, 월 정보를 통신 없이 얻기 위함임.
 */


function setSelectBox(data, yy, mm) {
  var myData = JSON.parse(data);
  var tempHtml = '';
  adprofitChartHl.innerText = "".concat(mm, "\uC6D4 \uAD11\uACE0\uC218\uC775\uAE08"); // 데이터의 연도 배열

  dataYear = myData.year; // 데이터의 월 객체

  dataMonth = myData.month; // Data1 Select Box start
  // YYYY-MM 형식으로 option 설정

  myData.year.forEach(function (el) {
    myData.month[el].forEach(function (eel) {
      // 현재 연,월을 선택하고 숨김
      if (el == yy && eel == mm) {
        tempHtml += "<option value='".concat(el).concat(eel, "' style='display:none;' selected='selected'>").concat(el, "-").concat(eel > 9 ? eel : '0' + eel, "</option>");
      } else {
        tempHtml += "<option value='".concat(el).concat(eel, "'>").concat(el, "-").concat(eel > 9 ? eel : '0' + eel, "</option>");
      }
    });
  });
  dataSelectBox[0].innerHTML = tempHtml;
  dataOption1 = dataSelectBox[0].childNodes; // Data1 Select Box end
  // Data2 Select Box start
  // 태그 저장 변수 초기화

  tempHtml = '';
  tempHtml += "<option value=\"select\" style='display:none;' selected=\"selected\">select</option>";
  myData.year.forEach(function (el) {
    myData.month[el].forEach(function (eel) {
      if (el != yy || eel != mm) {
        tempHtml += "<option value='".concat(el).concat(eel, "'>").concat(el, "-").concat(eel > 9 ? eel : '0' + eel, "</option>");
      }
    });
  });
  dataSelectBox[1].innerHTML = tempHtml;
  dataOption2 = dataSelectBox[1].childNodes; // Data2 Select Box end
}
/**
 * @brief selected 속성을 기반으로 select box option을 바꾸는 함수
 * @author JJH
 * @see 참고사항
 *      해당 함수에서 참조하는 dataYear, dataMonth는 setSelectBox함수에서
 *      할당 된 것으로 setSelectBox 함수 변경시 따로 설정해야한다.
 */


function updateSelect() {
  // selected 된 value 값 저장
  var dataSelect1, dataSelect2; // 각 value를 연도, 월 로 구분하여 저장

  var dataSelectYear1, dataSelectMonth1;
  var dataSelectYear2, dataSelectMonth2;
  var tempHtml = '';
  dataOption1.forEach(function (el) {
    if (el.selected) {
      dataSelect1 = el.value;
      dataSelectYear1 = parseInt(dataSelect1.slice(0, 4));
      dataSelectMonth1 = parseInt(dataSelect1.slice(4));
    }
  }); // 첫번째 selected 된 value가 각 box의 제목과 내용이 됨

  profitAsync('js/adprofit.json', dataSelectYear1, dataSelectMonth1);
  dataOption2.forEach(function (el) {
    if (el.selected) {
      dataSelect2 = el.value;
      dataSelectYear2 = parseInt(dataSelect2.slice(0, 4));
      dataSelectMonth2 = parseInt(dataSelect2.slice(4));
    }
  });
  /**
   * select box option 규칙
   * data1과 data2에 선택된 값은 option에 그리지 않는다.
   * data2에서 select를 선택하면 차트2가 사라진다.
   */

  dataYear.forEach(function (el) {
    dataMonth[el].forEach(function (eel) {
      if (el != dataSelectYear2 || eel != dataSelectMonth2) {
        if (el == dataSelectYear1 && eel == dataSelectMonth1) {
          tempHtml += "<option value='".concat(el).concat(eel, "' style='display:none;' selected='selected'>").concat(el, "-").concat(eel > 9 ? eel : '0' + eel, "</option>");
        } else {
          tempHtml += "<option value='".concat(el).concat(eel, "'>").concat(el, "-").concat(eel > 9 ? eel : '0' + eel, "</option>");
        }
      }
    });
  });
  dataSelectBox[0].innerHTML = tempHtml;
  tempHtml = '';

  if (dataSelect2 == 'select') {
    tempHtml += "<option value=\"select\" style='display:none;' selected=\"selected\">select</option>";
    dataYear.forEach(function (el) {
      dataMonth[el].forEach(function (eel) {
        if (el != dataSelectYear1 || eel != dataSelectMonth1) {
          tempHtml += "<option value='".concat(el).concat(eel, "'>").concat(el, "-").concat(eel > 9 ? eel : '0' + eel, "</option>");
        }
      });
    });
    lineChartAsync('js/adprofit.json', dataSelect1);
  } else {
    tempHtml += "<option value=\"select\">select</option>";
    dataYear.forEach(function (el) {
      dataMonth[el].forEach(function (eel) {
        if (el != dataSelectYear1 || eel != dataSelectMonth1) {
          if (el == dataSelectYear2 && eel == dataSelectMonth2) {
            tempHtml += "<option value='".concat(el).concat(eel, "' style='display:none;' selected='selected'>").concat(el, "-").concat(eel > 9 ? eel : '0' + eel, "</option>");
          } else {
            tempHtml += "<option value='".concat(el).concat(eel, "'>").concat(el, "-").concat(eel > 9 ? eel : '0' + eel, "</option>");
          }
        }
      });
    });
    lineChartAsync('js/adprofit.json', dataSelect1, dataSelect2);
  }

  dataSelectBox[1].innerHTML = tempHtml;
}
/**
 * @brief line chart 생성을 위한 함수
 * @author JJH
 * @param url 데이터 url
 * @param data1 첫번째 데이터 연월
 * @param data2 첫번째 데이터 연월
 */


function createLineChart(data, data1, data2) {
  var lineChartHeight = 0; //창크기에 따라 height 값 지정

  if (window.innerWidth <= 500) {
    lineChartHeight = 200;
  } else if (window.innerWidth <= 960) {
    lineChartHeight = 300;
  } else {
    lineChartHeight = 500;
  }

  var myData = JSON.parse(data);
  myData = myData.ad;
  var dataYear1 = data1.slice(0, 4);
  var dataYear2 = data2.slice(0, 4);
  var dataMonth1 = data1.slice(4);
  var dataMonth2 = data2.slice(4);
  var labelLength; // 최초 접속시 화면에 표현할 데이터(mobile, tablet, PC)

  var firstLabel, firstValue1, firstValue2; // device별 표시할 데이터 배열

  labelAry = [];
  valAry1 = [];
  valAry2 = []; // 3일 단위

  tabletlabelAry = [];
  tabletvalAry1 = [];
  tabletvalAry2 = []; // 5일 단위

  mobilelabelAry = [];
  mobilevalAry1 = [];
  mobilevalAry2 = []; // 데이터 저장

  valAry1 = myData[dataYear1][dataMonth1].dailyprofit; // 기기별 데이터 분리

  valAry1.forEach(function (el, index) {
    if (index == 0 || index % 3 == 2 && index <= 27) {
      tabletvalAry1.push(el);
    }

    if (index == 0 || index % 5 == 4 && index <= 25) {
      mobilevalAry1.push(el);
    }
  });

  if (data2 != '') {
    valAry2 = myData[dataYear2][dataMonth2].dailyprofit;
    valAry2.forEach(function (el, index) {
      if (index == 0 || index % 3 == 2 && index <= 27) {
        tabletvalAry2.push(el);
      }

      if (index == 0 || index % 5 == 4 && index <= 25) {
        mobilevalAry2.push(el);
      }
    });
  }

  labelLength = Math.max(valAry1.length, valAry2.length);

  for (var i = 1; i <= labelLength; i++) {
    labelAry.push("".concat(i, "\uC77C"));
  }

  labelAry.forEach(function (el, index) {
    if (index == 0 || index % 3 == 2 && index <= 27) {
      tabletlabelAry.push(el);
    }

    if (index == 0 || index % 5 == 4 && index <= 25) {
      mobilelabelAry.push(el);
    }
  }); // 차트 내부 공백을 위한 데이터 앞 뒤 공백처리

  labelAry.unshift('');
  labelAry.push('');
  valAry1.unshift(null);
  valAry2.unshift(null);
  valAry1.push(null);
  valAry2.push(null);
  tabletlabelAry.unshift('');
  tabletlabelAry.push('');
  tabletvalAry1.unshift(null);
  tabletvalAry2.unshift(null);
  tabletvalAry1.push(null);
  tabletvalAry2.push(null);
  mobilelabelAry.unshift('');
  mobilelabelAry.push('');
  mobilevalAry1.unshift(null);
  mobilevalAry2.unshift(null);
  mobilevalAry1.push(null);
  mobilevalAry2.push(null);

  if (window.innerWidth <= 500) {
    firstLabel = mobilelabelAry;
    firstValue1 = mobilevalAry1;
    firstValue2 = mobilevalAry2;
  } else if (window.innerWidth <= 960) {
    firstLabel = tabletlabelAry;
    firstValue1 = tabletvalAry1;
    firstValue2 = tabletvalAry2;
  } else {
    firstLabel = labelAry;
    firstValue1 = valAry1;
    firstValue2 = valAry2;
  } // 캔버스 생성


  adProfitChart.innerHTML = "<canvas id='ad-profit-chart' style='height:".concat(lineChartHeight, "px;'></canvas>");
  var ctx = document.getElementById("ad-profit-chart");
  ctx = document.getElementById("ad-profit-chart").getContext("2d");
  myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: firstLabel,
      datasets: [{
        label: false,
        data: firstValue1,
        fill: false,
        borderColor: '#6f569c',
        borderWidth: 5,
        pointBorderWidth: 2,
        pointBackgroundColor: 'white',
        pointRadius: 5,
        tension: 0
      }, {
        data: firstValue2,
        fill: false,
        borderColor: '#ff0000',
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
          offsetGridLines: false,
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
  }); // 차트 생성 후 canvas id

  var lineChartAfter = document.getElementById('ad-profit-chart');
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 500) {
      lineChartAfter.style.height = '200px';
      myLineChart.data.labels = mobilelabelAry;
      myLineChart.data.datasets[0].data = mobilevalAry1;
      myLineChart.data.datasets[1].data = mobilevalAry2;
      myLineChart.update();
    } else if (window.innerWidth <= 960) {
      lineChartAfter.style.height = '300px';
      myLineChart.data.labels = tabletlabelAry;
      myLineChart.data.datasets[0].data = tabletvalAry1;
      myLineChart.data.datasets[1].data = tabletvalAry2;
      myLineChart.update();
    } else {
      lineChartAfter.style.height = '500px';
      myLineChart.data.labels = labelAry;
      myLineChart.data.datasets[0].data = valAry1;
      myLineChart.data.datasets[1].data = valAry2;
      myLineChart.update();
    }
  });
}
/**
 * @brief bar chart 생성을 위한 함수
 * @author JJH
 * @param data JSON data
 */


function createBarChart(data) {
  var myData = JSON.parse(data);
  myData = myData.ad[nowYear];
  var curMonth = 0,
      prevMonth = 0,
      pprevMonth = 0; // 현재달은 조회일 하루전 데이터까지 합산

  myData[nowMonth].dailyprofit.forEach(function (el, index) {
    if (index <= nowDay - 2) {
      curMonth += el;
    }
  });
  myData[nowMonth - 1].dailyprofit.forEach(function (el) {
    prevMonth += el;
  });
  myData[nowMonth - 2].dailyprofit.forEach(function (el) {
    pprevMonth += el;
  }); // 캔버스 생성

  situationChart.innerHTML = "<canvas id='situation-profit-chart' style=\"height:220px;\"></canvas>";
  var ctx = document.getElementById("situation-profit-chart");
  ctx = document.getElementById("situation-profit-chart").getContext("2d");
  myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ["".concat(nowMonth, "\uC6D4"), "".concat(nowMonth - 1, "\uC6D4"), "".concat(nowMonth - 2, "\uC6D4")],
      datasets: [{
        label: false,
        data: [curMonth, prevMonth, pprevMonth],
        fill: false,
        borderColor: '#6f569c',
        backgroundColor: '#6f569c',
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
          barPercentage: 0.8,
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          offsetGridLines: false,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}