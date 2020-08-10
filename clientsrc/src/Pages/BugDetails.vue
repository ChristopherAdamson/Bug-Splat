<template>
  <div class="bugDetails container bg-danger rounded pt-3 f-height">
    <div class="row">
      <div class="col-7">
        <h1 v-show="!wasEdited">{{bug.title}}</h1>
        <h1 v-show="wasEdited" v-if="!editContent">{{titleContent}}</h1>
        <input v-if="editContent" type="text" class="form-control" v-model="titleContent" required />
        <h4>Reported By: {{bug.creatorEmail}}</h4>
      </div>
      <div class="col-5 text-right">
        <button
          v-if="!editContent"
          :disabled="bug.closed ? true : false "
          @click="editBug"
          class="btn btn-primary mx-1 fixed-right"
        >Edit Bug Report</button>
        <button
          v-if="editContent"
          :disabled="bug.closed ? true : false "
          @click="saveBug"
          class="btn btn-primary mx-1 fixed-right"
        >Save Bug Report</button>
        <button @click="deleteBug" class="btn btn-success mx-1 fixed right">Delete</button>
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
      <div v-show="!wasEdited" class="col-10 ml-5 desc-box border rounded border-dark">
        <h5>{{bug.description}}</h5>
      </div>
      <div
        v-show="wasEdited"
        v-if="!editContent"
        class="col-10 ml-5 desc-box border rounded border-dark"
      >
        <h5>{{bodyContent}}</h5>
      </div>
      <div v-if="editContent" class="col-10 ml-5 desc-box border rounded border-dark">
        <input type="text" class="form-control" v-model="bodyContent" required />
      </div>
    </div>
    <div class="mx-5 mt-3 row bg-white rounded border border-dark">
      <div class="col-4">
        <h5>Name</h5>
      </div>
      <div class="col-2">
        <h5>Message</h5>
      </div>
      <div class="col-6 text-right">
        <h5 class="mr-2">Delete</h5>
      </div>
      <div class="overflow-auto col-12 note-height">
        <noteComponent
          v-for="note in notes"
          :counterData="counter++"
          :noteData="note"
          :key="note._id"
        />
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
      editContent: false,
      titleContent: "",
      bodyContent: "",
      wasEdited: false,
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
      return this.$store.state.notes[this.$route.params.id];
    },
  },
  methods: {
    addNote() {
      let payload = {
        content: this.noteContent,
        bugId: this.$route.params.id,
      };
      debugger;
      this.noteContent = "";
      this.$store.dispatch("addNote", payload);
      $("#two").modal("hide");
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
    editBug() {
      if (!this.titleContent) {
        this.titleContent = this.bug.title;
        this.bodyContent = this.bug.description;
      }
      this.editContent = !this.editContent;
      this.wasEdited = true;
    },
    saveBug() {
      let payload = {
        title: this.titleContent,
        description: this.bodyContent,
        bugId: this.bug._id,
      };
      this.editContent = !this.editContent;
      this.$store.dispatch("editBug", payload);
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