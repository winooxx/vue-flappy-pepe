<template lang="pug">
div
  span Score
  ol
    li(v-for='item in score')
      | {{item}}{{parentMessage}}
  router-link(to='/game') Back to game
</template>

<script>
import AV from 'leancloud-storage'

export default {
  name: 'Score',
  data: function () {
    return {
      parentMessage: ' Point(s)',
      score: []
    }
  },
  mounted () {
    const scoreArray = []
    const query = new AV.Query('FlappyPepeScore')
    query.limit(10)
    query.select('score')
    query.descending('score')
    query.find().then(function (info) {
      info.forEach(function (scoreDetail) {
        let eachScore = scoreDetail.get('score')
        scoreArray.push(eachScore)
      })
    }).catch(function (error) {
      alert(JSON.stringify(error))
    })
    this.score = scoreArray
  }
}
</script>

