        
require("./loghub-tracking.js");
function ajaxErrorLog(msg){
    msg = msg || {};
    var logger = new window.Tracker('lvbo-contest.cn-hangzhou.log.aliyuncs.com','lvbo-contest','contest');
    for (var key in msg) {
      logger.push(key, msg[key]);
    }               
    logger.logger();
}
        //============
            //结果页
        //============
        if($(".result").length){
            
            $(".lottery_btn").click(function(){
                 $.ajax({
                      type: 'POST',
                      url:"/zjsf/draw",
                      dataType: 'json',
                      success: function(data){
                        if(data.success){
                           if(data.data.isWin){
                            // 中奖
                            $(".lottery").show();
                           }else{
                            //未中奖
                            $(".winning_results").addClass("no_winning");
                            $(".lottery").show();
                           }

                        }else{
                            var errorObj = {
                                msg:data.message,
                                module:"result.js"
                            };
                            ajaxErrorLog(errorObj);
                        }
                          
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown){
                        var errorObj = {
                              XMLHttpRequest:XMLHttpRequest,
                              textStatus:textStatus,
                              errorThrown:errorThrown,
                              module:"result.js"
                          };
                          ajaxErrorLog(errorObj);
                      }
                    })

                 $(this).hide();
                 $(".btn_box").prepend('<div class="btn  lottery_btn_finishied fl">查看</div>');
            });
            $(".back").click(function(){
                WeixinJSBridge.call('closeWindow');
            });

            $('.btn_box').on('click','.lottery_btn_finishied',function(){
              $(".hint").text("您已抽过奖").show();
                  $(".lottery").show();
                  setTimeout(function(){
                    $(".hint").hide();
                  }, 1500)
              })

            $(".share").click(function(){
              $(".hint").text("点击右上角分享").show();
              setTimeout(function(){
                $(".hint").hide();
              }, 1500)
            });
        }


        //============
            //抽奖页
        //============
        if($(".lottery").length){
            
            $(".close").click(function(){
                $(".lottery").hide()
            });
        }