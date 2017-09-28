/* 
* @Author: Marte
* @Date:   2017-07-19 11:11:36
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-19 14:55:31
*/

$(document).ready(function(){
    // 如果有子菜单下拉隐藏；
   if($('.subnav').length){
         $(window).scroll( function() {
                if($(window).scrollTop()>=80){
                    $(".head").removeClass('no_shadow');
                    $(".subnav").fadeOut();
                }else{
                    $(".head").addClass('no_shadow');
                    $(".subnav").fadeIn();
                }

            });
    }

    // 首页
    if($('.index').length){
        $(window).scroll( function() {
            if($(window).scrollTop()>=80){
                $(".logo img").attr("src","static/img/logo2.png");
                $(".head").addClass('scroll');
                $(".head_navigation a").addClass('scroll').removeClass('normal');
            }else{
                $(".logo img").attr("src","static/img/logo1.png");
                $(".head").removeClass('scroll');
                $(".head_navigation a").addClass('normal').removeClass('scroll');
            }

        } );
    }


//tab切换
    if($('.tab_bar').length){
        $('.tab_bar span').click(function(){
            $(this).addClass('active').parent('li').siblings('li').find('span').removeClass('active');
            $('.tab_content').eq($(this).parent("li").index()).show().siblings('.tab_content').hide();
        });
    }
// JQ-end
});