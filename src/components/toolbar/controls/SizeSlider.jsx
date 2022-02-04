import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect } from "react";
import { sizeAtom } from "../../../contexts/atoms"
import { izzy } from "../../../izzy";

const SizeSlider = props => {
    const [currentSize, setCurrentSize] = useAtom(sizeAtom);

    useEffect(() => {
        izzy.setBrush(izzy.brush.update({ size: currentSize }))
        console.log(currentSize)
    }, [currentSize])

    const sizeChangeHandler = value => {
        setCurrentSize(value* 3);
    }
    return (
        <Box mt="25px" ml="10px" mr="10px" mb="10px">
        <Slider orientation="vertical" onChange={sizeChangeHandler}>
            <SliderTrack>
                <SliderFilledTrack bg="#212121"/>
            </SliderTrack>
            <SliderThumb _focus={{ outline: 0}} bg="lightgrey"/>
            </Slider>
            </Box>
    )
}

export default SizeSlider