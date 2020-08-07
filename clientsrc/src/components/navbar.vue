<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img
      class="img-size"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT_S0Jq5u1lhZYJHklKXKqc8SU4rB29-7hRDg&usqp=CAU"
      alt
    />
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="Vue logo" src="../assets/logo.png" style="transform: rotate(-90deg);width: 25px;" />
        <img
          alt="Vue logo"
          src="../assets/logo.png"
          style="transform: rotate(-90deg);width: 25px;margin-top: -10px;"
        />
      </div>
      <div class="mt-2">
        <h3 style="color: green">ug-Splat</h3>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link" :to="{ name: 'Profile' }">Profile</router-link>
        </li>
      </ul>
      <button
        data-toggle="modal"
        data-target="#one"
        class="btn btn-outline-secondary mr-5"
      >Report a Bug</button>
      <span class="navbar-text ml-5">
        <button class="btn btn-success" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
    <QuickModal id="one" :key="one">
      <form slot="body" @submit="reportBug">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="What is your Bug" />
        </div>
      </form>
    </QuickModal>
  </nav>
</template>

<script>
import QuickModal from "../components/QuickModals";
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      if (this.$auth.isAuthenticated) {
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
      }
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    },
    reportBug() {},
  },
  components: {
    QuickModal,
  },
};
</script>

<style>
.img-size {
  max-height: 50px;
  max-width: 50px;
}
</style>
