/* 
* @Author: Marte
* @Date:   2017-09-05 09:34:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-12 16:29:56
*/

$(document).ready(function(){
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


// 获取本地坐标
var loc={};
  var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          loc.lat = r.point.lat;
          loc.lng = r.point.lng;
            
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
        }
        else {
            alert('failed'+this.getStatus());
        }        
    },{enableHighAccuracy: true})

// 创建地图1
 var mp = new BMap.Map("map1");
 mp.centerAndZoom(new BMap.Point(120.11289147343,30.448287823184), 11);
 mp.enableScrollWheelZoom();

// 创建地图2
 var mp2 = new BMap.Map("map2",{minZoom: 10, maxZoom: 12});
    mp2.addControl(new BMap.NavigationControl());
    mp2.centerAndZoom(new BMap.Point(119.799999, 30.767583), 11);


    var tileLayer = new BMap.TileLayer();
    tileLayer.getTilesUrl = function(tileCoord, zoom) {
        var x = tileCoord.x;
        var y = tileCoord.y;
        return 'tiles/' + zoom + '/tile' + x + '_' + y + '.png';
    }
    mp2.enableScrollWheelZoom(); 
    mp2.addTileLayer(tileLayer);
   

    // 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
       div.style.color = "white";
      div.style.height = "29px";
      div.style.width = "21px";

      div.style.lineHeight = "24px";
      div.style.textAlign = "center";

      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "16px"
      div.style.background = "url(./img/nor-icon-location.png) no-repeat";
      div.style.backgroundSize = "21px auto";
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));      
      var that = this; 
      div.addEventListener( 'touchend',function(e){
        var index = parseInt($(e.target).text())-1
          mp.clearOverlays();
          $(".unit_list").hide();
          $(".introduce").hide();
          $(".details .unit").html($(".tab_content li").eq(index).data("title"));
          $(".details .address").html($(".tab_content li").eq(index).data("address"));
          $(".details .tel").html($(".tab_content li").eq(index).data("tel"));
          $(".details").show();
          var lng =$(".tab_content li").eq(index).data("lng");
          var lat = $(".tab_content li").eq(index).data("lat");
          var title = $(".tab_content li").eq(index).data("title");
          mp.centerAndZoom(new BMap.Point(lng,lat), 11);
        // console.log(lng+"nini")
         var myCompOverlay = new ComplexCustomOverlay2(new BMap.Point(lng,lat), '','');
          mp.addOverlay(myCompOverlay);
          $(".nav_icon").attr("href","http://api.map.baidu.com/direction?origin=latlng:"+loc.lat+","+loc.lng+"|name:我的位置&destination=latlng:"+lat+","+lng+"|name:"+title+"&mode=driving&region=湖州&output=html&src=yourCompanyName|yourAppName")
      })

      mp.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x + "px";
      this._div.style.top  = pixel.y + "px";
    }
    
  
  // 复杂的自定义覆盖物2
   function ComplexCustomOverlay2(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay2.prototype = new BMap.Overlay();
    ComplexCustomOverlay2.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
       div.style.color = "white";
      div.style.height = "29px";
      div.style.width = "21px";

      div.style.lineHeight = "27px";
      div.style.textAlign = "center";

      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "16px"
      div.style.background = "url(./img/hover-icon-location.png) no-repeat";
      div.style.backgroundSize = "21px auto";
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));      
      var that = this; 
      div.onmouseover = function(){
       
      }

      div.onmouseout = function(){
       
      }

      mp.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    ComplexCustomOverlay2.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x + "px";
      this._div.style.top  = pixel.y + "px";
    }
  
    // 复杂的自定义覆盖物3
   function ComplexCustomOverlay3(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay3.prototype = new BMap.Overlay();
    ComplexCustomOverlay3.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
       div.style.color = "white";
      div.style.height = "27px";
      div.style.width = "21px";

      div.style.lineHeight = "27px";
      div.style.textAlign = "center";

      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "16px"
      div.style.background = "url(./img/hover-icon-location.png) no-repeat";
      div.style.backgroundSize = "21px auto";
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));      
      var p = this._p = document.createElement("p");
      div.appendChild(p);
      p.appendChild(document.createTextNode(this._overText));
      p.style.position = "absolute";
      p.style.fontSize = "14px";
      p.style.color = "#202020";     

      var that = this; 
      div.onmouseover = function(){
       
      }

      div.onmouseout = function(){
       
      }

      mp.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    ComplexCustomOverlay3.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x + "px";
      this._div.style.top  = pixel.y + "px";
    }
      
  
