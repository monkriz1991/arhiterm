
//const sleep = m => new Promise(r => setTimeout(r, m))
export const state = ()=>({
    sliderItems:[],
    basket:[],
})

export const mutations = {
    setSlider(state,sliderItems){
        state.sliderItems = sliderItems
    },
    SET_CART(state,product){
        state.basket.push(product)
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
    }
} 

export const getters = {
    sliderItems: state => state.sliderItems,
    basket: state => state.basket,
}


export default {
    state,
    mutations,
    actions,
    getters,
  }

  