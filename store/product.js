
//const sleep = m => new Promise(r => setTimeout(r, m))

export const state = () =>({
    productList: [],
    countProduct:0,
    productLimit:6,
    productLoading:false,
})

export const mutations = {
    setProductList (state,productList) {
        state.productList = productList
    },
    setCountProduct(state,count){
        state.countProduct = count;
    },
    setProductLimit(state,limit){  /// заложили что можно будет менять лимит на странице
          state.productLimit = limit;
    },
    setProduxtLoading(state,status){ /// индикация загрузки
        state.productLoading = status;
    }
}

export const actions = {
    /*
     *  записывает в store категории
     */
    async getProductList ({ commit,state}, args) {
        commit('setProduxtLoading',true)
        let id = args[0]
        if(args[1]===undefined){
            args[1] = 1;
        }
        let offset = (args[1]-1)*state.productLimit;
        let product = await this.$axios.$get(`/catalog/product/?cat=${id}&limit=${state.productLimit}&offset=${offset}`);
        commit('setProductList', product.results)
        commit('setCountProduct', product.count) // получаем общее количество товаров в категории
        commit('setProduxtLoading',false)
        return product.results
    }
}

export const getters = {
    productList: state => state.productList,
    countProduct: state => state.countProduct,
    productLimit: state => state.productLimit,
    productLoading: state => state.productLoading,

}

export default {
    state,
    mutations,
    actions,
    getters,
  }
