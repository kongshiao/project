<template>
  <div id="app">
    <!-- <hello></hello> -->
    <!-- <div class="nav"> -->
         <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <!-- <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul> -->
    <!-- </div> -->
     <!-- <div class="main"> -->
     <!-- 路由匹配到的组件将渲染在这里 -->
       <router-view></router-view>
     <!-- </div> -->
  </div>
</template>

<script>
// import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    // Hello
  }
}
</script>

<style>
 html,body{
    height:100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
             SimSun, sans-serif;
 }
body{
  font-size: (28rem/40) !important;
  background-color: #fff;
  color: #333;
}

*{
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
</style>
