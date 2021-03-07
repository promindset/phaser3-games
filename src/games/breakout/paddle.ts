import Phaser from 'phaser'

export class Paddle extends Phaser.Physics.Arcade.Sprite {
  public gameScene: Phaser.Scene
  public movingLeft: boolean = false
  public movingRight: boolean = false
  public velocity: number = 300

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string = 'paddle') {
    super(scene, x, y, texture)
    this.gameScene = scene

    // allow paddle
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setBounce(0.05)
    this.setCollideWorldBounds(true)
    this.setPushable(false)

    scene.input.keyboard.on('keydown-LEFT', this.startMovingLeft)
    scene.input.keyboard.on('keydown-RIGHT', this.startMovingRight)

    scene.input.keyboard.on('keyup-LEFT', this.stopMovingLeft)
    scene.input.keyboard.on('keyup-RIGHT', this.stopMovingRight)

    // capture in-game used keys, so they don't bubble up to browser events.
    scene.input.keyboard.addCapture('LEFT,RIGHT')
  }

  startMovingLeft = () => {
    this.movingLeft = true
    this.setVelocityX(-this.velocity)
  }

  stopMovingLeft = () => {
    this.movingLeft = false
    const velocity = this.movingRight ? this.velocity : 0
    this.setVelocityX(velocity)
  }

  startMovingRight = () => {
    this.movingRight = true
    this.setVelocityX(this.velocity)
  }

  stopMovingRight = () => {
    this.movingRight = false
    const velocity = this.movingLeft ? -this.velocity : 0
    this.setVelocityX(velocity)
  }
}
