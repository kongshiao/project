require("./badJsReport.js");

 badJsReport({
    data:{
        
    },//自定义数据
    endPoint:"lvbo-contest.cn-hangzhou.log.aliyuncs.com",//日志服务的url
    project:"lvbo-contest",//日志服务的项目名称
    logstore:"contest"//日志库
});
// 响应式处理
    function responsive(){
            var width=document.body.clientWidth;//获取文档即视口的宽度
            document.getElementsByTagName("html")[0].style.fontSize=(width/18.75)+"px";//设置html文 字大小为40px;
    }
    responsive();
    window.onresize=function(){
        responsive();
    }
    function responsive(){
        var width=document.body.clientWidth;
        document.getElementsByTagName("html")[0].style.fontSize=(width/18.6)+"px";
    }
    responsive();
    window.onresize=function(){
        responsive();
    }

