import React, {useState} from "react";
import {
   MenuItem, PopoverContent
} from "@chakra-ui/react"
import ToolBarControl from "./ToolBarControl";
import { SketchPicker } from "react-color";


const ColorPicker = props => {
    const [color, setColor] = useState({ background: { r: 51, g: 51, b: 51 }})
    const [colorString, setColorString] = useState("rgba(51, 51, 51, 1)");

     const handleChangeComplete = (color) => {
         setColor({ background: color.rgb });
         setColorString(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
      };
    
    return (
        <ToolBarControl icon={props.icon} variant="solid" color={colorString} size="md">
            <SketchPicker
                color={color.background}
                onChangeComplete={handleChangeComplete}
            />
        </ToolBarControl>
    )
}

export default ColorPicker