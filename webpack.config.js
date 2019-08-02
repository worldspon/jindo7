const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    common: ['@babel/polyfill', './js/common/common.js'],
    adprofit: ['@babel/polyfill', './js/adprofit/adprofit.js'],
    banuser: ['@babel/polyfill', './js/banuser/banuser.js'],
    boardcontent: ['@babel/polyfill', './js/board/content/boardcontent.js'],
    boardcontentadmin: ['@babel/polyfill', './js/board/content/admin/admin.js'],
    boardlist: ['@babel/polyfill', './js/board/list/boardlist.js'],
    boardlistadmin: ['@babel/polyfill', './js/board/list/admin/admin.js'],
    boardmodify: ['@babel/polyfill', './js/board/modify/boardmodify.js'],
    boardwrite: ['@babel/polyfill', './js/board/write/boardwrite.js'],
    cashbee: ['@babel/polyfill', './js/cashbee/cashbee.js'],
    directq: ['@babel/polyfill', './js/directq/directq.js'],
    faqcontent: ['@babel/polyfill', './js/faq/content/faqcontent.js'],
    faqcontentadmin: ['@babel/polyfill', './js/faq/content/admin/admin.js'],
    faqform: ['@babel/polyfill', './js/faq/form/faqform.js'],
    faqlist: ['@babel/polyfill', './js/faq/list/faq.js'],
    faqmod: ['@babel/polyfill', './js/faq/mod/faqmod.js'],
    myresult: ['@babel/polyfill', './js/game/myresult/myresult.js'],
    result: ['@babel/polyfill', './js/game/result/result.js'],
    history: ['@babel/polyfill', './js/history/history.js'],
    index: ['@babel/polyfill', './js/index/index.js'],
    login: ['@babel/polyfill', './js/login/login.js'],
    findpw: ['@babel/polyfill', './js/login/find/findpw.js'],
    changepw: ['@babel/polyfill', './js/login/change/changepw.js'],
    myqcontent: ['@babel/polyfill', './js/myq/content/myqcontent.js'],
    myqcontentadmin: ['@babel/polyfill', './js/myq/content/admin/admin.js'],
    myqlist: ['@babel/polyfill', './js/myq/list/myq.js'],
    noticecontent: ['@babel/polyfill', './js/notice/content/noticecontent.js'],
    noticelist: ['@babel/polyfill', './js/notice/list/noticelist.js'],
    noticemodify: ['@babel/polyfill', './js/notice/modify/noticemodify.js'],
    noticewrite: ['@babel/polyfill', './js/notice/write/noticewrite.js'],
    promotionapply: ['@babel/polyfill', './js/promotion/apply/promotionapply.js'],
    promotionlist: ['@babel/polyfill', './js/promotion/list/promotionlist.js'],
    promotionlistadmin: ['@babel/polyfill', './js/promotion/list/admin/admin.js'],
    servicemanagement: ['@babel/polyfill', './js/servicemanagement/servicemanagement.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/bundle'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        } 
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          test: /\.js(\?.*)?$/i,
          output: {
            comments: false,
          },
        },
      }),
    ],
  }
};