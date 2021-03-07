import Phaser from 'phaser'
import { Brick } from './brick'

export class BrickFactory {
  public bricks: Brick[]

  public createLevelBricks(scene: Phaser.Scene, levelMatrix: number[][]) {
    const brick = scene.textures.get('brick').getSourceImage()

    const brickAreaWidth = 1000
    const brickAreaHeight = 400

    const columns = levelMatrix[0].length
    const rows = levelMatrix.length

    const maxBrickWidth = Math.floor(brickAreaWidth / columns)
    const maxBrickHeight = Math.floor(brickAreaHeight / rows)

    const brickScaleX = Math.round((maxBrickWidth * 100) / brick.width) / 100
    const brickScaleY = Math.round((maxBrickHeight * 100) / brick.height) / 100

    const brickScale = Math.min(brickScaleX, brickScaleY)

    const brickStackWidth = Math.floor(brickScale * brick.width * columns)
    const brickStackHeight = Math.floor(brickScale * brick.height * rows)

    return levelMatrix
      .map((brickRow: number[], rIndex: number) => {
        return brickRow
          .map((hp: number, cIndex: number) => {
            const offSetX = Math.floor((brickAreaWidth - brickStackWidth) / 2)
            const offSetY = Math.floor((brickAreaHeight - brickStackHeight) / 2)
            const posX = Math.floor(cIndex * brick.width * brickScale) + offSetX
            const posY = Math.floor(rIndex * brick.height * brickScale) + offSetY
            return hp === null ? null : new Brick(scene, posX, posY, hp, brickScale, 'brick')
          })
          .filter((brick) => brick !== null)
      })
      .flat()
  }

  constructor(scene: Phaser.Scene, levelMatrix: number[][]) {
    this.bricks = this.createLevelBricks(scene, levelMatrix)
  }

  public static levelOne = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, 4, 4, 4, 4, 4, null, null],
    [null, null, 3, 3, 3, 3, 3, null, null],
    [null, null, 2, 2, 2, 2, 2, null, null],
    [null, null, 1, 1, 1, 1, 1, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
  ]

  public static levelTwo = [
    [null, 3, 3, 3, 3, 3, 3, 3, null],
    [null, 4, 4, 4, null, 4, 4, 4, null],
    [null, 3, 3, 3, 3, 3, 3, 3, null],
    [null, 2, 2, 2, null, 2, 2, 2, null],
    [null, 1, 1, 1, 1, 1, 1, 1, null]
  ]

  public static levelThree = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 3, 3, 3, 3],
    [2, 2, 2, 2, 2, 2, 2, 3, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]

  public static levelFour = [
    [4, 4, 4, 4, 1, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 1, 3, 3, 3, 3, 3],
    [2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
}
