import { debounce } from "./utils"
// 混入，多个组件使用相同的代码
export const itemListenerMixin = {
    data() {
        return {
            itemListener: null
        }
    },
    mounted() {
        let newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemListener = () => {
            newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemListener)
        console.log('hhhhh');
    }
}