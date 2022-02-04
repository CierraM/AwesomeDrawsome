
import { Flex, Box, Grid, SimpleGrid, Image, Spacer, Switch, Text} from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import SizeSlider from "./SizeSlider";
import ToolBarControl from "./ToolBarControl";
import { useContext } from "react";
import { useAtom } from "jotai";
import { colorAtom, isErasingAtom, usePressureAtom } from "../../../contexts/atoms";

const BrushComponent = props => {
    const [currentColor, setCurrentColor] = useAtom(colorAtom)
    const [isErasing, setIsErasing] = useAtom(isErasingAtom)
    const [isUsePressure, setIsUsePressure] = useAtom(usePressureAtom)

    const brushChoiceHandler = () => {
        setIsErasing(false)
    }

    const pressureChoiceHandler = (e) => {
        setIsUsePressure(e.target.checked)
    }

    return (
        <ToolBarControl icon={props.icon} color={currentColor} variant={props.variant} onClick={brushChoiceHandler} noClose={true}>
            <Flex>
                <ColorPicker />
                <Flex p="10px" direction="column">
                    <Text color="grey">Brush</Text>
                    <SimpleGrid columns="4" spacing="5">
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40" />
                        <Image src="https://picsum.photos/40/40"/>
                    </SimpleGrid>
                    <Spacer />
                    <Text color="grey">Size</Text>
                    <SizeSlider orientation="horizontal" w="100%" />
                </Flex>
                <Flex direction="column" m="10px">
                    <Text color="grey">Use Pressure?</Text>
                    <Switch mt="5px" _focus={{ outline: 0 }} size="lg" defaultChecked={true} onChange={pressureChoiceHandler}/>
                </Flex>
            </Flex>
        </ToolBarControl>
    );
}

export default BrushComponent