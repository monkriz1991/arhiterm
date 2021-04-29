
//const sleep = m => new Promise(r => setTimeout(r, m))
export const state = () =>({
    categoryNavbar: [],
    categoryNested: [],
})

export const mutations = {
    setCategory (state,categoryNavbar) {
        state.categoryNavbar = categoryNavbar
    },
    setCategoryNested (state,categoryNested) {
        state.categoryNested = categoryNested
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
    async getCategoryNested ({ commit},id) {
        // await sleep(50)
        let category = await this.$axios.$get(`/catalog/categories/${id}/`);   
        commit('setCategoryNested', category.child)
        return category.child
    }
}

export const getters = {
    categoryNavbar: state => state.categoryNavbar,
    categoryNested: state => state.categoryNested 
    
}

export default {
    state,
    mutations,
    actions,
    getters,
  }