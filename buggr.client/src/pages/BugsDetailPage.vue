<template>
  <div class="background container-fluid">
    <div class="row d-flex flex-direction inline justify-content-between" v-if="state.activeBug">
      <div class="col-md-6">
        <p>Title</p>
        <h1>{{ state.activeBug.title }}</h1>
      </div>
      <div class="col-md-4 my-5 d-flex flex-direction justify-content-end">
        <button type="submit"
                class="btn btn-outline-danger"
                v-if="state.user.isAuthenticated && state.account.id === state.activeBug.creatorId && state.activeBug.closed === false"
                @click="deleteBug"
        >
          Close
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 my-3" v-if="state.activeBug.creator">
        <small>Reported By: </small><h4>{{ state.activeBug.creator.name }}</h4>
      </div>
      <div class="col-md-6 my-3 d-flex flex-direction justify-content-end">
        <small class="mr-2">Status:</small><h6 v-if="state.activeBug.closed=== true" class="text-danger">
          Closed
        </h6>
        <h6 v-if="state.activeBug.closed=== false" class="text-success">
          Open
        </h6>
      </div>
      <div class="col-12 my-3 pl-4 border bg-light">
        <p>
          {{ state.activeBug.description }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <h4>Notes</h4>
        <div class="col-2">
          <button title="Open Create Note Form" type="button" class="btn" data-toggle="modal" data-target="#new-note-form">
            <i class="fas fa-plus" aria-hidden="true" v-if="state.user.isAuthenticated">Note</i>
          </button>
        </div>
      </div>
    </div>
    <div class="row d-flex flex direction justify-content-center" v-if="state.notes">
      <NoteComponent v-for="note in state.notes" :key="note.id" :note="note" />
    </div>
    <NotesModal />
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {},
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        await notesService.getNotesByBug(route.params.id)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async deleteBug() {
        try {
          if (await Notification.confirmAction()) {
            await bugsService.deleteBug(state.activeBug, state.activeBug.id)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>
<style scoped>
.background{
  background-color: rgb(170, 170, 170)
}

.btn:hover{
  background-color: aquamarine;
  color:white;
}
</style>
