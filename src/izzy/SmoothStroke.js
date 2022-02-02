import { cardinalSpline, lerp } from "./util"

export class SmoothStroke {
    constructor() {
        this.points = []
        this.ignorePointThreshold = 3
        this.spacing = 1.4
    }

    addPoint(x, y) {
        // Add new point
        const point = new Point(x, y)
        // Ignore new point if the distance to lastPoint is less than the threshold
        if (this.points.length) {
            if (point.distanceTo(this.points[this.points.length - 1]) <= this.ignorePointThreshold) return []
        }
        this.points.push(point)

        if (this.points.length === 1) {
            const A = this.points[this.points.length - 1]
            return this._makeDot(A)
        }
        if (this.points.length === 2 || this.points.length === 3) {
            const A = this.points[this.points.length - 2]
            const B = this.points[this.points.length - 1]
            return this._makeLine(A, B)
        }

        const A = this.points[this.points.length - 4]
        const B = this.points[this.points.length - 3]
        const C = this.points[this.points.length - 2]
        const D = this.points[this.points.length - 1]
        return this._makeCurve(A, B, C, D)
    }

    _makeDot(point) {
        return [point]
    }

    _makeLine(A, B) {
        const distance = A.distanceTo(B)
        const steps = distance * this.spacing

        const interpolatedPoints = []
        for (let i = 0; i < steps; i++) {
            const x = lerp(A.x, B.x, i / (steps - 1))
            const y = lerp(A.y, B.y, i / (steps - 1))
            interpolatedPoints.push({ x, y })
        }
        return interpolatedPoints
    }

    _makeCurve(A, B, C, D) {
        const distance = B.distanceTo(C)
        const steps = distance * this.spacing
        const interpolatedPoints = []
        for (let i = 0; i < steps; i++) {
            const point = cardinalSpline(i / (steps - 1), 0.5, A, B, C, D)
            interpolatedPoints.push(point)
        }
        return interpolatedPoints
    }
}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    distanceTo(point) {
        return Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2)
    }
}