import * as sprite from '../misc/sprite'
import bird from './bird'

export const drawCanvasBackground = function () {
  const canvas = this.$refs.canvas
  const ctx = canvas.getContext('2d')
  const graphics = new Image()
  graphics.src = require('../assets/sheet2.png')
  graphics.onload = () => {
    sprite.initSprites(graphics)
    ctx.fillStyle = sprite.screenBackground.color
    run.call(this)
  }
}

const run = function () {
  const loop = () => {
    update.call(this)
    render.call(this)
    window.requestAnimationFrame(loop, this.$refs.canvas)
  }
  window.requestAnimationFrame(loop, this.$refs.canvas)
}

const update = function () {
  const state = this.$store.state
  this.frames++
  if (state.currentState !== state.stage.Score) {
    this.foregroundPostions = (this.foregroundPostions - 2) % 14
  }
  bird.update(this)
}

const render = function () {
  let foregroundPostions = this.foregroundPostions
  const canvas = this.$refs.canvas
  const ctx = canvas.getContext('2d')
  const state = this.$store.state
  // Draw background sprites
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  sprite.screenBackground.draw(ctx, 0, canvas.height - sprite.screenBackground.height)
  sprite.screenBackground.draw(ctx, sprite.screenBackground.width, canvas.height - sprite.screenBackground.height)

  // pipes.draw(ctx)
  bird.draw(ctx)

  // Draw foreground sprites
  sprite.screenForeground.draw(ctx, foregroundPostions, canvas.height - sprite.screenForeground.height)
  sprite.screenForeground.draw(ctx, foregroundPostions + sprite.screenForeground.width, canvas.height - sprite.screenForeground.height)

  const centerWidth = canvas.width / 2
  if (state.currentState === state.stage.Splash) {
    // Draw text and sprite
    sprite.screenSplash.draw(ctx, centerWidth - (sprite.screenSplash.width / 2), canvas.height - 300)
    sprite.screenText.GetReady.draw(ctx, centerWidth - sprite.screenText.GetReady.width / 2, canvas.height - 380)
  }
  if (state.currentState === state.stage.Game) {
    sprite.screenNumberBest.draw(ctx, null, 20, state.score, centerWidth)
  }
  if (state.currentState === state.stage.Score) {
    // Draw game over scene0
    sprite.screenText.GameOver.draw(ctx, centerWidth - sprite.screenText.GameOver.width / 2, canvas.height - 400)
    sprite.screenScore.draw(ctx, centerWidth - sprite.screenScore.width / 2, canvas.height - 340)
    // sprite.screenButton.Ok.draw(ctx, okBtn.x, okBtn.y)
    // Draw score on the scoreboard
    sprite.screenNumberScore.draw(ctx, centerWidth - 47, canvas.height - 304, state.score, null, 10)
    sprite.screenNumberScore.draw(ctx, centerWidth - 47, canvas.height - 262, state.best, null, 10)
  }
}
