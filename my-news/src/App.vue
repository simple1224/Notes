<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<HelloWorld/>-->
      <nav>
          <div class="logo"><a href="">小不点姑娘</a></div>
          <ul>
              <li><a href="" class="active">首页</a></li>
              <li><a href="">新闻列表</a></li>
              <li><a href="">我的页面</a></li>
          </ul>
      </nav>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
    *{
        padding:0;
        margin: 0;
    }
    nav{
        /*background: #FFCCCC;*/
        height: 50px;
    }
    nav ul{
        list-style: none;
        float: right;
    }
    nav ul li,nav .logo{
        display: inline-block;
        line-height: 50px;
        margin-right: 20px;
    }
    nav ul li a{
        line-height: 50px;
        font-size: 13px;
        text-decoration: none;
        display: inline-block;
        height: inherit;  /*inherit 继承它的父元素的max-width*/
        color: #fff;
    }
    nav ul li.logo{
        float: left;
        margin-left: 20px;
    }

</style>
