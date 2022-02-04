
import { Flex } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import SizeSlider from "./SizeSlider";
import ToolBarControl from "./ToolBarControl";
import { useAtom } from "jotai";
import { brushAtom, isErasingAtom } from "../../../store/atoms";

const BrushComponent = props => {
    const [brush] = useAtom(brushAtom)
    const [isErasing, setIsErasing] = useAtom(isErasingAtom)

    const brushChoiceHandler = () => {
        setIsErasing(false)
    }

    return (
        <ToolBarControl icon={props.icon} color={brush.color} variant={props.variant} onClick={brushChoiceHandler}>
            <Flex>
            <ColorPicker />
            <SizeSlider />
            </Flex>
        </ToolBarControl>
    );
}

export default BrushComponent