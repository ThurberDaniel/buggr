<template>
  <div class="container-fluid">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
      Add Bug
    </button>

    <!-- Modal -->
    <div class="modal fade"
         id="exampleModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Report Issue
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <!-- <h3>{{ state.account }}</h3> -->
          </div>
          <div class="modal-body">
            <form @submit.prevent="createBug" class="form-inline">
              <div class="form-group">
                <p> Title</p>
                <label for="title"></label>
                <input type="text"
                       class="form-control"
                       name="title"
                       id="title"
                       aria-describedby="helpId"
                       placeholder="Title"
                       v-model="state.newBug.title"
                       required
                />
              </div>
              <label for="comment"></label>
              <br>
              <p> Comments</p>

              <input type="textarea"
                     class="form-control w-75"
                     name="main-text"
                     id="title"
                     aria-describedby="helpId"
                     placeholder="Your Comment Here"
                     v-model="state.newBug.description"
                     required
              />
              <button class="btn bg-blueish mt-2" type="submit">
                <i class="fas fa-plus fa-2x"></i>
              </button>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-success">
                  Report Bug
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- /// TABLE------------------------------>
    {{ state.bugs.description }}
    <div class="row">
      <div class="col"></div>
    </div>
    <table class="table table-dark shadow">
      <thead>
        <tr>
          <th scope="col" class="text-success">
            Number
          </th>
          <th scope="col" class="text-success">
            Title
          </th>
          <th scope="col" class="text-success">
            Reported By
          </th>
          <th scope="col" class="text-success">
            Status
          </th>
          <th scope="col" class="text-success">
            Last Modified
          </th>
        </tr>
      </thead>
      <tbody v-if="state.bugs">
        <tr v-for="bugz in state.bugs" :key="bugz.id" :banana="bugz">
          <th>
            {{ state.bugs.length = state.bugs.length + 1 }}
          </th>
          <th>
            {{ bugz.title }}
          </th>
          <td>{{ bugz.description }}</td>
          <td>
            {{ bugz.closed }}
          </td>
          <td>{{ bugz.updatedAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBug: {},
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs),
      activeBug: computed(() => AppState.activeBug)
    })
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
          state.newBug = {}
          Notification.toast('Added Bug Issue', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createNote() {
        try {
          await bugsService.createBug(state.newBug)
          state.newBug = {}
          Notification.toast('Added New Bug', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteBug() {
        try {
          await bugsService.deleteBug(state.bugs.id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
