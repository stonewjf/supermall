<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
    ></detail-nav-bar>

    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComps/DetailNavBar.vue";
import DetailSwiper from "./ChildComps/DetailSwiper.vue";
import DetailBaseInfo from "./ChildComps/DetailBaseInfo.vue";
import DetailShopInfo from "./ChildComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./ChildComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./ChildComps/DetailParamInfo.vue";
import DetailCommentInfo from "./ChildComps/DetailCommentInfo.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { itemListenerMixin } from "common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

export default {
  //不加name，exclude没作用
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0, 1000, 2000, 3000],
    };
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  created() {
    this.iid = this.$route.params.iid;

    // 1.根据iid请求数据
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

      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 获取商品的详情信息
      this.detailInfo = data.detailInfo;

      // 获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();

      // 点击title跳转指定位置
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
      // this.newRefresh();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.content {
  /* position: absolute; */
  height: calc(100% - 44px);
  /* height: 100%; */
  /* overflow: hidden; */
  /* position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden; */
}
</style>