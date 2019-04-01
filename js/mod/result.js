"use strict";
'use strict;';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var winWidth = window.innerWidth;
var pcFlag = false;
var nowMon = new Date().getMonth() + 1;
var nowDay = new Date().getDate();
var main = document.querySelector('main');
var raceHl = document.querySelector('.zombie-race .content-hl');
var breakHl = document.querySelector('.zombie-break .content-hl');
var fightHl = document.querySelector('.zombie-fight .content-hl');
var dropHl = document.querySelector('.zombie-drop .content-hl');
var mdHl = document.querySelector('.md-tb .content-hl');
var btnToday = document.getElementsByClassName('btn-today');
var btnPrev = document.getElementsByClassName('btn-prev');
var mdWrap = document.querySelector('.md-wrap');
var mdCloseBtn = document.querySelector('.md-close-btn');
var resultUrl = 'js/result.json';
var prevUrl = 'js/prev.json';
var data, prevData;
var raceTb = document.querySelector('.zombie-race table tbody');
var fightTb = document.querySelector('.zombie-fight table tbody');
var breakTb = document.querySelector('.zombie-break table tbody');
var dropTb = document.querySelector('.zombie-drop table tbody');
var mdTable = document.querySelector('.md-wrap table');

if (winWidth > 1860) {
  pcFlag = true;
} else if (winWidth < 1860) {
  pcFlag = false;
}

window.addEventListener('resize', function () {
  winWidth = window.innerWidth;

  if (winWidth > 1860) {
    if (!pcFlag) {
      pcFlag = true;
      createPcTable(data);
    }
  }

  if (winWidth < 1860) {
    if (pcFlag) {
      pcFlag = false;
      createMobileTable(data);
    }
  }
});
raceHl.innerText = "0".concat(nowMon, ".").concat(nowDay, " \uC880\uBE44\uB808\uC774\uC2A4");
breakHl.innerText = "0".concat(nowMon, ".").concat(nowDay, " \uC880\uBE44\uACA9\uD30C");
fightHl.innerText = "0".concat(nowMon, ".").concat(nowDay, " \uC880\uBE44\uACA9\uD22C");
dropHl.innerText = "0".concat(nowMon, ".").concat(nowDay, " \uC880\uBE44\uB099\uD558");
gameDataLoad(resultUrl);
prevDataLoad(prevUrl);
mdCloseBtn.addEventListener('click', function () {
  mdWrap.style.display = 'none';
});
Array.from(btnToday).forEach(function (el) {
  el.addEventListener('click', function () {
    mdWrap.style.display = 'block';
    createModalTable(el.dataset.type);
    main.offsetHeight > mdWrap.offsetHeight ? mdWrap.style.height = main.offsetHeight + 'px' : mdWrap.style.height = 'auto';
  });
});
Array.from(btnPrev).forEach(function (el) {
  el.addEventListener('click', function () {
    mdWrap.style.display = 'block';
    var a = main.offsetHeight;
    createPrevTable(el.dataset.type);
    main.offsetHeight > mdWrap.offsetHeight ? mdWrap.style.height = main.offsetHeight + 'px' : mdWrap.style.height = 'auto';
  });
});

