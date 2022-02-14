import ToolBarControl from "./ToolBarControl"
import {Box, ButtonGroup, Button, Text, Flex } from "@chakra-ui/react"
import { IoTrashBin } from "react-icons/io5"
import { useState } from "react"
import { izzy } from "../../../izzy"

const ClearScreenComponent = (props) => {
    const [panelIsOpen, setPanelIsOpen] = useState(false)

    const clearScreenHandler = () => {
        setPanelIsOpen(false)
        izzy.clear();
        izzy.render();
    }

    const closePanelHandler = () => {
        setPanelIsOpen(false)
    }

    const onClose = () => {
        setPanelIsOpen(false)
    }

    const openPanel = () => {
        setPanelIsOpen(true)
    }

    return (
        <ToolBarControl icon={<IoTrashBin />} color="red" isOpen={panelIsOpen} onClose={onClose} onClick={openPanel}>
            <Box p="4" pt="6">
                <Text pb="3" pt="2">Delete everything and start over?</Text>
                <Flex>
                <ButtonGroup ml="auto">
                    <Button onClick={closePanelHandler}>Back</Button>
                    <Button onClick={ clearScreenHandler} bg="red" color="white" _hover={{color: 'lightgrey'}}>Clear Screen</Button>
                    </ButtonGroup>
                    </Flex>
            </Box>
                </ToolBarControl>
    )
}

export default ClearScreenComponent