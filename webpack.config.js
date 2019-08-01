const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    adprofit: './js/adprofit/adprofit.js',
    banuser: './js/banuser/banuser.js',
    boardcontent: './js/board/content/boardcontent.js',
    boardcontentadmin: './js/board/content/admin/admin.js',
    boardlist: './js/board/list/boardlist.js',
    boardlistadmin: './js/board/list/admin/admin.js',
    boardmodify: './js/board/modify/boardmodify.js',
    boardwrite: './js/board/write/boardwrite.js',
    cashbee: './js/cashbee/cashbee.js',
    directq: './js/directq/directq.js',
    faqcontent: './js/faq/content/faqcontent.js',
    faqcontentadmin: './js/faq/content/admin/admin.js',
    faqform: './js/faq/form/faqform.js',
    faqlist: './js/faq/list/faq.js',
    faqmod: './js/faq/mod/faqmod.js',
    myresult: './js/game/myresult/myresult.js',
    result: './js/game/result/result.js',
    history: './js/history/history.js',
    index: './js/index/index.js',
    login: './js/login/login.js',
    findpw: './js/login/find/findpw.js',
    changepw: './js/login/change/changepw.js',
    myqcontent: './js/myq/content/myqcontent.js',
    myqcontentadmin: './js/myq/content/admin/admin.js',
    myqlist: './js/myq/list/myq.js',
    noticecontent: './js/notice/content/noticecontent.js',
    noticelist: './js/notice/list/noticelist.js',
    noticemodify: './js/notice/modify/noticemodify.js',
    noticewrite: './js/notice/write/noticewrite.js',
    promotionapply: './js/promotion/apply/promotionapply.js',
    promotionlist: './js/promotion/list/promotionlist.js',
    promotionlistadmin: './js/promotion/list/admin/admin.js',
    servicemanagement: './js/servicemanagement/servicemanagement.js',
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