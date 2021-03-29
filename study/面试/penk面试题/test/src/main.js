// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueDND from 'awe-dnd'

Vue.config.productionTip = false
// 解决跨域问题, 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false
axios.defaults.baseURL = '/api'
axios.defaults.headers.post["Content-type"]="application/json";
// 默认baseURL
// 解决IE下会有ajax请求缓存问题
axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  'If-Modified-Since': '0',
  'authorization': 'eyJJRCI6ImFiMzFaQnBzRU81QnF2dksweERjTDR6YnM4YzJxRWllRjVwa3ZuUmVOQ1hHZVZFIiwidG9rZW4iOiIzZjk1ekVJa2daa2Jydl96QnV0SGJwWWNoRkNyUlF1ODdoT000allkUTVaZWxYcyJ9'
}
Vue.prototype.$ajax = axios
Vue.use(Element)
Vue.use(VueDND)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
