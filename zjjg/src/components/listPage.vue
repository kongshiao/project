<template>
  <div class="listPage">
  <div class="top clearfix">
    <div :class="{focus:isFocus}" class="inputUI">
        <input type="text" id="name" placeholder="请输入你的姓名" v-on:focus="isFocus=true" :class="{focus:isFocus}" v-model="searchValue"/>
        <div class="clear" v-show="isFocus" @click="searchValue=''"></div>
    </div>
    <p v-if="isFocus">完成</p>
  </div>
  <div class="container">
    <div class="content">
      <div class="item" v-for="item in list">
        <div class="title" @click="change(item.isOpenSlidedown,item.department)" :class='{open:item.isOpenSlidedown}'>{{item.department}}</div>
          <div class="slidedown clearfix" v-show="item.isOpenSlidedown">
            <div class="voteBox clearfix" @click="check(member.isChecked,member.id)" v-for="member in item.member">
              <div class="checkUI fl" :class="{checked:member.isChecked}">
                <div class="blue " v-show="member.isChecked"></div>
              </div>
              <span class="name fl">{{member.name}}</span>
            </div>
          </div>
      </div>    
    </div>
    <button class="entry buttonUI " @click="getData">提交</button>
  </div>
  <!-- <div class="searchContainer">
    <div class="content">
      <div class="item">
        <div class="title .searchTitle" style="background:#fff;">刑事司法系</div>
        <div class="slidedown" style="background:#fff;">
          <div class="voteBox clearfix" >
              <div class="checkUI fl" >
                <div class="blue "></div>
              </div>
              <span class="name fl">林秀姐</span>
          </div>
        </div>
      </div> 
    </div>  
  </div> -->
  </div>
</template>

<script>
export default {
  name: 'listPage',
  created () {
      // this.getData();
      console.log(1)
      this.$http.get('http://192.168.0.140/web-ssm/saveUser0').then(function(response){
        console.log(response.body)
          // 响应成功回调
      }, function(response){
          // 响应错误回调
      });
  },
  data () {
    return {
      isFocus:false,
      isOpenSlidedown:false,
      isChecked:false,
      searchValue:"",
      list:[],
      a:[
        {
          department:"动漫系",
          isOpenSlidedown:true,
          member:[
            {
              name:"孔诗翱",
              id:11,
              isChecked:false
            },
            {
              name:"孔诗翱",
              id:12
            },
            {
              name:"孔诗翱",
              id:13
            },
            {
              name:"孔诗翱",
              id:14
            },
            {
              name:"孔诗翱",
              id:15
            },
            {
              name:"孔诗翱",
              id:16
            },
            {
              name:"孔诗翱",
              id:17
            },
            {
              name:"孔诗翱",
              id:18
            },
            {
              name:"孔诗翱",
              id:18
            },
            {
              name:"孔诗翱",
              id:20
            },
            {
              name:"孔诗翱",
              id:21
            },
            {
              name:"孔诗翱",
              id:22
            },
            {
              name:"孔诗翱",
              id:23
            },
          ]
        },
        {
          department:"电信系",
          isOpenSlidedown:false,
          member:[
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
            {
              name:"陈一飞",
              id:2
            },
          ]
        },
        {
          department:"电视系",
          isOpenSlidedown:true,
          member:[
            {
              name:"张三",
            },
            {
              name:"张三",
            },
            {
              name:"张三",
            },
            {
              name:"张三",
            },
            {
              name:"张三",
            },

            {
              name:"张三",
            },
            {
              name:"张三",
            },
            {
              name:"张三",
            },

            {
              name:"张三",
            },
            {
              name:"张三",
            },
            {
              name:"张三",
            },

            {
              name:"张三",
            },


          ]
        }

      ]
    }
  },
  methods: {
    getData () {
      this.a.forEach(function(e){
        e.isOpenSlidedown=false;
        e.member.forEach(function(mem){
            mem.isChecked=true
        })
      })

      this.list=this.a
      console.log(this.list);
      

    },
    change (state,department) {
      // this.list.forEach(function(e){
      //   if(e.department.indexOf(department)!= -1){
      //     console.log(e.isOpenSlidedown);
      //     e.isOpenSlidedown = !state;
      //     console.log(e.isOpenSlidedown);
      //   }
      // })
      
      for(var i=0;i<this.list.length;i++){
          if(this.list[i].department.indexOf(department) != -1){
              this.list[i].isOpenSlidedown = !state
            console.log(this.list);

          }
      } 
    },
    check (state,id) {
      alert(1)
      for(var i=0;i<this.list.length;i++){
          for(var j=0;j<this.list[i].member.length;j++){
            if(this.list[i].member[j].id==id){
              this.list[i].member[j].isChecked=!this.list[i].member[j].isChecked
              console.log(this.list[i].member[j].isChecked)
            }
          }
      } 

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
  button{
    margin-top: (130rem/40);
  }

</style>
