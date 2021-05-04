<template>
  <div class="container-fluid">
    <div class="modal" id="new-note-form" tabindex="-1" aria-labelledby="#new-note-form" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Add Comment
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createNote">
              <div class="form-group">
                <small>Reported By</small>
                <h6>{{ state.user.name }}</h6>
              </div>
              <div class="form-group">
                <label for="comment">Comment</label>
                <input type="text"
                       class="form-control"
                       id="comment"
                       aria-describedby="comment"
                       placeholder="Bug Comment"
                       rows="6"
                       coloumns="10"
                       v-model="state.newNote.body"
                       required
                >
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
import $ from 'jquery'
export default {
  name: 'NotesModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {},
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,
      async createNote() {
        try {
          state.newNote.bug = route.params.id
          await notesService.createNote(state.newNote, route.params.id)
          state.newNote = {}
          $('#new-note-form').modal('hide')
          Notification.toast('Created Successfully', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>
<style lang="">

</style>
