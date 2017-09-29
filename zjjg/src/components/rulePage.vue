<template>
  <div class="rulePage">
    <h1 class="log">
      <img src="static/img/logo.png" alt="" />
    </h1>
    <div class="text">
      <p>
        <span>投票目的:</span>
        推选浙江警官职业学院“我最喜爱的教师”
      </p>
      <p>
        <span>投票时间:</span>
        5月8日0：00至5月14日24：00。
      </p>
      <p>
        <span>投票平台：</span>
        浙江警官职业学院微信公众号。
      </p>
      <p>
        <span>注意事项：</span>
      </p>
      <p>
        1.需关注“浙江警官职业学院”微信公众号方可投票，每个微信帐号可投票一次，每次最少选择1人，最多可同时选择10人。
      </p>
      <p>
        2.各系部要高度重视，广泛发动毕业生和在校生自愿参与投票评选活动。
      </p>
      <p>
        3.投票结果将作为浙江警官职业学院“我最喜爱的教师”的重要参考依据。
      </p>
      <p>
        4.严禁使用商业手段或通过其他不正当途径进行拉票、投票的作弊行为，一经发现，将取消相关人选的票数。
      </p>
      <p>
        5. 本活动不收取任何费用。
      </p>
      <p>
        6.本活动最终解释权归学院教务处所有。
      </p>
    </div>

    <router-link to="/listPage">
        <button class="entry buttonUI">进入</button>    
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'rulePage',
  data () {
    return {
      msg: 'Welcome to Hello 组件'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
    h1{
      padding-top:(50rem/40);
      text-align: center;
      img{
        width:(276rem/40);
      }
    }
    .text{
      width:(674rem/40);
      margin:(50rem/40) auto (66rem/40);
      font-size: (28rem/40);
      line-height: (43rem/40);
      span{
        font-weight: 700;
      }
    }
    a{
      text-decoration:none; 
    }
</style>
