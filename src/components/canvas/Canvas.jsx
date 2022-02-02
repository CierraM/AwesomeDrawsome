import { useEffect, useRef } from "react";
import { izzy } from "../../izzy/main";

export default function Canvas({ width = 1600, height = 1200 }) {
    const canvasRef = useRef();

    useEffect(() => {
        izzy.init(canvasRef.current, { width, height })
    }, [canvasRef]);

    return (
        <div style={{ height: '100%', display: 'grid' }}>
            <canvas style={{ margin: 'auto', maxWidth: '100%', maxHeight: '100vh', imageRendering: 'pixelated' }} ref={canvasRef} />
        </div>
    );
}
