/**
 * Name:    badJsReport.js
 * Version  1.1.0
 * Author   xianyulaodi
 * Address: https://github.com/xianyulaodi/badJsReport
 * Released on: December 22, 2016
 */

require("./loghub-tracking.js");

;(function(){

    

    if (window.badJsReport){ 

       return window.badJsReport 
    };

    /*
    *  默认上报的错误信息
    */ 
    var defaults = {
        msg:'',  //错误的具体信息
        url:'',  //错误所在的url
        line:'', //错误所在的行
        col:'',  //错误所在的列
    };

   /**
   * 核心代码区
   **/
   var badJsReport=function(params){
      params = params || {};//一定要先定义好对象！！！
      params.data = params.data ||{};
      var data = params.data;
      var endPoint = params.endPoint;
      var project = params.project;
      var logstore = params.logstore;
      var user = {
          userAgent:navigator.userAgent
      }


      window.onerror = function(msg,url,line,col,error){  
          //采用异步的方式,避免阻塞
          setTimeout(function(){

              //不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
              col = col || (window.event && window.event.errorCharacter) || 0;

              defaults.url = url;
              defaults.line = line;
              defaults.col =  col;
              defaults.msg =  msg;
              


              if (error && error.stack){
                  //如果浏览器有堆栈信息，直接使用
                  defaults.msg = error.stack.toString();
                }

              // else if (arguments.callee){
              //     console.log("没堆栈")

                  //尝试通过callee拿堆栈信息
                  // var ext = [];
                  // var fn = arguments.callee.caller;
                  // var floor = 3;  //这里只拿三层堆栈信息
                  // while (fn && (--floor>0)) {
                  //    ext.push(fn.toString());
                  //    if (fn  === fn.caller) {
                  //         break;//如果有环
                  //    }
                  //    fn = fn.caller;
                  // }
                  // ext = ext.join(",");
                  // defaults.msg = error.stack.toString();
                // }

                var logger = new window.Tracker(endPoint,project,logstore);
                var reportData = Object.assign(defaults,data,user); 
                for (var key in reportData) {
                  logger.push(key, reportData[key]);
                }               
                logger.logger();

          },0);

      };

  }
    
  window.badJsReport=badJsReport;

})();

/*===========================
badJsReport AMD Export
===========================*/
if (typeof(module) !== 'undefined'){
    module.exports = window.badJsReport;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.badJsReport;
    });
}
