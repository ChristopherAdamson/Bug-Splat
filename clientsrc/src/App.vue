<template>
  <div id="app">
    <navbar />
    <div class="bg-img">
      <div class="container">
        <router-view />
      </div>
    </div>
    <footer
      class="fixed-bottom bg-dark text-white text-center p-2"
    >Created with Love by Christopher Adamson</footer>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    }
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";
.bg-img {
  background-image: url("https://cleanroomnews.wpengine.com/wp-content/uploads/2017/04/bugs-960x696.jpg");
  background-attachment: fixed;
  height: 100vh;
}
</style>
