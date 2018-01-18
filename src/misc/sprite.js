/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "screen" }] */
export let
  screenBird,
  screenBackground,
  screenForeground,
  screenPipeTop,
  screenPipeBottom,
  screenText,
  screenButton,
  screenScore,
  screenSplash,
  screenNumberScore,
  screenNumberBest

class Sprite {
  constructor (img, x, y, width, height) {
    this.img = img
    this.x = x * 2
    this.y = y * 2
    this.width = width * 2
    this.height = height * 2
  }

  draw (ctx, x, y) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
      x, y, this.width, this.height)
  }
}

export const initSprites = (img) => {
  screenBird = new Sprite(img, 156, 115, 17, 17)
  screenBackground = new Sprite(img, 0, 0, 138, 114)
  screenBackground.color = '#70C5CF'
  screenForeground = new Sprite(img, 138, 0, 112, 56)

  screenPipeTop = new Sprite(img, 251, 0, 26, 200)
  screenPipeBottom = new Sprite(img, 277, 0, 26, 200)

  screenText = {
    FlappyBird: new Sprite(img, 59, 114, 96, 22),
    GameOver: new Sprite(img, 59, 136, 94, 19),
    GetReady: new Sprite(img, 59, 155, 87, 22)
  }

  screenButton = {
    Rate: new Sprite(img, 79, 177, 40, 14),
    Menu: new Sprite(img, 119, 177, 40, 14),
    Share: new Sprite(img, 159, 177, 40, 14),
    Score: new Sprite(img, 79, 191, 40, 14),
    Ok: new Sprite(img, 119, 191, 40, 14),
    Start: new Sprite(img, 159, 191, 40, 14)
  }

  screenScore = new Sprite(img, 138, 56, 113, 58)
  screenSplash = new Sprite(img, 0, 114, 59, 49)

  screenNumberScore = new Sprite(img, 0, 177, 6, 7)
  screenNumberBest = new Sprite(img, 0, 188, 7, 10)

  screenNumberScore.draw = (ctx, x, y, num, center, offset) => {
    num = num.toString()
    const step = screenNumberScore.width + 2
    if (center) {
      x = center - (num.length * step - 2) / 2
    }
    if (offset) {
      x += step * (offset - num.length)
    }
    for (let i = 0, len = num.length; i < len; i++) {
      const n = parseInt(num[i])
      ctx.drawImage(img, step * n, screenNumberScore.y, screenNumberScore.width, screenNumberScore.height,
        x, y, screenNumberScore.width, screenNumberScore.height)
      x += step
    }
  }

  screenNumberBest.draw = (ctx, x, y, num, center, offset) => {
    num = num.toString()
    const step = screenNumberBest.width + 2
    if (center) {
      x = center - (num.length * step - 2) / 2
    }
    if (offset) {
      x += step * (offset - num.length)
    }
    for (let i = 0, len = num.length; i < len; i++) {
      const n = parseInt(num[i])
      ctx.drawImage(img, step * n, screenNumberBest.y, screenNumberBest.width, screenNumberBest.height,
        x, y, screenNumberBest.width, screenNumberBest.height)
      x += step
    }
  }
}
