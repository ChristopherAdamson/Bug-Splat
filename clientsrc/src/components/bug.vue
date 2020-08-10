<template>
  <div :class="bugIndex % 2 ? '' : 'bg-shift' ">
    <div class="bug row align-items-center mx-2 my-2">
      <div class="col-3">
        <h5 class="pointer" @click="goToBugDetails">{{bugData.title}}</h5>
      </div>
      <div class="col-3">
        <h5>{{bugData.creatorEmail}}</h5>
      </div>
      <div class="col-3">
        <!-- make status toggle closed and open top to bottom -->
        <h5 class="text-secondary" v-if="!bugData.closed">Open</h5>
        <h5 class="text-success" v-if="bugData.closed">Closed</h5>
      </div>
      <div class="col-3">
        <!-- <button class="btn btn-outline-info float-right">Edit</button> -->
        <h5>{{this.newDate[0]}}</h5>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "bug",
  data() {
    return {
      newDate: [],
    };
  },
  mounted() {
    this.newDate = this.bugData.updatedAt.split("T");
  },
  props: ["bugData", "bugIndex"],
  computed: {},
  methods: {
    goToBugDetails() {
      this.$router.push({ name: "Bug", params: { id: this.bugData._id } });
    },
  },
  components: {},
};
</script>


<style scoped>
.bg-shift {
  background-color: #d9d4f3;
}
.pointer {
  cursor: pointer;
}
</style>