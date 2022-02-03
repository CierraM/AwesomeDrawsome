// https://easings.net/
export const Easing = {
    linear: x => x,
    easeInQuad: x => x * x,
    easeOutQuad: x => 1 - (1 - x) * (1 - x),
    easeInOutQuad: x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2,
    easeInCubic: x => x * x * x,
    easeOutCubic: x => 1 - Math.pow(1 - x, 3),
    easeInOutCubic: x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    easeInQuart: x => x * x * x * x,
    easeOutQuart: x => 1 - Math.pow(1 - x, 4),
    easeInOutQuart: x => x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
    easeInQuint: x => x * x * x * x * x,
    easeOutQuint: x => 1 - Math.pow(1 - x, 5),
    easeInOutQuint: x => x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2,
    easeInExpo: x => x === 0 ? 0 : Math.pow(2, 10 * x - 10),
    easeOutExpo: x => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
    easeInOutExpo: x => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
    easeInCirc: x => 1 - sqrt(1 - Math.pow(x, 2)),
    easeOutCirc: x => sqrt(1 - Math.pow(x - 1, 2)),
    easeInOutCirc: x => x < 0.5 ? (1 - sqrt(1 - Math.pow(2 * x, 2))) / 2 : (sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2,
    easeInBack: x => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: x => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    },
    easeInOutBack: x => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return x < 0.5
            ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }
}

export function clamp(value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
}

export function lerp(start, end, percent) {
    return start * (1 - percent) + end * percent
}

// https://devblogs.microsoft.com/cppblog/project-austin-part-3-of-6-ink-smoothing/
export function cardinalSpline(t, L, p1, p2, p3, p4) {
    const x = (2 * t ** 3 - 3 * t ** 2 + 1) * p2.x + (-2 * t ** 3 + 3 * t ** 2) * p3.x + (t ** 3 - 2 * t ** 2 + t) * L * (p3.x - p1.x) + (t ** 3 - t ** 2) * L * (p4.x - p2.x)
    const y = (2 * t * t * t - 3 * t * t + 1) * p2.y + (-2 * t * t * t + 3 * t * t) * p3.y + (t * t * t - 2 * t * t + t) * L * (p3.y - p1.y) + (t * t * t - t * t) * L * (p4.y - p2.y)
    return { x, y }
}