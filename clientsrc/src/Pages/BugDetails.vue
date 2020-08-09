<template>
  <div class="bugDetails container bg-danger rounded pt-3 f-height">
    <div class="row">
      <div class="col-7">
        <h5>Title</h5>
        <h1>{{bug.title}}</h1>
        <h4>Reported By: {{bug.creatorEmail}}</h4>
      </div>
      <div class="col-5 text-right">
        <button @click="deleteBug" class="btn btn-warning mx-1 fixed right">Delete</button>
        <button
          :disabled="bug.closed ? true : false "
          @click="closeReport"
          class="btn btn-secondary mx-1 fixed-right"
        >Close Bug Report</button>
        <h4 class="text-secondary mt-5 mr-2" v-if="!bug.closed">Open</h4>
        <h4 class="text-success mt-5 mr-2" v-if="bug.closed">Closed</h4>
      </div>
    </div>
    <div class="row mt-3 ml-5">
      <div class="col-10 ml-5 desc-box border rounded border-dark">
        <p>{{bug.description}}</p>
      </div>
    </div>
    <div class="mx-5 mt-3 row bg-white rounded border border-dark">
      <div class="col-2">
        <h5>Name</h5>
      </div>
      <div class="col-2">
        <h5>Message</h5>
      </div>
      <div class="col-8 text-right">
        <h5 class="mr-2">Delete</h5>
      </div>
      <div class="overflow-auto note-height">
        <noteComponent v-for="note in notes" :counter="counter++" :noteData="note" :key="note._id" />
      </div>
    </div>
    <div class="row">
      <div class="col-2 offset-9 mt-3">
        <button
          :disabled="bug.closed ? true : false "
          v-if="$auth.isAuthenticated"
          data-toggle="modal"
          data-target="#two"
          class="btn btn-warning"
        >Add Comment</button>
      </div>
    </div>
    <QuickModal id="two">
      <form slot="body" @submit.prevent="addNote">
        <div class="form-group">
          <textarea
            v-model="noteContent"
            class="form-control box-size mt-3"
            placeholder="Comment on the bug?"
            aria-label="With textarea"
            required
          ></textarea>
          <button class="btn btn-primary mt-2 float-right">Submit Comment</button>
        </div>
      </form>
    </QuickModal>
  </div>
</template>


<script>
import ns from "../services/NotificationService";
import QuickModal from "../components/QuickModals";
import noteComponent from "../components/Notes";
export default {
  name: "bugDetails",
  data() {
    return {
      noteContent: "",
      counter: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getBugDetails", this.$route.params.id);
    this.$store.dispatch("getNotes", this.$route.params.id);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    },
  },
  methods: {
    addNote() {
      let payload = {
        content: this.noteContent,
        bugId: this.$route.params.id,
      };
      this.$store.dispatch("addNote", payload);
      $("#two").modal("hide");
      this.content = "";
    },
    async deleteBug() {
      let payload = {
        bugId: this.$route.params.id,
      };
      if (await ns.confirmAction("Are you sure?")) {
        this.$store.dispatch("deleteBug", payload);
        this.$router.push({ name: "Home" });
      }
    },
    async closeReport() {
      let payload = {
        bugId: this.$route.params.id,
        closed: true,
      };
      if (
        await ns.confirmAction(
          "Are you sure? \n Once closed you cannot edit the information",
          "Yes! Close this report!"
        )
      ) {
        this.$store.dispatch("editBug", payload);
      }
    },
  },
  components: {
    QuickModal,
    noteComponent,
  },
};
</script>


<style scoped>
.f-height {
  height: 45rem;
  max-height: 45rem;
  width: auto;
}
.desc-box {
  height: 10rem;
  max-height: 10rem;
}
.note-height {
  height: 15rem;
  max-height: 15rem;
}
</style>