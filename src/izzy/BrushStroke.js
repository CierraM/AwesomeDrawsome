import * as PIXI from 'pixi.js'
import { SmoothStroke } from './SmoothStroke'
import { lerp } from './util'

export class BrushStroke {
    constructor(brushTip) {
        this.container = new PIXI.Container()
        this.brushTip = brushTip
        this.smoothStroke = new SmoothStroke()

        this.lastPressure = 0
    }

    addNode({ x, y, pressure } = {}) {
        const points = this.smoothStroke.addPoint(x, y)
        for (let i = 0; i < points.length; i++) {
            const point = points[i]

            const interpolatedPressure = lerp(this.lastPressure, pressure, i / points.length)
            const actualPressure = points.length === 1 ? pressure : interpolatedPressure

            const sprite = PIXI.Sprite.from(this.brushTip)
            sprite.position.set(point.x, point.y)
            sprite.anchor.set(0.5)
            sprite.tint = 0x000000
            // sprite.alpha
            sprite.scale.set(actualPressure / 50)
            this.container.addChild(sprite)
        }
        this.lastPressure = pressure
    }
}