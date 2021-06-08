<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommond-view :recommends="recommends"></recommond-view>
    <!-- <h2>{{ results }}</h2> -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./ChildComps/HomeSwiper";
import RecommondView from "./ChildComps/RecommendView";

import { getHomeMultidata } from "network/home";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommondView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    //请求多个数据
    getHomeMultidata().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>
<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>