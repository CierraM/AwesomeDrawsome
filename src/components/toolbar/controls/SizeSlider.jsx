import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { brushAtom } from "../../../store/atoms"

const SizeSlider = () => {
    const [brush, setBrush] = useAtom(brushAtom)

    const sizeChangeHandler = size => {
        setBrush(brush => brush.update({ size }))
    }

    return (
        <Box mt="25px" ml="10px" mr="10px" mb="10px">
            <Slider min={1} max={300} orientation="vertical" value={brush.size} onChange={sizeChangeHandler}>
                <SliderTrack>
                    <SliderFilledTrack bg="#212121" />
                </SliderTrack>
                <SliderThumb _focus={{ outline: 0 }} bg="lightgrey" />
            </Slider>
        </Box>
    )
}

export default SizeSlider