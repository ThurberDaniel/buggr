import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
// import { get } from 'mongoose'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getAll)
      .get('/:id', this.getBugsById)
      .get('/:id/notes', this.notesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.deleteBug)
  }

  async getAll(req, res, next) {
    try {
      const data = await bugsService.getAll(req.query)
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
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.createBug(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      delete req.body.closed
      const data = await bugsService.editBug(req.body, req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async notesByBugId(req, res, next) {
    try {
      const data = await notesService.notesByBugId({ bug: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.closed = true
      req.body.id = req.params.id
      const data = await bugsService.deleteBug(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
