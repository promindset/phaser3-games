import Phaser from 'phaser'
import { Brick } from './brick'

enum BrickType {
  e,
  A,
  B,
  C,
  D
}

export class BrickFactory {
  public bricks: Brick[]

  public createLevelBricks(scene: Phaser.Scene, levelMatrix: string[][]) {
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
      .map((brickRow: string[], rIndex: number) => {
        return brickRow
          .map((type: string, cIndex: number) => {
            if (type === 'e') {
              return null
            }
            const offSetX = Math.floor((brickAreaWidth - brickStackWidth) / 2)
            const offSetY = Math.floor((brickAreaHeight - brickStackHeight) / 2)
            const posX = Math.floor(cIndex * brick.width * brickScale) + offSetX
            const posY = Math.floor(rIndex * brick.height * brickScale) + offSetY
            return new Brick(scene, posX, posY, BrickType[type], brickScale, 'brick')
          })
          .filter((brick) => brick !== null)
      })
      .flat()
  }

  constructor(scene: Phaser.Scene, levelMatrix: string[][]) {
    this.bricks = this.createLevelBricks(scene, levelMatrix)
  }

  public static levelOne = [
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'D', 'D', 'D', 'D', 'D', 'e', 'e'],
    ['e', 'e', 'C', 'C', 'C', 'C', 'C', 'e', 'e'],
    ['e', 'e', 'B', 'B', 'B', 'B', 'B', 'e', 'e'],
    ['e', 'e', 'A', 'A', 'A', 'A', 'A', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
  ]

  public static levelTwo = [
    ['e', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'e'],
    ['e', 'D', 'D', 'D', 'e', 'D', 'D', 'D', 'e'],
    ['e', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'e'],
    ['e', 'B', 'B', 'B', 'e', 'B', 'B', 'B', 'e'],
    ['e', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'e']
  ]

  public static levelThree = [
    ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
    ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'],
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'C', 'B'],
    ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
  ]

  public static levelFour = [
    ['D', 'D', 'D', 'D', 'A', 'D', 'D', 'D', 'D', 'D'],
    ['C', 'C', 'C', 'C', 'A', 'C', 'C', 'C', 'C', 'C'],
    ['B', 'B', 'B', 'B', 'A', 'B', 'B', 'B', 'B', 'B'],
    ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
  ]
}
