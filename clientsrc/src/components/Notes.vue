<template>
  <div :class="noteIndex % 2 ? '' : 'bg-shift' ">
    <div class="notes align-items-center row mx-2 my-2">
      <div class="col-4">
        <h5>{{noteData.creatorEmail}}</h5>
      </div>
      <div class="col-7 text-jusitfy max-h overflow-auto">
        <h5>{{noteData.content}}</h5>
      </div>

      <div class="col-1">
        <button
          :disabled="reportStatus ? true : false "
          v-if="profile.email == noteData.creatorEmail"
          @click="deleteNote"
          class="btn btn-info btn-sm float-right"
        >
          <i class="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import ns from "../services/NotificationService";

export default {
  name: "notes",
  data() {
    return {};
  },
  mounted() {},
  props: ["noteData", "noteIndex", "reportStatus"],
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    async deleteNote() {
      let payload = {
        bugId: this.noteData.bugId,
        noteId: this.noteData._id,
      };
      if (await ns.confirmAction("Are you sure?")) {
        this.$store.dispatch("deleteNote", payload);
      }
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
.max-h {
  height: 50px;
  max-height: 50px;
}
</style>