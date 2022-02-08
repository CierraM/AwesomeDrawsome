import * as PIXI from 'pixi.js'
import { Artist } from './Artist'
import { defaultBrush } from './Brush'
import { BrushStroke } from './BrushStroke'

export class Izzy {
    constructor() {
        this.ref = null
        this.renderer = null
        this.container = new PIXI.Container()

        this.undoStack = []
        this.redoStack = []

        this.brushTips = [
            PIXI.Texture.from('src/izzy/assets/hard_round.png'),
            PIXI.Texture.from('src/izzy/assets/pencil.png'),
            PIXI.Texture.from('src/izzy/assets/flat.png'),
            PIXI.Texture.from('src/izzy/assets/charcoal.png')
        ]
        this.brush = null

        this.artist = new Artist(this)

        this.width = null
        this.height = null

        this.backgroundColor = 0xFFFFFF

        this.liveBrushStroke = null
        this.shouldRender = false;
    }

    init(canvasRef, { width = 800, height = 600 } = {}) {
        this.ref = canvasRef

        this.width = width
        this.height = height

        PIXI.settings.FILTER_RESOLUTION = 1
        PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH
        PIXI.settings.MIPMAP_TEXTURES = true
        PIXI.settings.WRAP_MODE = PIXI.WRAP_MODES.REPEAT
        PIXI.utils.skipHello()

        this.renderer = new PIXI.autoDetectRenderer({
            view: this.ref,
            width,
            height,
            backgroundColor: this.backgroundColor,
            antialias: true
        })
        this.renderer.roundPixels = false

        this.setBrush(() => defaultBrush)
        this.artist.init(this)

        this.render()
        this.update()
    }

    getBrushTips() {
        return this.brushTips.map((url, id) => { id, url })
    }

    exportToImage() {
        const renderTexture = PIXI.RenderTexture.create({
            width: this.width,
            height: this.height
        })
        this.renderer.render(this.container, { renderTexture })
        
        const sprite = new PIXI.Sprite(renderTexture)

        this.renderer.extract.canvas(sprite).toBlob((blob) => {
            const a = document.createElement('a')
            document.body.append(a)
            a.download = "image.png"
            a.href = URL.createObjectURL(blob)
            a.click()
            a.remove()
        }, 'image/png')
    }

    setBrush(callback) {
        const brush = callback(this.brush)
        this.brush = brush.init(this)
    }

    addBrushNode(x, y, pressure) {
        this.liveBrushStroke.addNode({ x, y, pressure })
    }

    undo() {
        if (!this.undoStack.length) return

        const sprite = this.undoStack.pop()
        this.container.removeChild(sprite)
        this.redoStack.push(sprite)

        this.render()
    }

    redo() {
        if (!this.redoStack.length) return

        const sprite = this.redoStack.pop()
        this.container.addChild(sprite)
        this.undoStack.push(sprite)

        this.render()
    }

    beginBrushStroke() {
        this.shouldRender = true;

        this.liveBrushStroke = new BrushStroke(this.brush, this)

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
        this.undoStack.push(sprite)
        this.redoStack = []

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