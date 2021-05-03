import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async notesByBugId(id) {
    const banana = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = banana.data
  }

  async createNote(newNote, id) {
    await api.post('api/notes', newNote)
    this.createNote(id)
  }

  async deleteNote(id, bugId) {
    await api.delete(`api/notes/${id}`)
    this.notesByBugId(bugId)
  }
}

export const notesService = new NotesService()
