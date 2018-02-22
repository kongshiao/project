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
        document.getElementsByTagName("html")[0].style.fontSize=(width/18.75)+"px";
    }
    responsive();
    window.onresize=function(){
        responsive();
    }

    document.getElementsByTagName("body")[0].style.opacity = 0;
    setTimeout(function(){
      document.getElementsByTagName("body")[0].style.opacity = 1;
    },500);

    var app = new Vue({
      el: '#app',
      data:{
        total:55,
        list:[],
        isSubmit:true,
        disable:false,
        url:"http://192.168.0.202:8080/lxtp/",
        onload:false,
      },
      created: function () {
          this.initData();
          this.isVoted();
          this.onload = true

      },
      methods:{
        initData:function(){
            var total;
            var data = [];
            this.$http.get(this.url+'vote/list').then(function(response){
                // 响应成功回调
                if(response.body.status == 0){
                    total = response.body.total;
                    data = response.body.data;
                    data.forEach(function(e){
                        e.isChecked = false;
                        e.percentage = e.votes/total*100+"%";
                      })

                    this.list = data;
                }else{
                    alert(response.body.msg)
                }
                
                    
            }, function(response){
                // 响应错误回调
                alert("Ajax Error!")
            });        
        },
        isVoted:function(){
            this.$http.get(this.url+'voted').then(function(response){
                // 响应成功回调
                if(response.body.status == 2){
                    this.disable = true;
                    this.isSubmit = false;
                }else if(response.body.status == 1){
                    alert(response.body.msg)
                }
                
                    
            }, function(response){
                // 响应错误回调
                alert("Ajax Error!")
            });        
        },
        vote:function(id){
            this.list.forEach(function(e){
                if(e.id == id){
                  e.isChecked=!e.isChecked;
                  return;
                }               
            })
        },
        submit:function(){
            var votesArr = [];
            this.list.forEach(function(e){
                if(e.isChecked == true){
                  votesArr.push(e.id)
                }
            })

            if(votesArr.length>10){
                alert("一次只能投给10位律师哦！")
            }else if(votesArr.length<10){
              alert("投满10人才可提交哦！")
            }else{
              var state = this.isSubmit=false;
              var voteid ={ids:votesArr}
              this.$http.post(this.url+'vote',voteid).then(function(response){
              // 响应成功回调
              if(response.body.status == 0){
                  var total = response.body.total;
                  this.list.forEach(function(e,index){
                    e.votes = response.body.data[index].votes;
                    e.percentage = e.votes/total*100+"%";      
                  })

                  this.disable=true;
                  this.isSubmit=false;
              }else{
                  alert(response.body.msg)
              }
                
                    
            }, function(response){
                // 响应错误回调
                
            });
                
            }
        },
        submitTip:function(){
          alert("今天您已投票，请明天再来!")
        }
      }
    })
