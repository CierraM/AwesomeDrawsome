import ToolBarControl from "./ToolBarControl"
import SizeSlider from "./SizeSlider"
import { useAtom } from "jotai"
import { brushAtom } from "../../../store/atoms"

const EraserComponent = (props) => {
    const [brush, setBrush] = useAtom(brushAtom);

    const eraserChoiceHandler = () => {
        setBrush(brush => brush.update({isErasing: !brush.isErasing}))
    }
    return (
        <ToolBarControl icon={props.icon} onClick={eraserChoiceHandler} variant={props.variant} color={props.color} w="20px" h="200px" noClose={true}>
            <SizeSlider orientation="vertical" h="200px" w="40px" boxShadow="base"/>
        </ToolBarControl>
    )
}

export default EraserComponent