// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入了app这个局部组件
import Vue from 'vue'
import TodoList from './TodoList'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //用components 引入了一个App的局部组件(左)，名字叫App(右)
  //components:{App = App}
  components: { TodoList },
  template: '<TodoList/>'
})
