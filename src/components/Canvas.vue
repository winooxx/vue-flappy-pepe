<template lang='pug'>
  canvas(ref='canvas')
</template>

<script>

const setCanvasSize = function () {
  const canvas = this.$refs.canvas
  if (this.windowSize.width >= 500) {
    canvas.width = 320
    canvas.height = 480
    canvas.style.border = '1px solid black'
  } else {
    canvas.width = this.windowSize.width
    canvas.height = this.windowSize.height
    canvas.style.border = ''
  }
}

const setWindowSize = function () {
  this.windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export default {
  name: 'Canvas',
  data: function () {
    return {
      windowSize: {
        width: 0,
        height: 0
      }
    }
  },
  mounted () {
    setWindowSize.call(this)
    setCanvasSize.call(this)
    this.$nextTick(() => {
      window.addEventListener('resize', setWindowSize.bind(this))
    })
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
