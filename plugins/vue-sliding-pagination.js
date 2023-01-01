import Vue from 'vue'
import SlidingPagination from 'vue-sliding-pagination'

if (process.browser) {
Vue.use(SlidingPagination);
}