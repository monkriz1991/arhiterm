
//const sleep = m => new Promise(r => setTimeout(r, m))

export const state = ()=>({
    sliderItems:[],
    basket:[],
    allBaskets:[],
    countAllBaskets:0,
    indexItem:[],
    userItem:[],
    basket_cost:{},
    activeButCatMenyItem:false,
    top:[],
    loadingItem:true,
    worktime:[],
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
    setAllBaskets(state,indexItem){
        state.allBaskets = indexItem
    },
    setTop(state,top){
        state.top = top
    },
    REMOVE_FROM_CART(state,idx){
        state.basket.splice(idx,1)
    },
    REMOVE_FROM_CART_ALL(state,idx){
        state.basket = []
    },
    REMOVE_FROM_COST_ALL(state,idx){
        state.basket_cost = {}
    },
    UPDATE_FROM_CART(state,data){
        state.basket.map(function(item){
            if(item.id==data.id){
                if(item.product[0].id==data.id_cart){
                    item.product[0].cost = data.cost
                    item.product[0].count_el = data.count_el
                }
            }
        }) 
    },
    BASKET_COST(state,data){
        state.basket_cost = data
       // console.log(state.basket_cost)

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
    DELL_CART_BASKET({commit},idx){
        commit('REMOVE_FROM_CART',idx)
    },
    DELL_CART_BASKET_ALL({commit}){
        commit('REMOVE_FROM_CART_ALL')
    },
    DELL_CART_BASKET_COST({commit}){
        commit('REMOVE_FROM_COST_ALL')
    },
    UPDATE_CART_BASKET({commit},data){
        commit('UPDATE_FROM_CART',data)
    },
    BASKET_FROM_COST({commit},data){
        commit('BASKET_COST',data)
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
    sliderItems: state => state.sliderItems,
    basket: state => state.basket,
    basket_cost: state => state.basket_cost,
    indexItem: state => state.indexItem,
    userItem: state => state.userItem,
    allBaskets: state => state.allBaskets,
    countAllBaskets: state => state.countAllBaskets,
    activeButCatMenyItem: state => state.activeButCatMenyItem,
    loadingItem: state => state.loadingItem,
    top: state => state.top,
    worktime: state => state.worktime,
}


export default {
    state,
    mutations,
    actions,
    getters,
  }

