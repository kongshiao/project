/* 
* @Author: Marte
* @Date:   2017-08-17 15:16:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-25 11:50:08
*/

$(document).ready(function(){
    $("body").hide();    
    setTimeout(function(){
        $("body").show();
    }, 100);

     function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    var result = IsPC()
    var script = document.createElement("script")
    script.type = "text/javascript";
    if(!result){
        // 插入css
        cssURL = 'static/css/mobile.css';
        var linkTag = $('<link href="' + cssURL + '" rel="stylesheet" type="text/css"  />');
        $($('head')[0]).append(linkTag);
        //插入js
        
        script.src = "static/js/mobile_common.js";
        document.getElementsByTagName("body")[0].appendChild(script);

        $(".mobile").show().css("visibility","visible");
       
    }else{
        //插入css            
        cssURL ='static/css/style.css' ;
        var linkTag = $('<link href="' + cssURL + '" rel="stylesheet" type="text/css"  />');
        $($('head')[0]).append(linkTag);
        //插入js
       script.src = "static/js/common.js";
        document.getElementsByTagName("body")[0].appendChild(script);
        $(".mobile").hide();
        $(".pc").show();
    }  
});