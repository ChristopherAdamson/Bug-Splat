import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"
import bugModule from "../store/BugModule"
import noteModule from "../store/NoteModule"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setBugDetails(state, bugData) {
      state.activeBug = bugData
    },
    setNotes(state, data) {
      Vue.set(state.notes, data.bugId, data.notes)

    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  modules: {
    bugModule,
    noteModule
  }
});
