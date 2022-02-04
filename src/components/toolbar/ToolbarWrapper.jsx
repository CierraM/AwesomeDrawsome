import React from "react";
import {
    Box, Image, Flex, Spacer
} from "@chakra-ui/react";

import { FaPaintBrush, FaEraser, FaSave } from 'react-icons/fa'

import ToolBarControl from "./controls/ToolBarControl";
import { useAtom } from "jotai";

import logo from '../../assets/awesomeDrawsome-logo.png'
import BrushComponent from "./controls/BrushComponent";
import EraserComponent from "./controls/EraserComponent";
import { isErasingAtom } from "../../store/atoms";

const ToolbarWrapper = (props) => {
    const [isErasing, setIsErasing] = useAtom(isErasingAtom)
    return (
        <Flex w="100%" h="80px" bg="#212121" p="10px" position='fixed' bottom='0px' align="center">
            <Box mr="30px">
                <BrushComponent icon={<FaPaintBrush />} variant={!isErasing ? 'solid' : 'ghost'} />
                <EraserComponent icon={<FaEraser />} variant={isErasing ? 'solid' : 'ghost'} />
            </Box>
            <Spacer></Spacer>
            <Image src={logo} draggable="false" alt="logo" height="30px" ml="-30px"></Image>
            <Spacer></Spacer>
            <ToolBarControl icon={<FaSave />} />
        </Flex>
    )
}

export default ToolbarWrapper