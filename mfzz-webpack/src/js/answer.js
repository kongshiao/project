  require("./loghub-tracking.js");
        //=============
            // 答题页
        // ============
        var imgArr = [];
        for(var i=1;i<=10;i++){
          var imgUrl = require('../img/number'+i+'.png');
          imgArr.push(imgUrl);
        }

        function ajaxErrorLog(msg){
            msg = msg || {};
            var logger = new window.Tracker('lvbo-contest.cn-hangzhou.log.aliyuncs.com','lvbo-contest','contest');
            for (var key in msg) {
              logger.push(key, msg[key]);
            }               
            logger.logger();
        }

        if($(".test").length){
            var answer={};
            var questionLength = $(".item").length;
            for(var i = 1;i<=10;i++){
                 var url = imgArr[i-1];
                $(".item .num").eq(i-1).css("backgroundImage","url("+url+")")
            }
            // 提交
            $(".next_btn").last().html("提交").addClass('submit');
            $(".submit").click(function(){
                setTimeout(function(){
                    answer=JSON.stringify(answer);                    
                     $.ajax({
                          type: 'POST',
                          url:'/zjsf/answer',
                          data:answer,
                          contentType: "application/json",
                          dataType: 'json',
                          success: function(data){
                            if(data.success){
                               window.location.href = "/zjsf/index"
                            }else{
                                var errorObj = {
                                    msg:data.message,
                                    module:"answer.js"
                                };
                                ajaxErrorLog(errorObj);
                            }
                              
                          },
                          error: function(XMLHttpRequest, textStatus, errorThrown){
                              var errorObj = {
                                  XMLHttpRequest:XMLHttpRequest,
                                  textStatus:textStatus,
                                  errorThrown:errorThrown,
                                  module:"answer.js"
                              };
                              ajaxErrorLog(errorObj);
                          }
                        })
                },0)
                
                
            });
            // 单选
            $("li").click(function(){
                $(this).find('p').addClass('checked');
                $(this).find('.red').show();
                $(this).siblings('li').find('p').removeClass('checked');
                $(this).siblings('li').find('.red').hide();
                $(this).find(".answer").prop("checked","checked");
            });

            //下一题
            $(".next_btn").click(function(){
                $("input:radio").attr("checked",false);
               if($("input:checked").length == 0){
                    $(".hint").show();
                    setTimeout(function(){
                    $(".hint").hide();
                    }, 1500)
               }else{
                    var qid=$(".question").data("qid");
                    var aid=$("input:checked").val();
                    answer[qid]=aid;
                    if($(this).parents(".item").next(".item").length){
                        $(this).parents(".item").remove().next(".item").show();
                    };
               }
            });
        }