import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotes(query) {
    return await dbContext.Notes.find(query)
  }

  async createNote(body) {
    return await dbContext.Notes.create(body)
  }

  async notesByBugId(id) {
    return await dbContext.Notes.find(id)
      .populate('creator', 'name picture')
  }

  async deleteNotes(id, userId) {
    const data = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
    return 'Successfully Deleted'
  }
}

export const notesService = new NotesService()
