
//const sleep = m => new Promise(r => setTimeout(r, m))
export const state = () =>({
    productList: [],
})

export const mutations = {
    setProductList (state,productList) {
        state.productList = productList
    },
}

export const actions = {
    /*
     *  записывает в store категории
     */
    async getProductList ({ commit},id) {
        // await sleep(50)
        let product = await this.$axios.$get(`/catalog/product/?cat=${id}`);  
        commit('setProductList', product.results)
        return product.results
    }
}

export const getters = {
    productList: state => state.productList,
    
}

export default {
    state,
    mutations,
    actions,
    getters,
  }