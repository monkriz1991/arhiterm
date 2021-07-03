
//const sleep = m => new Promise(r => setTimeout(r, m))

export const state = ()=>({
    sliderItems:[],
    basket:[],
    allBaskets:[],
    countAllBaskets:0,
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
    setAllBaskets(state,indexItem){
        state.allBaskets = indexItem
    },
    REMOVE_FROM_CART(state,idx){
        state.basket.splice(idx,1)
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
    setUser(state,userItem){
        state.userItem = userItem
    },
  setCountBasket(state,data){
    state.countAllBaskets = data;
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
    console.log(results)
        commit('setAllBaskets',results.results)
        commit('setCountBasket',results.count)
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
    userItem: state => state.userItem,
    allBaskets: state => state.allBaskets,
    countAllBaskets: state => state.countAllBaskets
}


export default {
    state,
    mutations,
    actions,
    getters,
  }

