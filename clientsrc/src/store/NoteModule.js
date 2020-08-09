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
      let data = {
        bugId: payload.bugId,
        notes: res.data
      }
      commit("setNotes", res.data)
    },


    async addNote({ commit, dispatch }, payload) {
      let res = await api.post("notes", payload)
      console.log(res.data);
      dispatch("getNotes", res.data)
    },

    async deleteNote({ commit, dispatch }, payload) {
      let res = await api.delete("bugs/" + payload.bugId + "/notes/" + payload.noteId)
      dispatch("getNotes")
    },

    async editNote({ commit, dispatch }, payload) {
      let res = await api.put("bugs/" + payload.bugId + "/notes/" + payload.noteId, payload.body)
      dispatch("getNotes")
    }



  }




}


