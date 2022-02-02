import * as PIXI from 'pixi.js'
import { Artist } from './Artist'
import { BrushStroke } from './BrushStroke'

export class Izzy {
    constructor() {
        this.ref = null
        this.renderer = null
        this.container = new PIXI.Container()
        this.test = PIXI.Texture.from('src/izzy/assets/efficiency.png')
        this.artist = new Artist(this)

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
            backgroundColor: 0xEEEEEE,
            antialias: false
        })

        this.artist.init(this)

        this.render()
        this.update()
    }

    addBrushNode(x, y, pressure) {
        this.liveBrushStroke.addNode({ x, y, pressure })
    }

    beginBrushStroke() {
        this.shouldRender = true;

        this.liveBrushStroke = new BrushStroke(this.test)

        const rect = this.ref.getBoundingClientRect()
        const scaleX = this.ref.width / rect.width;
        const scaleY = this.ref.height / rect.height;
        this.liveBrushStroke.container.scale = { x: scaleX, y: scaleY }

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

        this.render()
        this.shouldRender = false;
    }

    render() {
        this.renderer.render(this.container)
    }

    update() {
        if (this.shouldRender) this.render()
        requestAnimationFrame(this.update.bind(this))
    }
}