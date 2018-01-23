<template lang='pug'>
  canvas(ref='canvas' v-on:mousedown='onpress' v-on:touchstart='onpress')
</template>

<script>
import { drawCanvasBackground, okBtn } from '../misc/draw-canvas'
import bird from '../misc/bird'
import pipes from '../misc/pipes'

const setCanvasSize = function () {
  const canvas = this.$refs.canvas
  if (this.windowSize.width >= 500) {
    canvas.width = 320
    canvas.height = 480
    canvas.style.border = '1px solid black'
    this.$store.commit('actionTrigger', 'pc')
  } else {
    canvas.width = this.windowSize.width
    canvas.height = this.windowSize.height
    canvas.style.border = ''
    this.$store.commit('actionTrigger', 'mobile')
  }
}

const setWindowSize = function () {
  this.windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

const updateCanvas = function () {
  setWindowSize.call(this)
  drawCanvasBackground.call(this)
}

export default {
  name: 'Canvas',
  data: function () {
    return {
      windowSize: {
        width: 0,
        height: 0
      },
      foregroundPostions: 0,
      frames: 0,
      score: 0,
      best: localStorage.getItem('best')
    }
  },
  methods: {
    onpress: function (event) {
      console.log(event)
      const state = this.$store.state
      switch (state.currentState) {
        case state.stage.Splash:
          this.$store.commit('stageChange', 'Game')
          bird.jump()
          console.log('Splash')
          break
        case state.stage.Game:
          bird.jump()
          console.log('Game')
          break
        // change state if event within oKBtn bounding box
        case state.stage.Score:
          // get event position
          let mx = event.offsetX
          let my = event.offsetY

          if (mx == null || my == null) {
            mx = event.touches[0].clientX
            my = event.touches[0].clientYzf
          }

          // check if within
          if (okBtn.x < mx && mx < okBtn.x + okBtn.width &&
            okBtn.y < my && my < okBtn.y + okBtn.height
          ) {
            pipes.reset()
            this.$store.commit('stageChange', 'Splash')
            this.score = 0
          }
          break
      }
    }
  },
  mounted () {
    setWindowSize.call(this)
    setCanvasSize.call(this)
    drawCanvasBackground.call(this)
    this.$nextTick(() => {
      window.addEventListener('resize', updateCanvas.bind(this))
    })
    // console.log(this.best)
  },
  created () {
  },
  watch: {
    windowSize: function () {
      setCanvasSize.call(this)
    }
  }
}
</script>

<style lang="stylus">
canvas
  display block
  position absolute
  margin auto
  top 0
  bottom 0
  left 0
  right 0
</style>
