/* 
* @Author: Marte
* @Date:   2017-03-15 15:10:04
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-12 12:47:48
*/

//为了触发ios下active状态
// document.body.addEventListener('touchstart', function () {});  

    
   
function Select(){
    // 单选
     $('.selectBox.single li').click(function(){

        $(this).find(".red").addClass('show').parents("li").siblings("li").find(".red").removeClass('show');
        $(this).find('span').css('color','#B31212').parents('li').siblings('li').find('span').css('color', '#666');
        $(this).data("checked","1").siblings('li').data("checked","0");      
    });

    //多选
    $('.selectBox.multiple li').click(function(){
            if($(this).data("checked")=="0"){
                $(this).find(".red").addClass('show');
                $(this).find('span').css('color','#B31212'); 
                $(this).data("checked","1");   
            }else{
                $(this).find(".red").removeClass('show');
                $(this).find('span').css('color','#666'); 
                $(this).data("checked","0");
            };

              
    });
     
}

   

    // selectUI下拉框
    
    $('.default').bind('touchstart', function(event) {
            event.preventDefault();       
    });

    $('.default').bind('touchend', function(event) {
        event.stopPropagation(); 
        event.preventDefault();
        if($(this).data('status')=="close"){
            $(this).next("ul").css("display","block");
            $(this).data('status',"open");
            $(this).parent(".selectUI").addClass('open');
        }else{
            $(this).next('ul').css("display","none");
            $(this).data('status',"close");
            $(this).parent(".selectUI").removeClass('open');
        }
    });



    $(document).click(function(){
        $('.selectUI ul').css("display","none");
        $('.selectUI .default').data('status',"close");
        $('.selectUI').removeClass('open');
    });

 

    $('.selectUI li').click(function(){
        $(this).parent("ul").siblings('.default').find("span").text($(this).text()).addClass('checked').parent(".default").data("status","close").next("ul").css("display","none").parent(".selectUI").removeClass('open empty');
    });
 


    // inputUI
    $(".inputUI").click(function () {
        $(this).removeClass("empty");
    });

    $(".page").not(".resultPage,.rulePage,.loginPage").bind('touchmove' ,function(event) {
       event.preventDefault();
   });

    