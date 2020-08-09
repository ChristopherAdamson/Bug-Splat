import { api } from "./AxiosService"
import router from '../router/index'




export default {
  state: {

  },
  mutations: {

  },
  actions: {
    async getNotes({ commit, dispatch }, payload) {
      let res = await api.get("bugs/" + payload.bugId + "/notes")
      console.log(res.data);
      commit("setNotes", res.data)
    },


    async addNote({ commit, dispatch }, payload) {
      let res = await api.post("notes", payload)
      console.log(res.data);
      dispatch("getNotes", res.data)
    },




  }
}