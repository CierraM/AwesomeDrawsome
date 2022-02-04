
import { Flex } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import SizeSlider from "./SizeSlider";
import ToolBarControl from "./ToolBarControl";
import { useContext } from "react";
import { useAtom } from "jotai";
import { colorAtom, isErasingAtom } from "../../../contexts/atoms";

const BrushComponent = props => {
    const [currentColor, setCurrentColor] = useAtom(colorAtom)
    const [isErasing, setIsErasing] = useAtom(isErasingAtom)

    const brushChoiceHandler = () => {
        setIsErasing(false)
    }

    return (
        <ToolBarControl icon={props.icon} color={currentColor} variant={props.variant} onClick={brushChoiceHandler}>
            <Flex>
            <ColorPicker />
            <SizeSlider />
            </Flex>
        </ToolBarControl>
    );
}

export default BrushComponent