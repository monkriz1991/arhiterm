
//const sleep = m => new Promise(r => setTimeout(r, m))
export const state = ()=>({
    sliderItems:[],
    basket:[],
    indexItem:[]
})

export const mutations = {
    setSlider(state,sliderItems){
        state.sliderItems = sliderItems
    },
    SET_CART(state,product){
        state.basket.push(product)
    },
    setIndex(state,indexItem){
        state.indexItem = indexItem
    },
    REMOVE_FROM_CART(state,idx){
        state.basket.splice(idx,1)
    }
}

export const actions = {
    async getSlider({commit}){      
        let slide = await this.$axios.$get(`/administrate/get/slider/`);
        commit('setSlider',slide.results)
        return slide.results
    },
    ADD_TO_CART({commit},product){
        commit('SET_CART',product)
    },
    async getIndex({commit}){      
        let results = await this.$axios.$get(`/admin/pages/pages/1/`);
        commit('setIndex',results)
        return results
    },
    DELL_CART_BASKET({commit},idx){
        commit('REMOVE_FROM_CART',idx)
    }
} 

export const getters = {
    sliderItems: state => state.sliderItems,
    basket: state => state.basket,
    indexItem: state => state.indexItem,
}


export default {
    state,
    mutations,
    actions,
    getters,
  }

  