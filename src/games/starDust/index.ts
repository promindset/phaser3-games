import Phaser from 'phaser'

export default class Stardust extends Phaser.Scene {
  public cursors: any
  public player: any
  public stars: any
  public bombs: any
  public scoreText: any
  public score: number = 0

  constructor() {
    super('stardust')
  }

  preload() {
    this.load.image('sky', 'assets/startDust/sky.png')
    this.load.image('platform', 'assets/startDust/platform.png')
    this.load.image('star', 'assets/startDust/star.png')
    this.load.image('bomb', 'assets/startDust/bomb.png')
    this.load.spritesheet('dude', 'assets/startDust/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    })
  }

  public collectStar(player, star) {
    star.disableBody(true, true)
    this.score += 10
    this.scoreText.setText('Score: ' + this.score)

    if (this.stars.countActive(true) === 0) {
      const stars = this.stars.getChildren()
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true)
      })
    }

    // for every star captured throw a bomb
    const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
    const bomb = this.bombs.create(x, 16, 'bomb')
    bomb.setBounce(1)
    bomb.setCollideWorldBounds(true)
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
  }

  public hitBomb(player, bomb) {
    this.physics.pause()
    player.setTint(0xff0000)
    player.anims.play('turn')
  }

  create() {
    // Sky
    this.add.image(0, 0, 'sky').setOrigin(0, 0)

    // Platforms
    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 568, 'platform').setScale(2).refreshBody()
    platforms.create(600, 400, 'platform')
    platforms.create(50, 250, 'platform')
    platforms.create(750, 220, 'platform')

    // Player
    this.player = this.physics.add.sprite(100, 450, 'dude')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    this.player.setGravityY(300)
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })
    this.physics.add.collider(this.player, platforms)
    this.cursors = this.input.keyboard.createCursorKeys()

    // Stars
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })
    this.physics.add.collider(this.stars, platforms)
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

    // Score text
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      color: '#000'
    })

    // Bombs
    this.bombs = this.physics.add.group()
    this.physics.add.collider(this.bombs, platforms)
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)

      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)

      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)

      this.player.anims.play('turn')
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-430)
    }
  }
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
  scene: Stardust
}

const game = new Phaser.Game(config)
