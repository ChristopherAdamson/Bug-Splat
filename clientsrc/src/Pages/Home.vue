<template>
  <div class="home row justify-space-around bg-danger pt-3">
    <div class="col-3">
      <h5>Title</h5>
    </div>
    <div class="col-3">
      <h5>Reported By</h5>
    </div>
    <div class="col-3">
      <!-- make status toggle closed and open top to bottom -->
      <h5 v-if="noToggle">
        Status
        <i class="fa fa-arrow-right"></i>
      </h5>
    </div>
    <div class="col-3">
      <h5>lastModified</h5>
    </div>
    <div class="overflow-auto f-height">
      <!-- add bug component here -->
    </div>
  </div>
</template>

<script>
import bug from "../components/bug";
export default {
  name: "home",
  data() {
    return {
      noToggle: true,
      sortToggle: false,
    };
  },
  computed: {},
  methods: {},
  components: {
    bug,
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
  height: 80vh;
  max-height: 80vh;
}
</style>
