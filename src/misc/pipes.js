import * as sprite from './sprite'
import bird from './bird'
import AV from 'leancloud-storage'

export default {

  _pipes: [],

  /**
   * Empty pipes array
   */
  reset () {
    this._pipes = []
  },

  /**
   * Create, push and update all pipes in pipe array
   */
  update (ctx) {
    const canvas = ctx.$refs.canvas
    const state = ctx.$store.state
    // add new pipe each 100 frames
    if (ctx.frames % 100 === 0) {
      // calculate y position
      let _y = canvas.height - (sprite.screenPipeBottom.height + sprite.screenForeground.height + 120 + 200 * Math.random())
      // create and push pipe to array
      this._pipes.push({
        x: 500,
        y: _y,
        width: sprite.screenPipeBottom.width,
        height: sprite.screenPipeBottom.height
      })
    }
    for (let i = 0, len = this._pipes.length; i < len; i++) {
      const p = this._pipes[i]
      if (i === 0) {
        ctx.score += p.x === bird.x ? 1 : 0
        // collision check, calculates x/y difference and
        // use normal vector length calculation to determine
        // intersection
        const cx = Math.min(Math.max(bird.x, p.x), p.x + p.width)
        const cy1 = Math.min(Math.max(bird.y, p.y), p.y + p.height)
        const cy2 = Math.min(Math.max(bird.y, p.y + p.height + 80), p.y + 2 * p.height + 80)
        // closest difference
        const dx = bird.x - cx
        const dy1 = bird.y - cy1
        const dy2 = bird.y - cy2
        // vector length
        const d1 = dx * dx + dy1 * dy1
        const d2 = dx * dx + dy2 * dy2
        const r = bird.radius * bird.radius
        // determine intersection
        if (r > d1 || r > d2) {
          const FlappyPepeScore = AV.Object.extend('FlappyPepeScore')
          const flappypepe = new FlappyPepeScore()
          flappypepe.set('score', ctx.score)
          flappypepe.save()
          state.currentState = state.stage.Score
        }
      }

      // move pipe and remove if outside of canvas
      p.x -= 2
      if (p.x < -p.width) {
        this._pipes.splice(i, 1)
        i--
        len--
      }
    }
  },

  draw (ctx) {
    for (let i = 0; i < this._pipes.length; i++) {
      const p = this._pipes[i]
      sprite.screenPipeBottom.draw(ctx, p.x, p.y)
      sprite.screenPipeTop.draw(ctx, p.x, p.y + 80 + p.height)
    }
  }
}
