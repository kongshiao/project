<template>
  <div class="rankingListPage">
    <div class="title clearfix">
      <span class="fl  ranking">排名</span>
      <span class="fr  poll">总票数</span>
    </div>
    <ul class="list">
      <li class="clearfix" v-for="item in list" :class="{first:item.num==1,second:item.num==2,third:item.num==3,}">
        <div class="fl">
          <span class="index">#{{item.num}}</span>
          <span class="name">{{item.name}}</span>
        </div>
        <div class="voteNum fr">
          <span>{{item.vote}}</span>
          票
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'rulePage',
  data () {
    return {
      
      list:[
        {
          num:1,
          name:"孔诗翱",
          vote:1000
        },
         {
          num:2,
          name:"孔翱",
          vote:2000
        },
         {
          num:3,
          name:"孔诗",
          vote:1200
        },
         {
          num:4,
          name:"孔诗",
          vote:1200
        },
         {
          num:5,
          name:"孔诗",
          vote:1200
        },
         {
          num:6,
          name:"孔诗",
          vote:1200
        },
         {
          num:7,
          name:"孔诗",
          vote:1200
        },
         {
          num:8,
          name:"孔诗",
          vote:1200
        },
        
      ],

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
   .title{
    padding:(20rem/40) (38rem/40);
    font-size: (30rem/40);
    line-height: 1em;
    color:#999;
    background:#e9f6ff;

   }
   .list{
      padding:0 (20rem/40);
      li{
        border-bottom:(1rem/40) solid #d9d9d9;
        height:(110rem/40);
        line-height: (110rem/40);
        font-size:(34rem/40);
        padding:0 (9rem/40);
      
        .index{
          display:inline-block;
          height:(110rem/40);
          margin-right: (30rem/40);
          width:(44rem/40);
          color:#27a8ff;
          background-repeat: no-repeat;
          background-position: center;
          background-size: (44rem/40) auto;
        }
        
        .voteNum{
          color:#27a8ff;
           color:#666;
        }
      }
   }

  
</style>
