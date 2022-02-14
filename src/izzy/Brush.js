import * as PIXI from 'pixi.js'
import { clamp } from "./util"

export class Brush {
    constructor({ tipId = 1, size = 50, color = "#000000", opacity = 1, sizePressure = true, opacityPressure = false, isErasing = false } = {}) {
        this.tipId = tipId
        this.tip = null
        this.size = size
        this.sizeVariance = size
        this.sizeMin = clamp(this.size - this.sizeVariance, 0, this.size)
        this.color = color
        this.colorHex = null
        this.opacity = opacity
        this.sizePressure = sizePressure
        this.opacityPressure = opacityPressure
        this.isErasing = isErasing
    }

    init(izzy) {
        this.tip = izzy.brushTips[this.tipId]
        this.colorHex = PIXI.utils.string2hex(this.color)
        return this;
    }

    update(properties) {
        const brush = new Brush({ ...this, ...properties })

        return brush
    }
}

export const defaultBrush = new Brush()