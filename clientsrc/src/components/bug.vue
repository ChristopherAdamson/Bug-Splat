<template>
  <div class="bug col-12">
    <div class="col-3">
      <h5>Title</h5>
    </div>
    <div class="col-3">
      <h5>Reported By</h5>
    </div>
    <div class="col-3">
      <!-- make status toggle closed and open top to bottom -->
      <h5 v-if="sortToggle">
        Status
        <i class="fa fa-arrow-up"></i>
      </h5>
    </div>
    <div class="col-3">
      <h5>lastModified</h5>
    </div>
  </div>
</template>


<script>
export default {
  name: "bug",
  data() {
    return {};
  },
  props: ["bugData"],
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>