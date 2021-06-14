export default {
    // 分离的目的是利用，mutations做跟踪
    addCounter(state, payload) {
        payload.count++;
    },
    addToCart(state, payload) {
        payload.checked = true;
        state.cartList.push(payload)
    }
}