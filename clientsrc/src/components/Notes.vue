<template>
  <div :class="bugsIndex % 2 ? '' : 'bg-shift' ">
    <div class="notes row mx-2 my-2">
      <div class="col-3">
       
      </div>
      <div class="col-3">
      
      <div class="col-3">
      
      </div>
      <div class="col-3">
       
    </div>
  </div>
</template>


<script>
export default {
  name: "notes",
  data() {
    return {
      newDate: [],
    };
  },
  mounted() {
   
  },
  props: ["bugData"],
  computed: {
    
    
  },
  methods: {
   
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