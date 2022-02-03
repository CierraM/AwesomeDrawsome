import React, { useEffect, useState } from "react";
import ToolBarControl from "./ToolBarControl";
import { SketchPicker } from "react-color";
import { izzy } from "../../../izzy";

function rgbToHex(r, g, b) {
    return (r << 16) + (g << 8) + b
}

const ColorPicker = props => {
    const [color, setColor] = useState({ background: { r: 51, g: 51, b: 51, a: 1 } })
    const [colorString, setColorString] = useState("rgba(51, 51, 51, 1)");

    useEffect(() => {
        const { r, g, b, a } = color.background
        izzy.setBrush(izzy.brush.update({ color: rgbToHex(r, g, b), opacity: a }))
    }, [color])

    const handleChangeComplete = (color) => {
        setColorString(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
    };

    const handleChange = (color) => {
        setColor({ background: color.rgb });
    }

    return (
        <ToolBarControl icon={props.icon} variant="solid" color={colorString}>
            <SketchPicker
                color={color.background}
                onChangeComplete={handleChangeComplete}
                onChange={handleChange}
            />
        </ToolBarControl>
    )
}

export default ColorPicker