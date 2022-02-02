import React from "react";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react"


const ToolBarControl = props => {
    return (
        <Menu>
            <MenuButton
                m={1}
                as={IconButton}
                icon={props.icon}
                isRound="true"
                fontSize="24px"
                size="lg"
                variant="ghost"
                color="teal.200"
                _hover={{ color: "teal.500", bg: "white"}}
                >
            </MenuButton>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ToolBarControl;