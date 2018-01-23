import * as sprite from './sprite'

export default {

  x: 60,
  y: 0,

  frame: 0,
  velocity: 0,
  animation: [0, 1, 2, 1], // animation sequence

  rotation: 0,
  radius: 12,

  gravity: 0.25,
  _jump: 4.6,

  /**
   * Makes the bird "flap" and jump
   */
  jump () {
    // debugger
    this.velocity = -this._jump
    console.log('velocity:' + this.velocity)
  },

  /**
   * Update sprite animation and position of bird
   */
  update (ctx) {
    // make sure animation updates and plays faster in gamestate
    const state = ctx.$store.state
    const canvas = ctx.$refs.canvas
    const n = state.currentState === state.stage.Splash ? 10 : 5
    this.frame += ctx.frames % n === 0 ? 1 : 0
    this.frame %= this.animation.length
    // in splash state make bird hover up and down and set
    // rotation to zero
    if (state.currentState === state.stage.Splash) {
      this.y = canvas.height - 280 + 5 * Math.cos(ctx.frames / 10)
      this.rotation = 0
    } else {
      this.velocity += this.gravity
      this.y += this.velocity
      // change to the score state when bird touches the ground
      if (this.y >= canvas.height - sprite.screenForeground.height - 10) {
        this.y = canvas.height - sprite.screenForeground.height - 10
        if (state.currentState === state.stage.Game) {
          state.currentState = state.stage.Score
        }
        // sets velocity to jump speed for correct rotation
        this.velocity = this._jump
      }

      // when bird lack upward momentum increment the rotation
      // angle
      if (this.velocity >= this._jump) {
        this.frame = 1
        this.rotation = Math.min(Math.PI / 2, this.rotation + 0.3)
      } else {
        this.rotation = -0.3
      }
    }
  },

  draw (context) {
    context.save()
    // translate and rotate context coordinate system
    context.translate(this.x, this.y)
    context.rotate(this.rotation)

    // draws the bird with center in origo
    sprite.screenBird.draw(context, -sprite.screenBird.width / 2, -sprite.screenBird.height / 2)

    context.restore()
  }
}
