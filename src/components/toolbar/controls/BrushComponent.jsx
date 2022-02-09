
import { Flex, Box, Grid, SimpleGrid, Image, Spacer, Switch, Text } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import SizeSlider from "./SizeSlider";
import ToolBarControl from "./ToolBarControl";
import { useAtom } from "jotai";
import { izzy } from "../../../izzy";
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

    const tipChoices = izzy.getBrushTips().map(tip => {
        return <Image src={tip.url} key={tip.id} maxW="5rem" borderRadius="100%" filter="invert(1)"></Image>
    })

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
                        {tipChoices}
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