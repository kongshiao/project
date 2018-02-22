// 响应式处理
function responsive() {
  var width = document.body.clientWidth;//获取文档即视口的宽度
  document.getElementsByTagName("html")[0].style.fontSize = (width / 18.75) + "px";//设置html文 字大小为40px;
}
responsive();
window.onresize = function () {
  responsive();
}
function responsive() {
  var width = document.body.clientWidth;
  document.getElementsByTagName("html")[0].style.fontSize = (width / 18.75) + "px";
}
responsive();
window.onresize = function () {
  responsive();
}

document.getElementsByTagName("body")[0].style.opacity = 0;
setTimeout(function () {
  document.getElementsByTagName("body")[0].style.opacity = 1;
}, 500);

var url = 'http://192.168.0.201:8100'
//=============
//规则页
//=============
if ($(".rule").length) {
  $(".btn").click(function () {
    $(".rule").hide().siblings(".answer").show()
  })

  $(".mask .buttonBox").click(function () {
    WeixinJSBridge.call('closeWindow');
  })
}

//=============
//登录页
//=============
if ($(".login").length) {
  function checkPhone(s) {//手机格式验证
    var regu = /^[1][3,4,5,7,8][0-9]{9}$/;
    var re = new RegExp(regu);
    if (re.test(s)) {
      return true;
    } else {
      return false;
    }
  };

  $(".btn").click(function () {
    // 表单验证
    var name = $(".name").val();
    var phone = $(".phone").val()
    if (name == '') {
      $(".toast").text("姓名不能为空！").show()
      setTimeout(function () {
        $(".toast").hide()
      }, 1500)
      return;
    }

    if (phone == '') {
      $(".toast").text("手机号码不能为空！").show()
      setTimeout(function () {
        $(".toast").hide()
      }, 1500)
      return;
    } else if (!checkPhone(phone)) {
      $(".toast").text("手机号码格式不正确！").show()
      setTimeout(function () {
        $(".toast").hide()
      }, 1500)
      return;
    }

    var data = $.param({
      name: name,
      phone: phone
    })

    // 登录信息提交
    $.ajax({
      type: 'POST',
      url: url + '/dqks/pufa/login?test=true',
      data: data,
      dataType: 'json',
      success: function (data) {
        if (data.code != 0) {
          alert(msg)
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('请求错误！')
      }
    })
  })
}

//=============
//答题页
//=============
if ($(".answer").length) {
  $(".answer .item").eq(0).show();
  $(".answer .next").last().addClass("submit").text("提交");
  $(".answer .item .option").click(function () {
    $(this).toggleClass("active").siblings(".option").removeClass("active")
  })
  var single = {};
  var fullMark;
  var hasShare;
  // 下一题
  $(".answer .next").click(function () {
    if ($(this).parent(".item").find(".active").length == 0) {
      $(".answer .toast").show();
      setTimeout(function () {
        $(".answer .toast").hide();
      }, 1500)
    } else {
      var qid = $(this).parent(".item").data("qid");
      var answer;
      var index = $(this).parent(".item").find(".active").index();
      if (index == 1) {
        answer = 'a'
      } else if (index == 2) {
        answer = 'b'
      } else if (index == 3) {
        answer = 'c'
      } else {
        answer = 'd'
      }

      single[qid] = answer

      if ($(this).hasClass('submit')) {
        
      } else {
        // 下一题
        $(this).parent(".item").hide().next(".item").show()
      }
    }
  })
}

//=============
//得分页
//=============
if ($(".result").length) {
  // 返回
  $(".result .back").click(function(){
    WeixinJSBridge.call('closeWindow');
  })

  // 重新答题
  $(".result .btn_2").click(function () {
    window.location.replace("http://192.168.0.201:8100/dqks/pufa/index")
  })
}

//=============
//抽奖页
//=============
if ($(".lottery").length) {
  // 再抽一次
  $(".lottery .btn_more").click(function(){
      //抽奖
      $.ajax({
          type: 'POST',
          url: url+'/dqks/pufa/draw',
          dataType: 'json',
          success: function(data){
            if(data.code == 0){
              $('#scratchCard').wScratchPad('reset');
              setTimeout(function(){
                if(data.data.isPrize){
                  // 中奖
                  $(".lottery .win span").text(data.data.prize);
                  $(".lottery .win").show().siblings(".not_win").hide();
                }else{
                  //未中奖
                  $(".lottery .not_win").show().siblings(".win").hide();
                }
              },1000)
            }else{
              alert(data.msg)
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            alert('请求错误！')
          }
      })
  })
}

//=============
//活动未开始
//=============
if ($(".back").length) {
  $(".buttonBox").click(function () {
    WeixinJSBridge.call('closeWindow');
  })
}  