var path = "http://192.168.0.202:8080/dqdt/lists?agencyType=";
var data;
function getData1(){
    var template1 = "";
        $.ajax({
          url:path+"1",
          type: 'GET',
          dataType: 'json',
          success:function(msg){
            if(msg.message == "成功"){
              data = msg.pois;
              var template1 = ""
              for(var i = 1;i<=data.length;i++){
                  // var data =  a.pois //.
                var lng = data[i-1].location[0];
                var lat = data[i-1].location[1];
                  
          
                template1+='<li class="clearfix" data-lng='+lng+' data-lat='+lat+' data-tel='+data[i-1].contact+' data-title='+data[i-1].title+' data-address='+data[i-1].address+'><div class="icon fl">'+i+'</div><div class="text fl"><h2 class="unit">'+data[i-1].title+'</h2><p class="address truncate">'+data[i-1].address+'</p></div><div class="arrow fr"></div></li>'

                   // 给地图添加点
                   var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(lng,lat), i,i);
                  mp.addOverlay(myCompOverlay);
                  mp.centerAndZoom(new BMap.Point(119.975619,30.517948), 14);

                
              }
              $(".tab_content").html(template1)
            }
          },
          fail:function(msg){
              alert("网络请求失败！")
          }
        });
};
getData1()
function getData2(){
        $.ajax({
          url:path+"2",
          type: 'GET',
          dataType: 'json',
          success:function(msg){
            if(msg.message == "成功"){
              data = msg.pois;
              var template1 = ""
              for(var i = 1;i<=data.length;i++){
                  var lng = data[i-1].location[0];
                  var lat = data[i-1].location[1];

                 template1+='<li class="clearfix" data-lng='+lng+' data-lat='+lat+' data-tel='+data[i-1].contact+' data-title='+data[i-1].title+' data-address='+data[i-1].address+'><div class="icon fl">'+i+'</div><div class="text fl"><h2 class="unit">'+data[i-1].title+'</h2><p class="address truncate">'+data[i-1].address+'</p></div><div class="arrow fr"></div></li>'

                 // 给地图添加点
                   var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(lng,lat), i,i);
                  mp.addOverlay(myCompOverlay);
                  mp.centerAndZoom(new BMap.Point(120.11289147343,30.448287823184), 11);

              }
              $(".tab_content").html(template1)
            }
          },
          fail:function(msg){
              alert("网络请求失败！")
          }
        });
}
function getData3(){
        $.ajax({
          url:path+"3",
          type: 'GET',
          dataType: 'json',
          success:function(msg){
            if(msg.message == "成功"){
               data = msg.pois;
              console.log(msg) 

              var template1 = "";
             for(var i = 1;i<=data.length;i++){
                (function(j){
                  var lng = data[j-1].location[0];
                  var lat = data[j-1].location[1];
                  var title = data[j-1].title;

                  var marker = new BMap.Marker(new BMap.Point(lng,lat));  //创建标注
                  marker.index = j-1;

                  mp2.addOverlay(marker);  // 将标注添加到地图中
                  var label = new BMap.Label(data[j-1].title);
                   label.addEventListener("click",function(){
                      mp2.clearOverlays();
                      mp.clearOverlays(); 
                      var index = marker.index
                      $("#map1").show();
                      $("#map2").hide();
                      $(".unit_list").hide();
                      $(".introduce").hide();
                      $(".details .unit").html($(".tab_content li").eq(index).data("title"));
                      $(".details .address").html($(".tab_content li").eq(index).data("address"));
                      $(".details .tel").html($(".tab_content li").eq(index).data("tel"));
                      $(".details").show();
                      var lng =$(".tab_content li").eq(index).data("lng");
                      var lat = $(".tab_content li").eq(index).data("lat");
                      var title = $(".tab_content li").eq(index).data("title");
                      var myCompOverlay = new ComplexCustomOverlay2(new BMap.Point(lng,lat), '','');                   
                      mp.addOverlay(myCompOverlay);
                      mp.centerAndZoom(new BMap.Point(loc.lng,loc.lat), 11);
                      setTimeout(function(){
                      mp.centerAndZoom(new BMap.Point(lng,lat), 11);

                    }, 50)

                      $(".nav_icon").attr("href","http://api.map.baidu.com/direction?origin=latlng:"+loc.lat+","+loc.lng+"|name:我的位置&destination=latlng:"+lat+","+lng+"|name:"+title+"&mode=driving&region=湖州&output=html&src=yourCompanyName|yourAppName")
                   })
                  
                  marker.setLabel(label);
                  $(".BMapLabel").css({
                    "border":0,
                    "textAlign":"center"

                  }).addClass('truncate');

                  marker.addEventListener("click",function(){
                    mp2.clearOverlays();
                    mp.clearOverlays(); 
                    var index = marker.index
                    $("#map1").show();
                    $("#map2").hide();
                    $(".unit_list").hide();
                    $(".introduce").hide();
                    $(".details .unit").html($(".tab_content li").eq(index).data("title"));
                    $(".details .address").html($(".tab_content li").eq(index).data("address"));
                    $(".details .tel").html($(".tab_content li").eq(index).data("tel"));
                    $(".details").show();
                    var lng =$(".tab_content li").eq(index).data("lng");
                    var lat = $(".tab_content li").eq(index).data("lat");
                    var title = $(".tab_content li").eq(index).data("title");
                    var myCompOverlay = new ComplexCustomOverlay2(new BMap.Point(lng,lat), '','');                   
                    mp.addOverlay(myCompOverlay);
                    mp.centerAndZoom(new BMap.Point(loc.lng,loc.lat), 11);
                    setTimeout(function(){
                    mp.centerAndZoom(new BMap.Point(lng,lat), 11);

                  }, 50)

                    $(".nav_icon").attr("href","http://api.map.baidu.com/direction?origin=latlng:"+loc.lat+","+loc.lng+"|name:我的位置&destination=latlng:"+lat+","+lng+"|name:"+title+"&mode=driving&region=湖州&output=html&src=yourCompanyName|yourAppName")
                  });
                  

                 template1+='<li class="clearfix" data-lng='+lng+' data-lat='+lat+' data-tel='+data[j-1].contact+' data-title='+data[j-1].title+' data-address='+data[j-1].address+'><div class="icon fl">'+i+'</div><div class="text fl"><h2 class="unit truncate"></h2><p class="address truncate"></p></div><div class="arrow fr"></div></li>'

                })(i)
                  
              }
              $(".tab_content").html(template1)
            }
          },
          fail:function(msg){
              alert("网络请求失败！")
          }
        });     
}

