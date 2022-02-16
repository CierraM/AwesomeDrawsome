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

    isDirty() {
        return !!this.container.children.length
    }

    clear() {
        this.container.removeChildren()
    }

    fullClear() {
        this.clear()
        this.undoStack = []
        this.redoStack = []
        this.render()
    }

    getBrushTips() {
        return this.brushTips.map((texture, id) => {
            return { id, url: texture.baseTexture.cacheId }
        })
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

    redrawUndoStack() {
        const canvasTexture = PIXI.RenderTexture.create({
            width: this.width,
            height: this.height
        })
        const tempContainer = new PIXI.Container()
        tempContainer.addChild(...this.undoStack)
        this.renderer.render(tempContainer, { renderTexture: canvasTexture })
        const canvasSprite = new PIXI.Sprite(canvasTexture)

        this.clear()
        this.container.addChild(canvasSprite)
        this.render()
    }

    undo() {
        if (!this.undoStack.length) return

        const sprite = this.undoStack.pop()
        this.redoStack.push(sprite)

        if (this.undoStack.length) this.redrawUndoStack()
    }

    redo() {
        if (!this.redoStack.length) return

        const sprite = this.redoStack.pop()
        this.container.addChild(sprite)
        this.undoStack.push(sprite)

        if (this.undoStack.length) this.redrawUndoStack()

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
        const canvasTexture = PIXI.RenderTexture.create({
            width: this.width,
            height: this.height
        })
        const strokeTexture = PIXI.RenderTexture.create({
            width: this.width,
            height: this.height
        })
        this.renderer.render(this.liveBrushStroke.container, { renderTexture: strokeTexture })
        const strokeSprite = new PIXI.Sprite(strokeTexture)
        this.renderer.render(this.container, { renderTexture: canvasTexture })
        const canvasSprite = new PIXI.Sprite(canvasTexture)

        this.clear()
        
        this.container.addChild(canvasSprite)
        this.undoStack.push(strokeSprite)
        this.redoStack = []

        this.shouldRender = false;
        this.render()
    }

    render() {
        this.renderer.render(this.container)
    }

    update() {
        if (this.shouldRender) this.render()
        requestAnimationFrame(this.update.bind(this))
    }
}