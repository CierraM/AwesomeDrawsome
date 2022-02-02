import * as PIXI from 'pixi.js'
import { SmoothStroke } from './SmoothStroke'
import { lerp } from './util'


class Izzy {
    constructor() {
        this.ref = null
        this.renderer = null
        this.container = new PIXI.Container()
        this.test = PIXI.Texture.from('src/izzy/assets/efficiency.png')
        this.artist = new Artist()

        this.width = null
        this.height = null

        this.liveBrushStroke = null
        this.shouldRender = false;
    }

    init(canvasRef, { width = 800, height = 600 } = {}) {
        this.ref = canvasRef

        this.width = width
        this.height = height

        this.renderer = new PIXI.autoDetectRenderer({
            view: this.ref,
            width,
            height,
            backgroundColor: 0xFFFFFF,
            antialias: false
        })

        this.artist.init(this)

        this.renderer.render(this.container)
        this.update()
    }

    addBrushNode(x, y, pressure) {
        this.liveBrushStroke.addNode({ x, y, pressure })
    }

    beginBrushStroke() {
        this.shouldRender = true;

        this.liveBrushStroke = new BrushStroke(this.test)
        this.container.addChild(this.liveBrushStroke.container)
    }

    endBrushStroke() {
        const renderTexture = PIXI.RenderTexture.create({
            width: this.width,
            height: this.height
        })
        this.renderer.render(this.liveBrushStroke.container, { renderTexture })
        
        const sprite = new PIXI.Sprite(renderTexture)
        
        this.container.removeChild(this.liveBrushStroke.container)
        this.container.addChild(sprite)

        this.shouldRender = false;
    }

    update() {
        if (this.shouldRender)  this.renderer.render(this.container)
        requestAnimationFrame(this.update.bind(this))
    }
}

class BrushStroke {
    constructor(brushTip) {
        // this.path = new paper.Path()
        this.container = new PIXI.Container()
        this.brushTip = brushTip
        this.smoothStroke = new SmoothStroke()

        this.lastPressure = 0
    }

    addNode({ x, y, pressure } = {}) {

        // console.time('addNode')
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
        // console.timeEnd('addNode')

    }
}

class Artist {
    constructor() {
        this.pointerDown = false
        this.canvas = null
    }

    _getRelativePointerPosition(event) {
        const rect = this.canvas.ref.getBoundingClientRect()
        const scaleX = this.canvas.ref.width / rect.width;
        const scaleY = this.canvas.ref.height / rect.height;

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY
        }
    }

    init(canvas) {
        this.canvas = canvas

        // Add event listners
        this.canvas.ref.addEventListener('pointerdown', (e) => {
            const { x, y } = this._getRelativePointerPosition(e)

            this.pointerDown = true
            this.canvas.beginBrushStroke()
            this.canvas.addBrushNode(x, y, e.pressure)
        })
        this.canvas.ref.addEventListener('pointerup', () => {
            this.pointerDown = false
            this.canvas.endBrushStroke()
        })
        this.canvas.ref.addEventListener('pointermove', (e) => {
            if (this.pointerDown) {
                const { x, y } = this._getRelativePointerPosition(e)
                this.canvas.addBrushNode(x, y, e.pressure)
            }
        })
    }
}

export const izzy = new Izzy() // Export as singleton