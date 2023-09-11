// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入网络请求
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
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
  ...App
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