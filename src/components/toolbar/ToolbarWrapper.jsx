import React from "react";
import {
    Box, Image, Flex, Spacer
} from "@chakra-ui/react";

import { FaPaintBrush, FaEraser, FaSave } from 'react-icons/fa'
import { VscCircleLargeFilled } from 'react-icons/vsc'

import ToolBarControl from "./controls/ToolBarControl";
import ColorPicker from "./controls/ColorPicker"


import logo from '../../assets/awesomeDrawsome-logo.png'

const ToolbarWrapper = (props) => {
    return (
        <Flex w="100%" h="80px" bg="#212121" p="10px" position='fixed' bottom='0px' align="center">
            <Box mr="30px">
                <ToolBarControl icon={<FaPaintBrush />} />
                <ToolBarControl icon={<FaEraser />} />
            </Box>
            <ColorPicker icon={<VscCircleLargeFilled />} />
            <Spacer></Spacer>
            <Image src={logo} draggable="false" alt="logo" height="30px" ml="-30px"></Image>
            <Spacer></Spacer>
            <ToolBarControl icon={<FaSave />} />
        </Flex>
    )
}

export default ToolbarWrapper