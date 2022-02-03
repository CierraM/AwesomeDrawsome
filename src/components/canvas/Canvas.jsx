import { useEffect, useRef } from "react";
import { useKeys } from "rooks";
import { izzy } from "../../izzy/";

export default function Canvas({ width = 1920, height = 1080, brush }) {
// export default function Canvas({ width = 800, height = 600 }) {
    const canvasRef = useRef();

    useKeys(['ControlLeft', 'KeyZ'], () => izzy.undo())
    useKeys(['ControlLeft', 'KeyY'], () => izzy.redo())

    useEffect(() => {
        izzy.init(canvasRef.current, { width, height })
    }, [canvasRef])

    useEffect(() => {
        if (brush) izzy.setBrush(brush)
    }, [brush])

    return (
        <div style={{ height: '100%', display: 'grid' }}>
            {/* <canvas style={{ margin: 'auto', maxWidth: '100%', maxHeight: '100vh', imageRendering: 'pixelated' }} ref={canvasRef} /> */}
            <canvas style={{ margin: 'auto', maxWidth: '100%', maxHeight: 'calc(100vh - 80px)' }} ref={canvasRef} />
            {/* <canvas style={{ margin: 'auto', imageRendering: 'pixelated' }} ref={canvasRef} /> */}
        </div>
    );
}
