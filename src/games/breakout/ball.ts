import Phaser from 'phaser'

export class Ball extends Phaser.Physics.Arcade.Sprite {
  public gameScene: Phaser.Scene
  public movingLeft: boolean = false
  public movingRight: boolean = false
  public velocity: number = 300

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string = 'ball') {
    super(scene, x, y, texture)
    this.gameScene = scene

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
    this.setScale(0.05)
    this.setVelocity(-50, 100)
    this.setBounce(1, 1)
    this.setMaxVelocity(300, 300)
  }
}
