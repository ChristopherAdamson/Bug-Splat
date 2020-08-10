import { api } from "./AxiosService"
import router from '../router/index'




export default {
  state: {

  },
  mutations: {

  },
  actions: {
    async getNotes({ commit, dispatch }, bugId) {
      let res = await api.get("bugs/" + bugId + "/notes")
      console.log(res.data);
      let data = {
        bugId: bugId,
        notes: res.data
      }
      commit("setNotes", data)
    },


    async addNote({ commit, dispatch }, payload) {
      let res = await api.post("notes", payload)
      console.log(res.data);
      dispatch("getNotes", res.data.bugId)
    },

    async deleteNote({ commit, dispatch }, payload) {
      let res = await api.delete("bugs/" + payload.bugId + "/notes/" + payload.noteId)
      dispatch("getNotes", payload.bugId)
    },

    async editNote({ commit, dispatch }, payload) {
      let res = await api.put("bugs/" + payload.bugId + "/notes/" + payload.noteId, payload.body)
      dispatch("getNotes", payload.butId)
    }



  }




}


