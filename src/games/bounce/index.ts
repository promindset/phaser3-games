import Phaser from 'phaser'

export default class Bounce extends Phaser.Scene {
  public score: number = 0

  constructor() {
    super('stardust')
  }

  preload() {}

  create() {}

  update() {}
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: Bounce
}

const game = new Phaser.Game(config)
