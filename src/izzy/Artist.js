export class Artist {
    constructor(izzy) {
        this.pointerDown = false
        this.izzy = izzy
    }

    _getRelativePointerPosition(event) {
        const rect = this.izzy.ref.getBoundingClientRect()
        return {
            x: (event.clientX - rect.left),
            y: (event.clientY - rect.top)
        }
    }

    init() {
        // Add event listners
        this.izzy.ref.addEventListener('pointerdown', (e) => {
            const { x, y } = this._getRelativePointerPosition(e)

            this.pointerDown = true
            this.izzy.beginBrushStroke()
            this.izzy.addBrushNode(x, y, e.pressure)
        })
        this.izzy.ref.addEventListener('pointerup', () => {
            this.pointerDown = false
            this.izzy.endBrushStroke()
        })
        this.izzy.ref.addEventListener('pointermove', (e) => {
            if (this.pointerDown) {
                let { x, y } = this._getRelativePointerPosition(e)
                this.izzy.addBrushNode(x, y, e.pressure)
            }
        })
    }
}