import { clamp } from "./util"

export class Brush {
    constructor({ tipIndex = 3, size = 10, color = 0x000000, opacity = 1, sizePressure = true, opacityPressure = false } = {}) {
        this.tipIndex = tipIndex
        this.tip = null
        this.size = size
        this.sizeVariance = size
        this.sizeMin = clamp(this.size - this.sizeVariance, 0, this.size)
        this.color = color
        this.opacity = opacity
        this.sizePressure = sizePressure
        this.opacityPressure = opacityPressure
    }

    update(properties) {
        return new Brush({ ...this, ...properties })
    }
}

export const defaultBrush = new Brush()