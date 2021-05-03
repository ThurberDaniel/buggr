import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs', newBug)
    AppState.bugs = res.data
    this.getAll()
  }

  async deleteBug(id) {
    await api.delete(`api/bugs/${id}`)
  }
}

export const bugsService = new BugsService()
