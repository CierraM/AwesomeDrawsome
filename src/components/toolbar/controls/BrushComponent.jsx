
import { Flex, SimpleGrid, Spacer, Switch, Text } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import SizeSlider from "./SizeSlider";
import ToolBarControl from "./ToolBarControl";
import TipChoices from "./TipChoices";
import { useAtom } from "jotai";

import { brushAtom } from "../../../store/atoms";
import { useState } from "react";

const BrushComponent = props => {
    const [brush, setBrush] = useAtom(brushAtom)
    const [drawPanelIsOpen, setDrawPanelIsOpen] = useState(false)

    const onBrushActivate = () => {
        if (!brush.isErasing) {
            setDrawPanelIsOpen(true)
        }
        setBrush(prev => brush.update({ isErasing: false }))
    }

    const onClose = () => {
        setDrawPanelIsOpen(false)
    }

    const pressureChoiceHandler = (e) => {
        setBrush(brush => brush.update({ sizePressure: !brush.sizePressure }))
    }


    return (

        <ToolBarControl
            icon={props.icon}
            color={brush.color}
            variant={props.variant}
            onClick={onBrushActivate}
            noClose={true}
            isOpen={drawPanelIsOpen}
            onClose={onClose}
        >

            <Flex>
                <ColorPicker />
                <Flex p="10px" direction="column">
                    <Text color="grey">Brush</Text>
                    <SimpleGrid columns="2" spacing="4">
                        <TipChoices onSelect={onClose}/>
                    </SimpleGrid>
                    <Spacer />
                    <Text color="grey">Size</Text>
                    <SizeSlider orientation="horizontal" w="100%" />
                </Flex>
                <Flex direction="column" m="10px">
                    <Text color="grey">Use Pressure?</Text>
                    <Switch mt="5px" _focus={{ outline: 0 }} size="lg" defaultChecked={true} onChange={pressureChoiceHandler} />
                </Flex>
            </Flex>
        </ToolBarControl>
    );
}

export default BrushComponent