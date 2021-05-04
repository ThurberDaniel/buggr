import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll(query) {
    return await dbContext.Bugs.find(query).populate('creator', 'name picture')
  }

  async getBugById(id) {
    const data = await dbContext.Bugs.findById(id)
      .populate('creator', ' name picture')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }

  async editBug(body, bugId) {
    return await dbContext.Bugs.findOneAndUpdate({ _id: bugId }, body, { new: true })
  }

  async deleteBug(body) {
    const original = await this.getBugById(body.id)
    original.closed = true
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, original, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
    return 'Successfully Closed!'
  }
}

export const bugsService = new BugsService()
