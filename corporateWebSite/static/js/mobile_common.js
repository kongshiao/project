/* 
* @Author: Marte
* @Date:   2017-08-17 11:35:28
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-25 11:48:02
*/

$(document).ready(function(){
     // 响应式处理
            function responsive(){
                    var width=window.screen.width;//获取文档即视口的宽度
                    console.log(width);
                    document.getElementsByTagName("html")[0].style.fontSize=(width/18.75)+"px";//设置html文字大小为40px;
            }
            responsive();
            window.onresize=function(){
                responsive();
            }

             //菜单
            $(".head_mobile .menu_icon").click(function(){
                $(".head_mobile .slide_down").slideToggle("slow");
            });

            $(".slide_down .box").click(function(){
                $(this).next("ul").toggle("slow");
                $(this).find('i').toggleClass('open');
                $(this).toggleClass('open');
            });

             $(window).scroll( function() {
                if($(window).scrollTop()>=80){
                    $(".head_mobile").fadeOut("fast");
                    $(".slide_down .item ul").slideUp("slow");
                    $(".slide_down .box").removeClass('open');
                    $(".slide_down .box").find('i').removeClass('open');


                }else{
                    $(".head_mobile").fadeIn();
                     $(".head_mobile .slide_down").slideUp("slow");

                }

            });


            //tab切换
            if($('.tab_bar').length){
                $('.tab_bar span').click(function(){
                    $(this).addClass('active').parent('li').siblings('li').find('span').removeClass('active');
                    $('.tab_content').eq($(this).parent("li").index()).show().siblings('.tab_content').hide();
                });
            }       
});