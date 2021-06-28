
//const sleep = m => new Promise(r => setTimeout(r, m))

export const state = () =>({
    mountertList: [],
    mounter:[],
})

export const mutations = {
    setMountertList (state,mountertList) {
        state.mountertList = mountertList
    },
    setMounter (state,mounter) {
        state.mounter = mounter
    },
}

export const actions = {
    /*
     *  записывает в store категории
     */
    async getMountertList ({ commit,state}) {
        let mounters = await this.$axios.$get(`/mounters/mounters/`);
        commit('setMountertList', mounters.results)
        return mounters.results
    },
    async getMounter ({ commit,state},id) {
        let mounter = await this.$axios.$get(`/mounters/mounters/${id}/`);
        commit('setMounter', mounter)
        return mounter
    },
}

export const getters = {
    mountertList: state => state.mountertList,
    mounter: state => state.mounter

}

export default {
    state,
    mutations,
    actions,
    getters,
  }