function createModalTable(type) {
  var tempHtml = "";

  if (type == 'race') {
    mdHl.innerText = "0".concat(nowMon, ".").concat(nowDay, " \uC880\uBE44\uB808\uC774\uC2A4");
    tempHtml += "<thead>\n            <tr class=\"th-row row\">\n                <th class=\"first-tab\">\uD68C\uCC28</th>\n                <th>1\uB4F1</th>\n                <th>2\uB4F1</th>\n                <th>3\uB4F1</th>\n                <th>4\uB4F1</th>\n                <th>5\uB4F1</th>\n            </tr>\n        </thead>";
    data.race.forEach(function (el, index) {
      tempHtml += "<tr class=\"tb-row row\">\n                <th class=\"first-tab\">".concat(index + 1, "</th>\n                <td>").concat(el[1], "</td>\n                <td>").concat(el[2], "</td>\n                <td>").concat(el[3], "</td>\n                <td>").concat(el[4], "</td>\n                <td>").concat(el[5], "</td>\n            </tr>");
    });
    mdTable.innerHTML = tempHtml;
  }

  if (type == 'fight') {
    mdHl.innerText = "0".concat(nowMon, ".").concat(nowDay, " \uC880\uBE44\uACA9\uD22C");
    tempHtml += "<thead>\n            <tr class=\"th-row row\">\n                <th class=\"first-tab\">\uD68C\uCC28</th>\n                <th>\uC88C\uCE21</th>\n                <th>\uC6B0\uCE21</th>\n                <th>\uC2B9\uC790</th>\n                <th>KO\uC5EC\uBD80</th>\n            </tr>\n        </thead>";
    data.fight.forEach(function (el, index) {
      tempHtml += "<tr class=\"tb-row row\">\n                <th class=\"first-tab\">".concat(index + 1, "</th>\n                <td>").concat(el.left, "</td>\n                <td>").concat(el.right, "</td>\n                <td>").concat(el.winner, "</td>\n                <td>").concat(el.ko ? 'KO승' : '판정승', "</td>\n            </tr>");
    });
    mdTable.innerHTML = tempHtml;
  }

  if (type == 'break') {
    mdHl.innerText = "0".concat(nowMon, ".").concat(nowDay, " \uC880\uBE44\uACA9\uD30C");
    tempHtml += "<thead>\n            <tr class=\"th-row row\">\n                <th class=\"first-tab\">\uD68C\uCC28</th>\n                <th>\uC88C\uCE21</th>\n                <th>\uACA9\uD30C\uC218</th>\n                <th>\uC6B0\uCE21</th>\n                <th>\uACA9\uD30C\uC218</th>\n                <th>\uC2B9\uC790</th>\n            </tr>\n        </thead>";
    data.break.forEach(function (el, index) {
      tempHtml += "<tr class=\"tb-row row\">\n                <th class=\"first-tab\">".concat(index + 1, "</th>\n                <td>").concat(el.left[0], "</td>\n                <td>").concat(el.left[1], "</td>\n                <td>").concat(el.right[0], "</td>\n                <td>").concat(el.right[1], "</td>\n                <td>").concat(el.winner, "</td>\n            </tr>");
    });
    mdTable.innerHTML = tempHtml;
  }

  if (type == 'drop') {
    mdHl.innerText = "0".concat(nowMon, ".").concat(nowDay, " \uC880\uBE44\uB099\uD558");
    tempHtml += "<thead>\n            <tr class=\"th-row row\">\n                <th class=\"first-tab\">\uD68C\uCC28</th>\n                <th>1\uBC88\uC880\uBE44</th>\n                <th>2\uBC88\uC880\uBE44</th>\n                <th>3\uBC88\uC880\uBE44</th>\n                <th>4\uBC88\uC880\uBE44</th>\n                <th>5\uBC88\uC880\uBE44</th>\n            </tr>\n        </thead>";
    data.drop.forEach(function (el, index) {
      var dummyAry = el.sort(function (a, b) {
        return a - b;
      });
      tempHtml += "<tr class=\"tb-row row\">\n                <th class=\"first-tab\">".concat(index + 1, "</th>\n                <td>").concat(dummyAry[0], "</td>\n                <td>").concat(dummyAry[1], "</td>\n                <td>").concat(dummyAry[2], "</td>\n                <td>").concat(dummyAry[3], "</td>\n                <td>").concat(dummyAry[4], "</td>\n            </tr>");
    });
    mdTable.innerHTML = tempHtml;
  }
}

