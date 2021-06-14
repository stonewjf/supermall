<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>

    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartBottomBar from "./ChildComps/CartBottomBar";
import CartList from "./ChildComps/CartList";

import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 快捷使用store.getters里的方法
    ...mapGetters(["cartLength"]),
    // ...mapGetters({
    //   length:'cartLength'
    // })
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>