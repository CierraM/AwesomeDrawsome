import * as PIXI from 'pixi.js'
import { SmoothStroke } from './SmoothStroke'
import { Easing, lerp } from './util'

export class BrushStroke {
    constructor(brush, izzy) {
        this.container = new PIXI.Container()
        this.brush = brush
        this.smoothStroke = new SmoothStroke()
        this.alphaFilter = new PIXI.filters.AlphaFilter()

        this.izzy = izzy

        this.lastPressure = 0
    }

    addNode({ x, y, pressure } = {}) {
        const points = this.smoothStroke.addPoint(x, y)
        for (let i = 0; i < points.length; i++) {
            const point = points[i]

            const interpolatedPressure = lerp(this.lastPressure, pressure, i / points.length)
            const actualPressure = points.length === 1 ? pressure : interpolatedPressure
            
            const opacityPressure = this.brush.opacityPressure ? actualPressure : 1
            const sizePressure = this.brush.sizePressure ? actualPressure : 1

            const brushAlpha = lerp(0, 1, Easing.easeInExpo(opacityPressure))
            const brushSize = lerp(this.brush.sizeMin, this.brush.size, Easing.easeInQuad(sizePressure)) / 100

            const brushColor = this.brush.isErasing ? this.izzy.backgroundColor : this.brush.colorHex

            const sprite = PIXI.Sprite.from(this.brush.tip)
            sprite.position.set(point.x, point.y)
            sprite.anchor.set(0.5)
            sprite.tint = brushColor
            sprite.alpha = brushAlpha
            sprite.scale.set(brushSize)
            this.container.addChild(sprite)

            this.alphaFilter.alpha = this.brush.opacity
            this.container.filters = [this.alphaFilter]
        }
        this.lastPressure = pressure
    }
}