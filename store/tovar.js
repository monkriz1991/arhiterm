
//const sleep = m => new Promise(r => setTimeout(r, m))
export const state = () =>({
    productItem: [],
    stufProduct:[],

})

export const mutations = {
    setProductItem (state,productItem) {
        state.productItem = productItem
    },
    setstufProduct (state,stufProduct) {
        state.stufProduct = stufProduct
    },
    setstufProductNull(state,stufProduct) {
        state.stufProduct = []
    },
}

export const actions = {
    async getProductItem ({ commit},id) {
        // await sleep(50)
        let stuf = []
        commit('setstufProductNull')
        let product = await this.$axios.$get(`api/get/product?kirilica=${id}`); 
        commit('setProductItem', product)
        if(product.popularly.length){
            for(let i in product.popularly){
                let productstuf = await this.$axios.$get(`catalog/product/${product.popularly[i]}/`);
                stuf.push(productstuf);
            }
            commit('setstufProduct',stuf)
        }
        return product
    }
}

export const getters = {
    productItem: state => state.productItem,
    stufProduct: state => state.stufProduct,
    
}

export default {
    state,
    mutations,
    actions,
    getters,
  }