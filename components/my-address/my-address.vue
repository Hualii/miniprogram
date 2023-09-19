<template>
  <view>
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">
            收货人:{{address.userName}}
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话:{{address.telNumber}}
          </view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址:
        </view>
        <view class="row2-right">
          {{addstr}}
        </view>
      </view>
    </view>

    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
        // address: {},
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        console.log(succ)
        if (err == null && succ.errMsg === 'chooseAddress:ok') {
          this.updateAddress(succ)
        }
        // if (err && err.errMsg === 'conoseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response') {
        //   this.reAuth()
        // }
      }
      // async reAturh() {
      //   const [err2, confirmResult] = await uni.showModal({
      //     content: '设置地址权限？',
      //     confirmText: '确认',
      //     cancelText: '取消'
      //   })
      //   if (err2) return
      //   if (confirmResult.cancel) return uni.$showMsg('取消授权')
      //   if (confirmResult.confirm) return uni.openSetting({
      //     success:(settingResult) =>{
      //       if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功!')
      //       if(!settingResult.authSetting['scope.address']) return uni.$showMsg('授权失败!')
      //     }
      //   })
      // }
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
    }
  }
</script>

<style lang="scss">
  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }

  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    .row1 {
      display: flex;
      justify-content: space-between;
      padding-left: 5px;

      .row1-left {
        .username {}
      }

      .row1-right {
        display: flex;
        justify-content: space-between;

        .phone {}
      }
    }

    .row2 {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding: 0 5px;

      .row2-left {
        white-space: nowrap;
      }

      .row2-right {
        padding-left: 5px;
        justify-content: center;
      }
    }
  }
</style>