<template>
  <van-tabbar
    v-model="active"
    active-color="#4866a9"
    inactive-color="#adcfe4" 
    @change="onChange"
    >
        <van-tabbar-item icon="shop-collect">首页</van-tabbar-item>
        <van-tabbar-item icon="gift-card">心愿</van-tabbar-item>
        <van-tabbar-item icon="label">清单</van-tabbar-item>
        <van-tabbar-item icon="friends">我的</van-tabbar-item>
    </van-tabbar>

</template>

<script>
import {Notify} from 'vant'
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      },
      tabUrls:[
          '/',
          '/wish',
          '/my'
      ]
    };
  },
  methods: {
    onChange(index) {
        this.$router.push({
            path:this.tabUrls[index]
        })
    }
  },
};
</script>

<style>
</style>