// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
//导入网络请求包
import {
  $http
} from '@escook/request-miniprogram'
//挂载顶级对象
uni.$http = $http

$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// $http.baseUrl = 'https://applet-base-api-t.itheima.net'

//请求拦截器
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'loading...'
  })
}

//响应拦截器
$http.afterRequest = function(){
  uni.hideLoading()
}

//封裝弹框
uni.$showMsg = function(title = '数据请求失败!', duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
import { func } from 'prop-types'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif