import React from "react";
import {
    Box, Image, Flex, Spacer, Center, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Icon,
    
} from "@chakra-ui/react";

import { FaPaintBrush, FaEraser, FaSave } from 'react-icons/fa'
import { IoIosColorPalette } from 'react-icons/io'

import ToolBarControl from "./ToolBarControl";
 

const ToolbarWrapper = (props) => {
    return (
        <Flex w="100%" h="80px" bg="#212121" p="10px" position='fixed' bottom='0px' align="center">  
            <ToolBarControl icon={ <FaPaintBrush />}/>
            <ToolBarControl icon={ <FaEraser />} />
            <Spacer></Spacer>
            <Image src="/src/assets/awesomeDrawsome-logo.png" alt="logo" height="30px"></Image>
            <Spacer></Spacer>
            <ToolBarControl icon={ <FaSave />} />   
            <ToolBarControl icon={ <IoIosColorPalette />} />   
        </Flex>
    )
}

export default ToolbarWrapper