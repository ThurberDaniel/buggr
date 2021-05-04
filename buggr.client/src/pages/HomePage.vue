<template>
  <div class="container-fluid">
    <div class="home flex-grow-1 d-flex flex-column">
      <div class="row" v-if="state.bugs">
        <div class="col-md-6">
          <div class="d-flex flex-direction inline ml-2 my-3">
            <h1 class="mr-2">
            </h1>
            <button title="Open Create Bug Form"
                    type="button"
                    class="btn"
                    data-toggle="modal"
                    data-target="#new-bug-form"
                    v-if="state.user.isAuthenticated"
            >
              <i class="fas fa-plus border-dark" aria-hidden="true">Add Bug</i>
            </button>
          </div>
        </div>
        <div class="col-6 d-flex flex-direction align-items-end justify-content-end">
          <input type="checkbox" id="hideBugs" @click="hideBugs">
          <small>Remove Closed</small>
        </div>
      </div>

      <div class="row d-flex flex direction justify-content-center">
        <BugsComponent v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
      </div>
    </div>
  </div>

  <!-- BEGINNING OF MODAL -->
  <div class="modal fade" id="new-bug-form" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Add A Bug To List
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body allText">
          <form @submit.prevent="createBug">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     aria-describedby="title"
                     placeholder="Bug Title"
                     v-model="state.newBug.title"
                     required
              >
            </div>
            <div class="form-group">
              <label for="comment">Comment</label>
              <input type="text"
                     class="form-control"
                     id="comment"
                     aria-describedby="comment"
                     placeholder="Bug Comment"
                     v-model="state.newBug.description"
                     required
              >
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal">
                Close
              </button>

              <button type="submit" class="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import $ from 'jquery'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBug: {},
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs)
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
          $('#new-bug-form').modal('hide')
          Notification.toast('Added Bug', 'success')
        } catch (error) {
          Notification.toast('Error:' + error, 'error')
        }
      },
      async hideBugs() {
        try {
          await bugsService.hideBugs()
        } catch (error) {
          Notification.toast('Error: ' + error, ' error')
        }
      }
    }
  }
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

.btn{
  background-color: green;
  color:white;
  border-color: black;
}
.btn:hover{
  background-color: black;
  color:pink;
}
</style>
