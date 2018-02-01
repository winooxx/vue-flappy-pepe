<template lang="pug">
  #app
    router-view
</template>

<script>
import Canvas from './components/Canvas'
import Score from './components/Score'

export default {
  name: 'app',
  components: {
    Canvas,
    Score
  },
  mounted () {
    this.$router.push({path: 'game'})
  }
}
</script>

<style>

</style>
