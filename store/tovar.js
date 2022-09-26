
//const sleep = m => new Promise(r => setTimeout(r, m))
export const state = () =>({
    productItem: [],
})

export const mutations = {
    setProductItem (state,productItem) {
        state.productItem = productItem
    },
}

export const actions = {
    /*
     *  записывает в store
     */
    async getProductItem ({ commit},id) {
        // await sleep(50)
       // let product = await this.$axios.$get(`api/get/product?kirilica=${id}`); 
        let product = await this.$axios.$get(`api/get/product?kirilica=${id}`); 
        commit('setProductItem', product)
        return product
    }
}

export const getters = {
    productItem: state => state.productItem,
    
}

export default {
    state,
    mutations,
    actions,
    getters,
  }