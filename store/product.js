
//const sleep = m => new Promise(r => setTimeout(r, m))

export const state = () =>({
    productList: [],
    countProduct:0,
    productLimit:10,
    productLoading:false,
})

export const mutations = {
    setProductList (state,productList) {
        state.productList = productList
    },
    setCountProduct(state,count){
        state.countProduct = count;
    },
    setProductLimit(state,limit){  /// заложили что можно будет менять лимит на странице
          state.productLimit = limit;
    },
    setProductLoading(state,status){ /// индикация загрузки
        state.productLoading = status;
    }
}

export const actions = {
    /*
     *  записывает в store категории
     */
    async getProductList ({ commit,state}, args) {
        commit('setProductLoading',true)
        let id = args['cat']
        if(args['page']===undefined){
            args['page'] = 1;
        }
        let uri = "";
        for(let i in args){
            if(i == 'card_filter'|| i == 'manuf'){
                uri+=`&${i}=${args[i]}`
            } 
        }

        let offset = (args['page']-1)*state.productLimit;
        
        let product = await this.$axios.$get(`/catalog/product/?ordering=position&cat=${id}&limit=${state.productLimit}&offset=${offset}${uri}`);
        commit('setProductList', product.results)
        commit('setCountProduct', product.count) // получаем общее количество товаров в категории
        commit('setProductLoading',false)
        return product.results
    },
  async getProductListManufacturer ({ commit,state}, args) {
        commit('setProductLoading',true)
        let id = args['manuf']
    delete args['manuf'];
        if(args['page']===undefined){
            args['page'] = 1;
        }
        let uri = "";
        for(let i in args){
          uri+=`&${i}=${args[i]}`
        }
        let offset = (args['page']-1)*state.productLimit;
        let product = await this.$axios.$get(`/catalog/product/?ordering=position&manuf=[${id}]&limit=${state.productLimit}&offset=${offset}${uri}`).catch(function (e){
          });
         commit('setProductList', product.results)
         commit('setCountProduct', product.count) // получаем общее количество товаров в категории
         commit('setProductLoading',false)
         return product.results
    },
}

export const getters = {
    productList: state => state.productList,
    countProduct: state => state.countProduct,
    productLimit: state => state.productLimit,
    productLoading: state => state.productLoading,

}

export default {
    state,
    mutations,
    actions,
    getters,
  }
