import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotes(query) {
    return await dbContext.Notes.find(query)
  }

  async createNote(body) {
    return await dbContext.Notes.create(body)
  }

  async deleteNote(id, userId) {
    const data = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
  }
}

export const notesService = new NotesService()
