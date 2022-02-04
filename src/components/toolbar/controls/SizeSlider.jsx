import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect } from "react";
import { sizeAtom } from "../../../contexts/atoms"
import { izzy } from "../../../izzy";

const SizeSlider = props => {
    const [currentSize, setCurrentSize] = useAtom(sizeAtom);

    useEffect(() => {
        izzy.setBrush(izzy.brush.update({ size: currentSize }))
    }, [currentSize])

    const sizeChangeHandler = value => {
        setCurrentSize(value * 3);
    }
    return (
        <Box boxShadow={props.boxShadow}>
            <Slider orientation={props.orientation} onChange={sizeChangeHandler} w={props.w} h={props.h} m="10px auto" display="block">
            <SliderTrack>
                <SliderFilledTrack bg="#212121"/>
            </SliderTrack>
            <SliderThumb _focus={{ outline: 0}} bg="lightgrey"/>
            </Slider>
            </Box>
    )
}

export default SizeSlider