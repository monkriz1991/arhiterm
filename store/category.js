
//const sleep = m => new Promise(r => setTimeout(r, m))
export const state = () =>({
    categoryNavbar: [],
    categoryNested: [],
    categoryNestedFactory: [],
    categoryManuf: [],
    categoryIndex: [],
    manufacturer:[],
    manufacturerIndex:[],
})

export const mutations = {
    setCategory (state,categoryNavbar) {
        state.categoryNavbar = categoryNavbar
    },
    setCategoryNested (state,categoryNested) {
        state.categoryNested = categoryNested
    },
    setCategoryNestedFactory (state,categoryNestedFactory) {
        state.categoryNestedFactory = categoryNestedFactory
    },
    setCategoryManuf(state,categoryManuf){
        state.categoryManuf = categoryManuf
    },
    setCategoryIndex (state,categoryIndex) {
        state.categoryIndex = categoryIndex
    },
    setManufacturer(state,manufacturer) {
        state.manufacturer = manufacturer
    },
    setManufacturerIndex(state,manufacturerIndex) {
        state.manufacturerIndex = manufacturerIndex
    }
}

export const actions = {
    /*
     *  записывает в store категории
     */
    async getCategory ({ commit }) {
        // await sleep(50)
        let category = await this.$axios.$get(`/catalog/categories/`);
        commit('setCategory', category.results)
        return category.results
    },
  async getCategory1NestedFactory ({ commit},id) {
        // await sleep(50)
        let category = await this.$axios.$get(`/catalog/categories/?manuf=${id}&limit=99999`);
        commit('setCategoryNestedFactory', category.results)
        return category.results
    },
    async getCategoryNested ({ commit},id) {
        // await sleep(50)
        let category = await this.$axios.$get(`/catalog/categories/${id}/`);

        commit('setCategoryNested', category)
        return category
    },

    async getCategoryManuf({ commit},id) {
        // await sleep(50)
        let manufacturer = await this.$axios.$get(`/manufacturer/get/?cats=${id}&limit=99999`);
        commit('setCategoryManuf', manufacturer)
        console.log(manufacturer)
        return manufacturer
    },
    async getCategoryIndex ({ commit}) {
        // await sleep(50)
        let category = await this.$axios.$get(`/catalog/categories/?limit=4`);
        commit('setCategoryIndex', category.results)
        return category.results
    },
    async getManufacturer({ commit}) {
        // await sleep(50)
        let result = await this.$axios.$get(`/manufacturer/get/?limit=99999`);
        commit('setManufacturer', result)
        return result
    },
    async getManufacturerIndex({ commit}) {
        // await sleep(50)
        let result = await this.$axios.$get(`/manufacturer/random/get/`);
        commit('setManufacturerIndex', result)
        return result
    }
}

export const getters = {
    categoryNavbar: state => state.categoryNavbar,
    categoryNested: state => state.categoryNested,
    categoryNestedFactory: state => state.categoryNestedFactory,
    categoryManuf: state => state.categoryManuf,
    categoryIndex: state => state.categoryIndex,
    manufacturer: state => state.manufacturer,
    manufacturerIndex: state => state.manufacturerIndex


}

export default {
    state,
    mutations,
    actions,
    getters,
  }
