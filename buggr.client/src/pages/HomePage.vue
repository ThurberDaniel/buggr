<template>
  <div class="home bg-primary flex-grow-1 d-flex flex-column align-top align-items-center justify-content-center">
    <span class="align-top bg-warning">
      1010
      <button>Hello</button>
    </span>
    HOME PAGE
    <div class="bg-success w-100">
      hello123
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
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
