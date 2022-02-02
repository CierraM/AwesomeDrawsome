export function lerp(start, end, percent) {
    return start * (1 - percent) + end * percent
}

// https://devblogs.microsoft.com/cppblog/project-austin-part-3-of-6-ink-smoothing/
export function cardinalSpline(t, L, p1, p2, p3, p4) {
    const x = (2 * t ** 3 - 3 * t ** 2 + 1) * p2.x + (-2 * t ** 3 + 3 * t ** 2) * p3.x + (t ** 3 - 2 * t ** 2 + t) * L * (p3.x - p1.x) + (t ** 3 - t ** 2) * L * (p4.x - p2.x)
    const y = (2 * t * t * t - 3 * t * t + 1) * p2.y + (-2 * t * t * t + 3 * t * t) * p3.y + (t * t * t - 2 * t * t + t) * L * (p3.y - p1.y) + (t * t * t - t * t) * L * (p4.y - p2.y)
    return { x, y }
}