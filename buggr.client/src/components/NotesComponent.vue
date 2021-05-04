<template>
  <div class="card-custom col-12 col-md-11 shadow mt-1 bg-light">
    <div class="border-custom d-flex flex-direction justify-content-between inline">
      <p class="py-3 pl-2">
        <img class="rounded-circle small-image" :src="note.creator.picture" alt="Creator Picture">

        <b>Name:</b>
        {{ note.creator.name }}
      </p>
      <p class="py-3 pl-2">
        <b>Message</b> :
        {{ note.body }}
      </p>
      <p class="py-3 pl-2">
        <button type="button" class="btn btn-outline-danger" @click="deleteNote" v-if="state.user.isAuthenticated && state.account.id === note.creatorId">
          <small>X</small>
        </button>
      </p>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { notesService } from '../services/NotesService'
export default {
  name: 'NotesComponent',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,
      async deleteNote() {
        try {
          if (await Notification.confirmAction()) {
            await notesService.deleteNote(props.note.id, props.note.bug)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>
<style scoped>
.small-image{
  height: 50px;
  width: 50px;
}
</style>
