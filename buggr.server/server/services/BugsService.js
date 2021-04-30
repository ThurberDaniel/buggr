import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll(query) {
    return await dbContext.Bugs.find(query)
  }

  async getBugById(id) {
    const data = await dbContext.Bugs.findById(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }

  async deleteBug(id, userId) {
    const data = await dbContext.Bugs.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
  }
}

export const bugsService = new BugsService()
