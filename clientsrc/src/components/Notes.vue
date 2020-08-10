<template>
  <div :class="counterData % 2 ? '' : 'bg-shift' ">
    <div class="notes align-items-center row mx-2 my-2">
      <div class="col-4">
        <h5>{{noteData.creatorEmail}}</h5>
      </div>
      <div class="col-7 text-jusitfy max-h overflow-auto">
        <h5>{{noteData.content}}</h5>
      </div>

      <div class="col-1">
        <button class="btn btn-info btn-sm float-right">
          <i class="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "notes",
  data() {
    return {};
  },
  mounted() {},
  props: ["noteData", "counterData"],
  computed: {},
  methods: {},
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
.max-h {
  height: 50px;
  max-height: 50px;
}
</style>