// tab切换
$(".tab_bar1").click(function(){
  $(this).addClass('active').siblings('li').removeClass('active')
    mp.clearOverlays();
    getData1();
    $(".details").hide();
    $("#map1").show();
    $("#map2").hide();
    $(".details").hide();
    setTimeout(function(){
      $(".unit_list").show();
    }, 0)
});

$(".tab_bar2").click(function(){
  $(this).addClass('active').siblings('li').removeClass('active');
   mp.clearOverlays();
    getData2();
    $(".details").hide();
    $("#map1").show();
    $("#map2").hide(); 
    $(".details").hide();
    setTimeout(function(){
      $(".unit_list").show();
    }, 0)
}); 

$(".tab_bar3").click(function(){
  $(this).addClass('active').siblings('li').removeClass('active');
   mp2.clearOverlays();
   getData3()
  $(".details").hide();
  $("#map1").hide();
  $("#map2").show();
  $(".unit_list").hide();
  $(".introduce").show();
});         

 // 详细地址   
$('.tab_content').on('click', 'li', function(ev) {
  mp.clearOverlays();
  $(".unit_list").hide();
  $(".introduce").hide();
  $(".details .unit").html($(this).data("title"));
  $(".details .address").html($(this).data("address"));
  $(".details .tel").html($(this).data("tel"));
  $(".details").show();
  var lng = $(this).data("lng");
  var lat = $(this).data("lat");
  var title = $(this).data("title");
  mp.centerAndZoom(new BMap.Point(lng,lat), 11);
 var myCompOverlay = new ComplexCustomOverlay2(new BMap.Point(lng,lat), '','');
  mp.addOverlay(myCompOverlay);    
  $(".nav_icon").attr("href","http://api.map.baidu.com/direction?origin=latlng:"+loc.lat+","+loc.lng+"|name:我的位置&destination=latlng:"+lat+","+lng+"|name:"+title+"&mode=driving&region=湖州&output=html&src=yourCompanyName|yourAppName")  
})


});