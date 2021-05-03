<template>
  <div>
    <p>
      BUGS Detail page
    </p>
  </div>
</template>

<script>
import Notification from '../utils/Notification'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
export default {
  name: 'BugsDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      newNote: {},
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        await bugsService.getActiveBug(route.params.id)
        await notesService.getNotes(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      route,
      state,
      async deleteBug() {
        try {
          await bugsService.deleteBug(state.activeBug.id)
          AppState.activeBug = {}
          router.push({ name: 'BugsPage' })
          Notification.toast('Successfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createNote() {
        try {
          state.newNote.bugId = route.params.id
          await notesService.createNote(state.newNote)
          state.newNote = {}
          Notification.toast('Added New Note', 'success')
        } catch (error) {
          Notification.toast('Error:' + error, 'error')
        }
      }

    }
  },
  components: {}
}
</script>
<style scoped>
button{
  border: none;
}
</style>
