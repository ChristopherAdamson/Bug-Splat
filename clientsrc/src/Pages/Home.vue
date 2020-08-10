<template>
  <div class="home bg-danger rounded pt-3">
    <div class="row mx-2 p-3 justify-space-around border border-dark">
      <div class="col-3">
        <h4>Title</h4>
      </div>
      <div class="col-3">
        <h4>Reported By</h4>
      </div>
      <div class="col-3">
        <!-- make status toggle closed and open top to bottom -->
        <h4 v-if="noToggle">
          Status
          <i @click="direction == 'up'" class="fa fa-arrow-right"></i>
        </h4>
      </div>
      <div class="col-3">
        <h4>lastModified</h4>
      </div>
    </div>
    <div class="overflow-auto f-height">
      <bugComponent v-for="bug in bugs" :bugData="bug" :key="bug._id" />
    </div>
  </div>
</template>

<script>
import bugComponent from "../components/bug";
export default {
  name: "home",
  data() {
    return {
      noToggle: true,
      sortToggle: false,
      direction: "",
    };
  },
  mounted() {
    this.$store.dispatch("getBugs");
  },
  computed: {
    bugs() {
      let sortedBugs = [...this.$store.state.bugs];
      if (this.direction == "up") {
        sortedBugs.sort((a, b) => {
          return a.closed === b.closed ? 0 : a ? -1 : 1;
        });
      } else if (this.direction == "down") {
        sortedBugs.sort((a, b) => {
          return a.closed === b.closed ? 0 : a ? 1 : -1;
        });
      } else {
        return this.$store.state.bugs;
      }
    },
  },
  methods: {},
  components: {
    bugComponent,
  },
};
</script>
<style lang="scss">
.bg-img {
  background-image: url("https://cleanroomnews.wpengine.com/wp-content/uploads/2017/04/bugs-960x696.jpg");
  background-attachment: fixed;
  height: 90vh;
}
.f-height {
  height: 40rem;
  max-height: 40rem;
  width: auto;
}
</style>
