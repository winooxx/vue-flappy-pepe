import * as sprite from '../misc/sprite'

export const drawCanvasBackground = function () {
  const ctx = this.$refs.canvas.getContext('2d')
  const graphics = new Image()
  graphics.src = require('../assets/sheet2.png')
  graphics.onload = () => {
    sprite.initSprites(graphics)
    ctx.fillStyle = sprite.screenBackground.color
    ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
  }
}

export const render = function () {
}
