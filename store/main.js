
//const sleep = m => new Promise(r => setTimeout(r, m))
export const state = ()=>({
    sliderItems:[],
})

export const mutations = {
    setSlider(state,sliderItems){
        state.sliderItems = sliderItems
    }
}

export const actions = {
    async getSlider({commit}){      
        let slide = await this.$axios.$get(`/administrate/get/slider/`);
        commit('setSlider',slide.results)
        return slide.results
    }
} 

export const getters = {
    sliderItems: state => state.sliderItems
}


export default {
    state,
    mutations,
    actions,
    getters,
  }

  