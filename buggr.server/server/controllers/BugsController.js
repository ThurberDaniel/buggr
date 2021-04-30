import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
// import { get } from 'mongoose'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id/bugs', this.getNotes)
      .get('/:id', this.getBugsById)
      .post('', this.createBug)
      .delete('/:id', this.deleteBug)
  }

  async getAll(req, res, next) {
    try {
      const data = await bugsService.getAll({ creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getBugsById(req, res, next) {
    try {
      const data = await bugsService.getBugById(req.params.id)
      return res.send(data)
    } catch (error) {

    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = bugsService.createBug(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      const data = await bugsService.deleteBug(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const data = await notesService.getLists({ boardId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
