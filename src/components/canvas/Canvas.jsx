import { useEffect, useRef } from "react";
import { useKeys } from "rooks";
import { izzy } from "../../izzy/";
import '../../main.css'
export default function Canvas({ width = 1920, height = 1080 }) {
    const canvasRef = useRef();


    useKeys(['ControlLeft', 'KeyZ'], () => izzy.undo())
    useKeys(['ControlLeft', 'KeyY'], () => izzy.redo())

    useEffect(() => {
        izzy.init(canvasRef.current, { width, height })
    }, [canvasRef])

    return (
        <div style={{ height: '100%', display: 'grid' }}>
            <canvas style={{ margin: 'auto', maxWidth: '100%', maxHeight: 'calc(100vh - 80px)' }} ref={canvasRef} className="canvas"/>
        </div>
    );
}
