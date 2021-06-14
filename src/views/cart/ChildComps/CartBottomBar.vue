<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button
        :isChecked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.count * item.price;
          }, 0)
          .toFixed(2)
      );
    },

    checkLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },

    isSelectAll() {
      if (!this.$store.state.cartList.length) return false;
      return this.checkLength === this.$store.state.cartList.length;
    },
  },
  methods: {
    checkClick() {
      // console.log("-----");
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },

    calcClick() {
      // console.log("sadsasad");
      if (!this.checkLength) {
        this.$toast.show("请选择购买商品");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: fixed;
  bottom: 49px; /* px-to-viewport-ignore */
  left: 0;
  right: 0;
  line-height: 40px;
  height: 40px;
  background-color: #ccc;
}
.check-all {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 10px;
  margin-right: 20px;
  text-align: center;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;
}
.total {
  flex: 1;
  text-align: right;
  margin-right: 20px;
}
.calculate {
  width: 80px;
  height: 100%;
  background: red;
  text-align: center;
  color: aliceblue;
}
</style>

p221