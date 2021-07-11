
//const sleep = m => new Promise(r => setTimeout(r, m))

export const state = () =>({
    mountertList: [],
    mounter:[],
    MountersCount:0,
})

export const mutations = {
    setMountertList (state,mountertList) {
        state.mountertList = mountertList
    },
    setMounter (state,mounter) {
        state.mounter = mounter
    },
  setMountersCount(statate,count){
      statate.MountersCount = count;
  }
}

export const actions = {
    /*
     *  записывает в store категории
     */
    async getMountertList ({ commit,state},data) {
      let tags = '';
      let page = 1;
      let DataInPage = 10;
      if(data.query!==undefined && data.query.page!==undefined){
          page = data.query.page - 0;
      }
      let offset = (page-1)*DataInPage;
      if(data.query!==undefined && data.query.tags!==undefined && Array.isArray(JSON.parse(data.query.tags))) {
        for(let i of JSON.parse(data.query.tags)){
          tags += `&tags=${i}`;
        }
      }
        let mounters = await this.$axios.$get(`/mounters/mounters/?limit=${DataInPage}&offset=${offset}${tags}`);
      commit('setMountersCount',mounters.count)
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
    mounter: state => state.mounter,
    mountersCount: state => state.MountersCount

}

export default {
    state,
    mutations,
    actions,
    getters,
  }
