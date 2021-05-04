<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-custom text-light text-center p-4">
      Made with Power by Daniel
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">

.bg-custom{
  background-color: yellow;
  background-image:linear-gradient(to left, rgb(215, 184, 12))

}
@import "./assets/scss/main.scss";

</style>
