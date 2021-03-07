import Phaser from 'phaser'

export class Brick extends Phaser.Physics.Arcade.Sprite {
  public gameScene: Phaser.Scene

  private _hp: number = 1

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    hp: number,
    scale: number = 1,
    texture: string = 'brick'
  ) {
    super(scene, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)
    this.setPushable(false)
    this.gameScene = scene
    this.hp = hp
    this.setOrigin(0, 0)
    this.setScale(scale)
  }

  public set hp(value: number) {
    this._hp = value
    switch (value) {
      case 4:
        this.setTint(0x964b00, 0x964b00, 0x964b00, 0x964b00)
        break
      case 3:
        this.setTint(0xff0000, 0xff0000, 0xff0000, 0xff0000)
        break
      case 2:
        this.setTint(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff)
        break
      case 1:
        this.setTint(0x00ff00, 0x00ff00, 0x00ff00, 0x00ff00)
        break
      default:
        this.destroy()
        break
    }
  }

  public get hp() {
    return this._hp
  }

  decreaseHealth = () => {
    console.log('decreasing health')
  }

  increaseHealth = () => {
    console.log('increase health')
  }
}
