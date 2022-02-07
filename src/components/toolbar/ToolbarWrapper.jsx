import React from "react";
import {
    Box, Image, Flex, Spacer, Tooltip
} from "@chakra-ui/react";

import { FaPaintBrush, FaEraser, FaSave } from 'react-icons/fa'
import { IoArrowUndoSharp, IoArrowRedoSharp } from 'react-icons/io5'

import ToolBarControl from "./controls/ToolBarControl";
import { useAtom } from "jotai";

import logo from '../../assets/awesomeDrawsome-logo.png'
import BrushComponent from "./controls/BrushComponent";
import EraserComponent from "./controls/EraserComponent";
import { brushAtom } from "../../store/atoms";
import { izzy } from "../../izzy";

const ToolbarWrapper = (props) => {
    const [brush, setBrush] = useAtom(brushAtom)
    return (
        <Flex w="100%" h="80px" bg="#212121" p="10px" position='fixed' bottom='0px' align="center">
            <Box mr="30px">
                <BrushComponent icon={<FaPaintBrush />} variant={!brush.isErasing ? 'solid' : 'ghost'} />
                <EraserComponent icon={<FaEraser />} variant={brush.isErasing ? 'solid' : 'ghost'} color={brush.isErasing && 'grey'}/>
            </Box>
            <Spacer></Spacer>
            <Image src={logo} draggable="false" alt="logo" height="30px"></Image>
            <Spacer></Spacer>
            <Box mr="20px">
                <Tooltip label="undo">
                    <ToolBarControl icon={<IoArrowUndoSharp />} onClick={ () => izzy.undo()}/>
                </Tooltip>
                <Tooltip label="redo">
                    <ToolBarControl icon={<IoArrowRedoSharp />} onClick={() => izzy.redo()}/>
                </Tooltip>
            </Box>
            <ToolBarControl onClick={() => { izzy.exportToImage() }} icon={<FaSave />} />
        </Flex>
    )
}

export default ToolbarWrapper