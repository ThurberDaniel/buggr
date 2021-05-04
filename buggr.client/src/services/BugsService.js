import { AppState } from '../AppState.js'
import { api } from './AxiosService.js'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getBugById(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.activeBug = res.data
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs', newBug)
    this.getAll(res.data)
  }

  // TODO finish editBug
  async editBug(body) {
    await api.get('api/bugs')
    if (document.getElementById('hideBugs').checked) {
      AppState.bugs = AppState.bugs.filter(b => b.closed !== true)
    } else {
      this.getAll()
    }
  }

  async deleteBug(activeBug, id) {
    await api.delete(`api/bugs/${id}`)
    if (activeBug.closed === false) {
      AppState.activeBug.closed = true
    }
  }

  async hideBugs() {
    await api.get('api/bugs')
    if (document.getElementById('hideBugs').checked) {
      AppState.bugs = AppState.bugs.filter(b => b.closed !== true)
    } else {
      this.getAll()
    }
  }

  async notesByBug(banana) {
    const res = await api.get(`api/bugs/${banana}/notes`)
    AppState.notes = res.data
  }
}

export const bugsService = new BugsService()
