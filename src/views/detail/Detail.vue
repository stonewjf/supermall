<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComps/DetailNavBar.vue";
import DetailSwiper from "./ChildComps/DetailSwiper.vue";
import DetailBaseInfo from "./ChildComps/DetailBaseInfo.vue";

import { getDetail, Goods } from "network/detail.js";

export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    // 根据iid请求数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 顶部图片轮播图
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
    });
  },
};
</script>

<style>
</style>