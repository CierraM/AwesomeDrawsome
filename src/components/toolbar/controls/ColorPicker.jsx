import React, { useState } from "react";
import { SketchPicker } from "react-color";
import '../../../main.css'
import { useAtom } from "jotai";
import { brushAtom } from '../../../store/atoms'

const ColorPicker = () => {
    const [brush, setBrush] = useAtom(brushAtom)
    const [color, setColor] = useState(brush.color)

    // Runs when user releases mouse button
    const handleChangeComplete = (color) => {
        setBrush(brush => brush.update({ color: color.hex, opacity: color.rgb.a }))
    }

    return (
        <SketchPicker
            color={color.rgb}
            onChange={setColor}
            onChangeComplete={handleChangeComplete}
            className="no-shadow"
        />
    )
}

export default ColorPicker