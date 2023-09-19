export default {
  //开启模块命名空间
  namespaced: true,
  //模块的state数据
  state: () => ({
    //购物车数组 {goods_id goods_name goods_price goods_count goods_small_logo goods_state}
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  //模块mutations方法 用于修改stae里的参数
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      // console.log(findResult)

      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }

      this.commit('m_cart/saveToStorage')
      // console.log(state.cart)
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }

    },
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')

    },
    //更新勾选状态
    updateAllGoodsState(state,newState){
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
  },

  //模块getters属性
  getters: {
    //商品总数
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    //勾选数
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    checkedGoodsAmount(state){
      return state.cart.filter(x => x.goods_state).reduce((total,item)=> total += item.goods_count * item.goods_price, 0).toFixed(2)
    }
  }
}