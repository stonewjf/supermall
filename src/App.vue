<template>
  <div id="app">
    <!-- <h2>hhhhhh</h2> -->

    <main-tab-bar></main-tab-bar>
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>

P172