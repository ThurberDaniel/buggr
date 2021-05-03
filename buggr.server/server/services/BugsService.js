import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
      .populate('creator', 'name picture')
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

  async editBug(body) {
    return await dbContext.Bugs.findOneAndReplace(body)
  }

  async deleteBug(id, userId) {
    const data = await dbContext.Bugs.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
    return 'Successfully deleted/edit'
  }
}

export const bugsService = new BugsService()
