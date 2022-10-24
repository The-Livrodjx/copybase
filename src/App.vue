<template>
  <HomePage />
</template>

<script>
import HomePage from '../src/components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style lang="scss" >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden !important;
}
</style>
