    require("./loghub-tracking.js");

    //=============
        //规则页
    //=============
    if($(".rule").length){
        $(".btn").click(function(){
            $(".rule").hide();
            $(".login").show();
        });
    }
    //=============
        //登录页
    //=============
   function ajaxErrorLog(msg){
        msg = msg || {};
        var logger = new window.Tracker('lvbo-contest.cn-hangzhou.log.aliyuncs.com','lvbo-contest','contest');
        for (var key in msg) {
          logger.push(key, msg[key]);
        }               
        logger.logger();
    }

    if($(".login").length){
        var param;
        var org=[];
        $.ajax({
          type: 'GET',
          url:'/zjsf/area',
          dataType: 'json',
          success: function(data){
            if(data.success){
                org = data.data.city;
                // 数据填充
                $.fn.extend({
                    "casmenu": function (data) {
                        var template="<option disabled selected >请选择地区/单位</option>";
                        data.forEach(function(e){  
                            template+="<option value='"+e.id+"'>"+e.name+"</option>"   
                        });
                        this.html(template); 
                        this.change(function(event) {
                            var template="<option disabled selected >请选择区县</option>";
                            var id=$(this).val();
                            data.forEach(function(e){
                                if(id == e.id){
                                    e.district.forEach(function(e){
                                        template+="<option value='"+e.id+"'>"+e.name+"</option>";
                                    });
                                    $(".level_B").html(template); 
                                }
                            })                 
                        });          
                    }
                });
                $(".level_A").casmenu(org);
            }else{
                var errorObj = {
                    msg:data.message,
                    module:"login.js"
                };
                ajaxErrorLog(errorObj);
            }
              
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            var errorObj = {
                XMLHttpRequest:XMLHttpRequest,
                textStatus:textStatus,
                errorThrown:errorThrown,
                module:"login.js"
            };
            ajaxErrorLog(errorObj);
          }
        })

            

            //select默认颜色
            $("select").focus(function(event) {
                $(this).addClass('focus');                
            });
            $("select").blur(function(event) {
               if($(this).val() == null){
                    $(this).removeClass('focus');
                }else{
                    $(this).addClass('focus');
                }                
            });

            // 表单验证
            $("input").blur(function(){
                if($(this).val() == ''){
                    $(this).parents('.inputUI').addClass('fail')
                }else{
                    $(this).parents('.inputUI').removeClass('fail')
                }
            });
            $("#phone").blur(function(){
                if(!(/^1[34578]\d{9}$/.test($("#phone").val()))){ 
                    $("#phone").parents(".inputUI").addClass('fail') 
                    return false; 
                }else{
                    $("#phone").parents(".inputUI").removeClass('fail')
                }
            });
            $("#org").blur(function(){
                if($(this).val() == null){
                    $(this).addClass('fail')
                }else{
                    $(this).removeClass('fail')
                }
            });
            
            $.mvalidateExtend({
                phone:{
                    required : true,   
                    pattern : /^0?1[3|4|5|8][0-9]\d{8}$/,
                    each:function(){
                       
                    },
                    descriptions:{
                        required : '<div class="field-invalidmsg">请输入手机号码</div>',
                        pattern : '<div class="field-invalidmsg">您输入的手机号码格式不正确</div>',
                        valid : '<div class="field-validmsg">正确</div>'
                    }
                },
            });
            $("form").mvalidate({
                type:1,
                onKeyup:true,
                sendForm:true,
                firstInvalidFocus:false,
                valid:function(event,options){
                    //点击提交按钮时,表单通过验证触发函数
                    event.preventDefault();
                        $.ajax({
                          type: 'POST',
                          url: '/zjsf/login',
                          data:param,
                          dataType: 'json',
                          success: function(data){
                                if(data.success){
                                   window.location.href = "/zjsf/index"
                                }else{
                                    var errorObj = {
                                        msg:data.message,
                                        module:"login.js"
                                    };
                                    ajaxErrorLog(errorObj);
                                }
                          },
                          error: function(XMLHttpRequest, textStatus, errorThrown){

                            var errorObj = {
                                XMLHttpRequest:XMLHttpRequest,
                                textStatus:textStatus,
                                errorThrown:errorThrown,
                                module:"login.js"
                            };
                            ajaxErrorLog(errorObj);

                          }
                        })

                },
                invalid:function(event, status, options){
                    //点击提交按钮时,表单未通过验证触发函数
                },
                eachField:function(event,status,options){
                    //点击提交按钮时,表单每个输入域触发这个函数 this 执向当前表单输入域，是jquery对象
                },
                eachValidField:function(val){},
                eachInvalidField:function(event, status, options){},
                conditional:{
                    confirmpwd:function(){

                    }
                },
                 descriptions:{
                    area:{
                        required : '请选择所在地区'
                    },
                     name:{
                        required : '请输入姓名'
                    }
                }
            });
        
            $(".start_btn").click(function(){
                var name=$("#name").val();
                var phone=$("#phone").val();
                var city=$("#org").val();
                var district=$("#district").val();
                param=$.param({
                    name:name,
                    phone:phone,
                    city:city,
                    district:district
                });
                $("form").submit();
                $("input").trigger('blur');
                $("#org").trigger('blur');      
            });
           
        }
