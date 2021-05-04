<template>
  <div class="card-custom col-12 col-md-11 shadow text-success mt-1 bg-dark">
    <div class="border-custom d-flex flex-direction justify-content-between inline">
      <!-- <table class="table table-dark shadow">
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
      </table> -->

      <router-link :to="{name: 'bugDetails', params: {id: bug.id}}">
        <p class="py-3 pl-2">
          {{ bug.title }}
        </p>
      </router-link>
      <p class="py-3 pl-2">
        <img class="rounded-circle small-image" :src="bug.creator.picture" alt="Creator Picture">
        {{ bug.creator.name }}
      </p>
      <p class="py-3 pl-2 text-danger" v-if="bug.closed===true">
        Closed
      </p>
      <p class="py-3 pl-2 text-success" v-if="bug.closed===false">
        Open
      </p>
      <p class="py-3 pl-2">
        {{ new Date (bug.updatedAt).toLocaleString('en', 'time') }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BugsComponent',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      time: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      }
    }
  },
  components: {}
}
</script>
<style scoped>
.small-image{
  height: 50px;
  width: 50px;
}
</style>