function createPrevTable(type) {
  var tempHtml = "";

  if (type == 'race') {
    mdHl.innerText = "0".concat(nowMon, ".").concat(nowDay - 1, " \uC880\uBE44\uB808\uC774\uC2A4");
    tempHtml += "<thead>\n            <tr class=\"th-row row\">\n                <th class=\"first-tab\">\uD68C\uCC28</th>\n                <th>1\uB4F1</th>\n                <th>2\uB4F1</th>\n                <th>3\uB4F1</th>\n                <th>4\uB4F1</th>\n                <th>5\uB4F1</th>\n            </tr>\n        </thead>";
    prevData.race.forEach(function (el, index) {
      tempHtml += "<tr class=\"tb-row row\">\n                <th class=\"first-tab\">".concat(index + 1, "</th>\n                <td>").concat(el[1], "</td>\n                <td>").concat(el[2], "</td>\n                <td>").concat(el[3], "</td>\n                <td>").concat(el[4], "</td>\n                <td>").concat(el[5], "</td>\n            </tr>");
    });
    mdTable.innerHTML = tempHtml;
  }

  if (type == 'fight') {
    mdHl.innerText = "0".concat(nowMon, ".").concat(nowDay - 1, " \uC880\uBE44\uACA9\uD22C");
    tempHtml += "<thead>\n            <tr class=\"th-row row\">\n                <th class=\"first-tab\">\uD68C\uCC28</th>\n                <th>\uC88C\uCE21</th>\n                <th>\uC6B0\uCE21</th>\n                <th>\uC2B9\uC790</th>\n                <th>KO\uC5EC\uBD80</th>\n            </tr>\n        </thead>";
    prevData.fight.forEach(function (el, index) {
      tempHtml += "<tr class=\"tb-row row\">\n                <th class=\"first-tab\">".concat(index + 1, "</th>\n                <td>").concat(el.left, "</td>\n                <td>").concat(el.right, "</td>\n                <td>").concat(el.winner, "</td>\n                <td>").concat(el.ko ? 'KO승' : '판정승', "</td>\n            </tr>");
    });
    mdTable.innerHTML = tempHtml;
  }

  if (type == 'break') {
    mdHl.innerText = "0".concat(nowMon, ".").concat(nowDay - 1, " \uC880\uBE44\uACA9\uD30C");
    tempHtml += "<thead>\n            <tr class=\"th-row row\">\n                <th class=\"first-tab\">\uD68C\uCC28</th>\n                <th>\uC88C\uCE21</th>\n                <th>\uACA9\uD30C\uC218</th>\n                <th>\uC6B0\uCE21</th>\n                <th>\uACA9\uD30C\uC218</th>\n                <th>\uC2B9\uC790</th>\n            </tr>\n        </thead>";
    prevData.break.forEach(function (el, index) {
      tempHtml += "<tr class=\"tb-row row\">\n                <th class=\"first-tab\">".concat(index + 1, "</th>\n                <td>").concat(el.left[0], "</td>\n                <td>").concat(el.left[1], "</td>\n                <td>").concat(el.right[0], "</td>\n                <td>").concat(el.right[1], "</td>\n                <td>").concat(el.winner, "</td>\n            </tr>");
    });
    mdTable.innerHTML = tempHtml;
  }

  if (type == 'drop') {
    mdHl.innerText = "0".concat(nowMon, ".").concat(nowDay - 1, " \uC880\uBE44\uB099\uD558");
    tempHtml += "<thead>\n            <tr class=\"th-row row\">\n                <th class=\"first-tab\">\uD68C\uCC28</th>\n                <th>1\uBC88\uC880\uBE44</th>\n                <th>2\uBC88\uC880\uBE44</th>\n                <th>3\uBC88\uC880\uBE44</th>\n                <th>4\uBC88\uC880\uBE44</th>\n                <th>5\uBC88\uC880\uBE44</th>\n            </tr>\n        </thead>";
    prevData.drop.forEach(function (el, index) {
      var dummyAry = el.sort(function (a, b) {
        return a - b;
      });
      tempHtml += "<tr class=\"tb-row row\">\n                <th class=\"first-tab\">".concat(index + 1, "</th>\n                <td>").concat(dummyAry[0], "</td>\n                <td>").concat(dummyAry[1], "</td>\n                <td>").concat(dummyAry[2], "</td>\n                <td>").concat(dummyAry[3], "</td>\n                <td>").concat(dummyAry[4], "</td>\n            </tr>");
    });
    mdTable.innerHTML = tempHtml;
  }
}
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

function gameDataLoad(_x) {
  return _gameDataLoad.apply(this, arguments);
}

function _gameDataLoad() {
  _gameDataLoad = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return AsyncValidateFnc(resultUrl);

          case 3:
            data = _context.sent;
            data = JSON.parse(data);
            pcFlag ? createPcTable(data) : createMobileTable(data);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _gameDataLoad.apply(this, arguments);
}

function prevDataLoad(_x2) {
  return _prevDataLoad.apply(this, arguments);
}

function _prevDataLoad() {
  _prevDataLoad = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(url) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return AsyncValidateFnc(prevUrl);

          case 3:
            prevData = _context2.sent;
            prevData = JSON.parse(prevData);
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
  return _prevDataLoad.apply(this, arguments);
}

