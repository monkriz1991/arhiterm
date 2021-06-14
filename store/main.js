
//const sleep = m => new Promise(r => setTimeout(r, m))

export const state = ()=>({
    sliderItems:[],
    basket:[],
    indexItem:[],
    userItem:[]
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
    },
    UPDATE_FROM_CART(state,data){
        state.basket.map(function(item){
            if(item.id==data.id){
                item.cost = data.cost
                item.count_el = data.count_el
            } 
        })
    },
    setUser(state,userItem){
        state.userItem = userItem
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
    },
    UPDATE_CART_BASKET({commit},data){
        commit('UPDATE_FROM_CART',data)
    },
    addUserList({ commit},results) {
        commit('setUser', results)
        return results
    }
} 

export const getters = {
    sliderItems: state => state.sliderItems,
    basket: state => state.basket,
    indexItem: state => state.indexItem,
    userItem: state => state.userItem
}


export default {
    state,
    mutations,
    actions,
    getters,
  }

  