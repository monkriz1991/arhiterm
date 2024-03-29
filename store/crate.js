
//const sleep = m => new Promise(r => setTimeout(r, m))

export const state = ()=>({
    basket:[],
    basket_cost:{},
})

export const mutations = {
    SET_CART(state,product){
        state.basket.push(product)
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
    },
    
}

export const actions = {
    async REPEAT_BASKET({commit},id_basket){
        let results = await this.$axios.$get(`/cart/cartUser/${id_basket}`);
        let cart = results.cart_prodicts
        let count = 0;
        let prod_dop = ''
        for(let i in cart){
            let product = await this.$axios.$get(`catalog/product/${cart[i].card_data.id}/`);
            
            if( product.product[0].id == cart[i].product){
                prod_dop = product.product[0]  
                product.product = []
                product.product.push(prod_dop);

            }

            product.product[0]['cost'] = prod_dop.price;
            product.product[0]['count_el'] = product.multiplicity;
            product.product[0]['multiplicity'] = product.multiplicity;
            commit('SET_CART',product)
        }
    },
    ADD_TO_CART({commit},product){
        commit('SET_CART',product)
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
}

export const getters = {
    basket: state => state.basket,
    basket_cost: state => state.basket_cost,
}


export default {
    state,
    mutations,
    actions,
    getters,
  }

