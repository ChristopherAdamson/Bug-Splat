import { api } from "../store/AxiosService"
import router from '../router/index'




export default {
  state: {

  },
  mutations: {

  },
  actions: {
    async getBugs({ commit, dispatch }) {
      let res = await api.get("bugs")
      console.log(res.data);
      commit("setBugs", res.data)
    },
    async getBugDetails({ commit, dispatch }, id) {
      let res = await api.get("bugs/" + id)
      console.log(res)
      commit("setBugDetails", res.data)
    },

    async addBug({ commit, dispatch }, payload) {
      let res = await api.post("bugs", payload)
      console.log(res.data);
      dispatch("getBugs", res.data)
    },

    async deleteBug({ commit, dispatch }, payload) {
      debugger
      let res = await api.delete("bugs/" + payload.bugId)
      dispatch("getBugs")
    },
    async editBug({ commit, dispatch }, payload) {
      let res = await api.put("bugs/" + payload.bugId, payload.body)
      dispatch("getBugDetails", payload.bugId)
    }







  }


}
