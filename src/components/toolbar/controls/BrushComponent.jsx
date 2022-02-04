
import { Flex } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import SizeSlider from "./SizeSlider";
import ToolBarControl from "./ToolBarControl";
import { useContext } from "react";
import { useAtom } from "jotai";
import { colorAtom } from "../../../contexts/atoms";

const BrushComponent = props => {
    const [currentColor, setCurrentColor] = useAtom(colorAtom)
    return (
        <ToolBarControl icon={props.icon} color={currentColor} variant="solid">
            <Flex>
            <ColorPicker />
            <SizeSlider />
            </Flex>
        </ToolBarControl>
    );
}

export default BrushComponent