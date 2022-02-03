import React from "react";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverCloseButton
} from "@chakra-ui/react"


const ToolBarControl = props => {
    console.log(props.color)
    return (
        <Popover position="top-start">
            <PopoverTrigger
            >
                <IconButton
                    m={1}
                    icon={props.icon}
                    isRound="true"
                    fontSize="24px"
                    size={props.size || 'lg'}
                    variant={props.variant || "ghost"}
                    color={props.color || "teal.200"}
                    _hover={{ color: props.color || "teal.500", bg: "white" }}
                    _focus={{ outline: 0}}
                />
            </PopoverTrigger>
            <PopoverContent w="auto" border="none" _focus={{ outline: 0}}>
            <PopoverCloseButton />
                {props.children}
            </PopoverContent>
        </Popover>
    )
}

export default ToolBarControl;