import React, { useEffect, useState } from "react";
import ToolBarControl from "./ToolBarControl";
import { SketchPicker } from "react-color";
import { izzy } from "../../../izzy";
import '../../../main.css'
import { useAtom } from "jotai";
import {colorAtom} from '../../../contexts/atoms'

const ColorPicker = props => {
    const [color, setColor] = useState({ background: { r: 51, g: 51, b: 51, a: 1 } })

    const [currentColor, setCurrentColor] = useAtom(colorAtom)

    useEffect(() => {
        const { r, g, b, a } = color.background
        izzy.setBrush((brush) => brush.update({ color: `#${r}${g}${b}`, opacity: a }))
        setCurrentColor(`rgba(${r}, ${g}, ${b}, ${a})`)
    }, [color])

    const handleChange = (color) => {
        setColor({ background: color.rgb });
    }

    return (
            <SketchPicker
            color={color.background}
            onChange={handleChange}
            className="no-shadow"
            />
    )
}

export default ColorPicker