<template>
  <div class="QuickModal">
    <div
      class="modal fade"
      :id="id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "QuickModal",
  data() {
    return {};
  },
  props: ["id"],
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>