function createPcTable(data) {
  var myData = data;
  var tempHtml = '';
  myData.race.forEach(function (el, index) {
    tempHtml += "<tr class=\"tb-row row\">\n            <th class=\"first-tab\">".concat(index + 1, "</th>\n            <td>").concat(el[1], "</td>\n            <td>").concat(el[2], "</td>\n            <td>").concat(el[3], "</td>\n            <td>").concat(el[4], "</td>\n            <td>").concat(el[5], "</td>\n        </tr>");
  });
  raceTb.innerHTML = tempHtml;
  tempHtml = '';
  myData.fight.forEach(function (el, index) {
    tempHtml += "<tr class=\"tb-row row\">\n            <th class=\"first-tab\">".concat(index + 1, "</th>\n            <td>").concat(el.left, "</td>\n            <td>").concat(el.right, "</td>\n            <td>").concat(el.winner, "</td>\n            <td>").concat(el.ko ? 'KO승' : '판정승', "</td>\n        </tr>");
  });
  fightTb.innerHTML = tempHtml;
  tempHtml = '';
  myData.break.forEach(function (el, index) {
    tempHtml += "<tr class=\"tb-row row\">\n            <th class=\"first-tab\">".concat(index + 1, "</th>\n            <td>").concat(el.left[0], "</td>\n            <td>").concat(el.left[1], "</td>\n            <td>").concat(el.right[0], "</td>\n            <td>").concat(el.right[1], "</td>\n            <td>").concat(el.winner, "</td>\n        </tr>");
  });
  breakTb.innerHTML = tempHtml;
  tempHtml = '';
  myData.drop.forEach(function (el, index) {
    var dummyAry = el.sort(function (a, b) {
      return a - b;
    });
    tempHtml += "<tr class=\"tb-row row\">\n            <th class=\"first-tab\">".concat(index + 1, "</th>\n            <td>").concat(dummyAry[0], "</td>\n            <td>").concat(dummyAry[1], "</td>\n            <td>").concat(dummyAry[2], "</td>\n            <td>").concat(dummyAry[3], "</td>\n            <td>").concat(dummyAry[4], "</td>\n        </tr>");
  });
  dropTb.innerHTML = tempHtml;
}

function createMobileTable(data) {
  var myData = data;
  var tempHtml = '';

  for (var i = 0; i < 5; i++) {
    tempHtml += "<tr class=\"tb-row row\">\n            <th class=\"first-tab\">".concat(i + 1, "</th>\n            <td>").concat(myData.race[i][1], "</td>\n            <td>").concat(myData.race[i][2], "</td>\n            <td>").concat(myData.race[i][3], "</td>\n            <td>").concat(myData.race[i][4], "</td>\n            <td>").concat(myData.race[i][5], "</td>\n        </tr>");
  }

  raceTb.innerHTML = tempHtml;
  tempHtml = '';

  for (var _i = 0; _i < 5; _i++) {
    tempHtml += "<tr class=\"tb-row row\">\n            <th class=\"first-tab\">".concat(_i + 1, "</th>\n            <td>").concat(myData.fight[_i].left, "</td>\n            <td>").concat(myData.fight[_i].right, "</td>\n            <td>").concat(myData.fight[_i].winner, "</td>\n            <td>").concat(myData.fight[_i].ko ? 'KO승' : '판정승', "</td>\n        </tr>");
  }

  fightTb.innerHTML = tempHtml;
  tempHtml = '';

  for (var _i2 = 0; _i2 < 5; _i2++) {
    tempHtml += "<tr class=\"tb-row row\">\n            <th class=\"first-tab\">".concat(_i2 + 1, "</th>\n            <td>").concat(myData.break[_i2].left[0], "</td>\n            <td>").concat(myData.break[_i2].left[1], "</td>\n            <td>").concat(myData.break[_i2].right[0], "</td>\n            <td>").concat(myData.break[_i2].right[1], "</td>\n            <td>").concat(myData.break[_i2].winner, "</td>\n        </tr>");
  }

  breakTb.innerHTML = tempHtml;
  tempHtml = '';

  for (var _i3 = 0; _i3 < 5; _i3++) {
    var dummyAry = myData.drop[_i3].sort(function (a, b) {
      return a - b;
    });

    tempHtml += "<tr class=\"tb-row row\">\n            <th class=\"first-tab\">".concat(_i3 + 1, "</th>\n            <td>").concat(dummyAry[0], "</td>\n            <td>").concat(dummyAry[1], "</td>\n            <td>").concat(dummyAry[2], "</td>\n            <td>").concat(dummyAry[3], "</td>\n            <td>").concat(dummyAry[4], "</td>\n        </tr>");
  }

  dropTb.innerHTML = tempHtml;
}