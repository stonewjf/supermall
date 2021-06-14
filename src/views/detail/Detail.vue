<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
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
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"> </back-top>
    <toast :message="message" :show="show"></toast>
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
import DetailBottomBar from "./ChildComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast";

import GoodsList from "components/content/goods/GoodsList";

import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

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
    DetailBottomBar,
    GoodsList,
    Toast,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      currentIndex: 0,
      message: "",
      show: false,
    };
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  created() {
    this.iid = this.$route.params.iid;

    // 1.根据iid请求数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
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
    ...mapActions(["addCart"]),

    imageLoad() {
      this.$refs.scroll.refresh();

      // 获取offsetTop值，用来点击title跳转指定位置
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
      // this.newRefresh();
    },

    // 获取滚动位置
    contentScroll(position) {
      // console.log(position);

      // 回到顶部
      this.isShowBackTop = position.y < -1000;

      // 根据滚动距离显示title
      const positionY = -position.y;
      for (let i = this.themeTopYs.length - 1; i >= 0; i--) {
        if (positionY >= this.themeTopYs[i]) {
          this.currentIndex = i;
          break;
        }
      }
      this.$refs.nav.currentIndex = this.currentIndex;
    },

    // 点击title跳转指定位置
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },

    // 将商品添加到购物车
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 利用回调函数显示添加成功信息Promise
      this.addCart(product).then((res) => {
        // console.log(res);

        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        // }, 1500);

        this.$toast.show(res);
      });
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
  /* 减号两边加空格 */
  height: calc(100% - 44px - 58px);
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