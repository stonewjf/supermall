<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommond-view :recommends="recommends"></recommond-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- .native - 监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"> </back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./ChildComps/HomeSwiper";
import RecommondView from "./ChildComps/RecommendView";
import FeatureView from "./ChildComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommondView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh);
    // this.$bus.$on("itemImageLoad", () => {
    //   // this.$refs.scroll.refresh();
    //   refresh();
    // });
    // 获取tabControl的offsetTop
    // 所有的组件都有一个$el属性,用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    // console.log(this.tabOffsetTop);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关方法
     **/
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log("+++++");
      console.log(this.tabOffsetTop);
    },

    // 监听滚动
    contentScroll(position) {
      // console.log(position);

      // 判断显示backtop按钮
      this.isShowBackTop = position.y < -1000;

      //判断tabCtrol吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      // console.log("到底了");
      this.getHomeGoods(this.currentType);
    },

    /*网络请求相关方法*/
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style  scoped>
#home {
  /* padding-top:44px; */
  height: 100vh;
  /* height: 600px; */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 9;
  top: -2px;
  background-color: #fff;
  /* margin:-2px; */
}
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>