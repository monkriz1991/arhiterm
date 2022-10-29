
//const sleep = m => new Promise(r => setTimeout(r, m))


export const state = ()=>({
    sliderItems:[],
    basket:[],
    allBaskets:[],
    countAllBaskets:0,
    indexItem:[],
    userItem:[],
    activeButCatMenyItem:false,
    top:[],
    loadingItem:true,
    worktime:[],
    SuccessBaskets:[],
    phones:[],
})

export const mutations = {
    setPhones(state,phones){
        state.phones = phones
    },
    setSuccessBaskets(state,SuccessBaskets){
        state.SuccessBaskets = SuccessBaskets
    },
    setSlider(state,sliderItems){
        state.sliderItems = sliderItems
    },
    setIndex(state,indexItem){
        state.indexItem = indexItem
    },
    setAllBaskets(state,indexItem){
        state.allBaskets = indexItem
    },
    setTop(state,top){
        state.top = top
    },
    setUser(state,userItem){
        state.userItem = userItem
    },
    setCountBasket(state,data){
        state.countAllBaskets = data;
    },
    setactiveButCatMeny(state,data){
        state.activeButCatMenyItem = data;
    },
    setLoadingItem(state,data){
        state.loadingItem = data;
    },
    setWorktime(state,data){
        state.worktime = data;
    },
    
}

export const actions = {
    async getPhones({commit}){
        let phones = await this.$axios.$get(`/users/phones/?limit=9999`);
        commit('setPhones',phones.results)
        return phones.results
    },
    async getSlider({commit}){
        let slide = await this.$axios.$get(`/administrate/get/slider/`);
        commit('setSlider',slide.results)
        return slide.results
    },
    async getWorktime({commit}){
        let worktime = await this.$axios.$get(`/administrate/get/worktime/`);
        commit('setWorktime',worktime.results)
        return worktime.results
    },
    ADD_TO_CART({commit},product){
        commit('SET_CART',product)
    },
    ADD_TO_SUC_BASKET({commit},basket){
        commit('setSuccessBaskets',basket.data.message)
    },
    async getTop({commit}){
        let results = await this.$axios.$get(`/catalog/product/?is_sale=true&limit=25&ordering=position`);
        commit('setTop',results.results)
        return results.results
    },
    async getIndex({commit}){
        let results = await this.$axios.$get(`/admin/pages/pages/1/`);
        commit('setIndex',results)
        return results
    },
  /**
   * получает корзины пользователя с Бэка
   * @param commit
   * @param filter - object like at {limit:<int>,offset:<int>}
   * @returns {Promise<any>}
   */
    async getallBaskets({commit},filter){
        if(filter===undefined){
          filter = {}
          filter.offset = 0;
          filter.limit = 2;
        }
        let results = await this.$axios.$get(`/cart/cartUser/?offset=${filter.offset}&limit=${filter.limit}`);
        commit('setAllBaskets',results.results)
        commit('setCountBasket',results.count)
        return results
    },
    addUserList({ commit},results) {
        commit('setUser', results)
        return results
    },
    newSateButCatMeny({ commit},results) {
        commit('setactiveButCatMeny', results)
        return results
    },
    newLoadingItem({ commit},results) {
        commit('setLoadingItem', results)
        return results
    }
}

export const getters = {
    phones: state => state.phones,
    sliderItems: state => state.sliderItems,
    indexItem: state => state.indexItem,
    userItem: state => state.userItem,
    allBaskets: state => state.allBaskets,
    countAllBaskets: state => state.countAllBaskets,
    activeButCatMenyItem: state => state.activeButCatMenyItem,
    loadingItem: state => state.loadingItem,
    top: state => state.top,
    worktime: state => state.worktime,
    SuccessBaskets: state => state.SuccessBaskets,
}


export default {
    state,
    mutations,
    actions,
    getters,
  }

