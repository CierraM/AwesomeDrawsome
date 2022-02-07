import ToolBarControl from "./ToolBarControl"
import SizeSlider from "./SizeSlider"
import { useAtom } from "jotai"
import { isErasingAtom } from "../../../store/atoms"

const EraserComponent = (props) => {
    const [isErasing, setIsErasing] = useAtom(isErasingAtom)

    const eraserChoiceHandler = () => {
        setIsErasing(true)
    }
    return (
        <ToolBarControl icon={props.icon} onClick={eraserChoiceHandler} variant={props.variant}>
            <SizeSlider />
        </ToolBarControl>
    )
}

export default EraserComponent