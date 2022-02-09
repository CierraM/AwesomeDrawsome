import ToolBarControl from "./ToolBarControl"
import SizeSlider from "./SizeSlider"
import { useAtom } from "jotai"
import { brushAtom } from "../../../store/atoms"
import { useState } from "react"

const EraserComponent = (props) => {
    const [brush, setBrush] = useAtom(brushAtom);
    const [eraserPanelIsOpen, setEraserPanelIsOpen] = useState(false);

    const eraserChoiceHandler = () => {
        if (brush.isErasing) {
            setEraserPanelIsOpen(true)
        }  

        setBrush(brush => brush.update({isErasing: true}))
    }

    const onClose = () => {
        setEraserPanelIsOpen(false)
    }

    return (
        <ToolBarControl
            icon={props.icon}
            onClick={eraserChoiceHandler}
            variant={props.variant}
            color={props.color}
            w="20px"
            h="200px"
            noClose={true}
            isOpen={eraserPanelIsOpen}
            onClose={onClose}
        >
            <SizeSlider orientation="vertical" h="200px" w="40px" boxShadow="base"/>
        </ToolBarControl>
    )
}

export default EraserComponent