//导入模块
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'
//挂载插件
Vue.use(Vuex)
//新建实例
const store = new Vuex.Store({
  modules: {
    'm_cart': moduleCart,
    'm_user': moduleUser
  }
})
//导出store
export default store