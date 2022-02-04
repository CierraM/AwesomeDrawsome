import React from "react";
import {
    IconButton,
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverCloseButton
} from "@chakra-ui/react"


const ToolBarControl = (props) => {
    return (
        <Popover position="top-start" {...props }>
            <PopoverTrigger
            >
                <IconButton
                    m={1}
                    icon={props.icon}
                    isRound="true"
                    fontSize="24px"
                    size={props.size || 'lg'}
                    variant={props.variant || "ghost"}
                    color={props.color || "white"}
                    _hover={{ color: props.color || "grey", bg: "white" }}
                    _focus={{ outline: 0 }}
                    onClick={props.onClick}
                />
            </PopoverTrigger>
            <PopoverContent w="auto" border="none" _focus={{ outline: 0}} boxShadow="md">
                {props.noClose || <PopoverCloseButton />}
                {props.children}
            </PopoverContent>
        </Popover>
    )
}

export default ToolBarControl;