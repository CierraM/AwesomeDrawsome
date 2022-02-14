import ToolBarControl from "./ToolBarControl"
import {Box, ButtonGroup, Button, Text } from "@chakra-ui/react"
import { IoTrashBin } from "react-icons/io5"
import { useState } from "react"
import { izzy } from "../../../izzy"

const ClearScreenComponent = (props) => {
    const [panelIsOpen, setPanelIsOpen] = useState(false)

    const clearScreenHandler = () => {
        setPanelIsOpen(false)
        izzy.clear();
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
            <Box p="3" pt="6" maxW="200px">
                <Text >Delete everything and start over?</Text>
                <ButtonGroup>
                    <Button onClick={closePanelHandler}>Back</Button>
                    <Button onClick={ clearScreenHandler} bg="red" color="white" _hover={{color: 'lightgrey'}}>Delete</Button>
                </ButtonGroup>
            </Box>
                </ToolBarControl>
    )
}

export default ClearScreenComponent