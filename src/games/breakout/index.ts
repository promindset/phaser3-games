import Phaser from 'phaser'
import { Ball, Brick, Paddle } from './components'
import { BrickFactory } from './factories'
import { genBoundedRandom } from '../utils/math'

export default class BreakOut extends Phaser.Scene {
  public assetsDir = 'assets/breakout'
  public paddle: Paddle
  public ball: Ball
  public bricks: Phaser.Physics.Arcade.StaticGroup

  constructor() {
    super('breakOut')
  }

  preload() {
    this.load.image('paddle', `${this.assetsDir}/paddle.png`)
    this.load.image('ball', `${this.assetsDir}/ball.png`)
    this.load.image('brick', `${this.assetsDir}/brick.png`)
    this.load.image('powerUp', `${this.assetsDir}/powerup.png`)
    this.load.image('bullet', `${this.assetsDir}/bullet.png`)
    this.load.image('paddleShooter', `${this.assetsDir}/paddle-shooter.png`)
  }

  create() {
    this.cameras.main.setBackgroundColor('#D8D8D8')
    this.paddle = new Paddle(this, 500, 550)

    // Setup Bricks using brick factory (default level one)
    const brickFactory = new BrickFactory(this, BrickFactory.levelTwo)
    this.bricks = this.physics.add.staticGroup(brickFactory.bricks)

    this.ball = new Ball(this, 500, 300)

    // Add a collider between ball and paddle.
    this.physics.add.collider(this.ball, this.paddle, this.collideBallPaddle)

    // Add a collider between ball and bricks.
    this.bricks.children.iterate((brick) =>
      this.physics.add.collider(this.ball, brick, this.collideBallBrick)
    )
  }

  collideBallPaddle = (ball: Ball, paddle: Paddle) => {
    const bounceX = genBoundedRandom(0.7, 1.6)
    const bounceY = genBoundedRandom(0.7, 1.6)
    ball.setBounce(bounceX, bounceY)
  }

  collideBallBrick = (ball: Ball, brick: Brick) => {
    const bounceX = genBoundedRandom(0.7, 1.6)
    const bounceY = genBoundedRandom(0.7, 1.6)
    ball.setBounce(bounceX, bounceY)
    brick.hp--
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000',
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: BreakOut
}

const game = new Phaser.Game(config)
