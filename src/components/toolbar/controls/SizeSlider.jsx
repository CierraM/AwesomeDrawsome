import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { brushAtom } from "../../../store/atoms"

const SizeSlider = (props) => {
    const [brush, setBrush] = useAtom(brushAtom)

    const sizeChangeHandler = size => {
        setBrush(brush => brush.update({ size }))
    }

    return (

        <Box mt="25px" ml="10px" mr="10px" mb="10px" boxShadow={props.boxShadow}>
            <Slider min={1} max={300} orientation={props.orientation} value={brush.size} onChange={sizeChangeHandler} w={props.w} h={props.h} m="10px auto" display="block">
                <SliderTrack>
                    <SliderFilledTrack bg="#212121" />
                </SliderTrack>
                <SliderThumb _focus={{ outline: 0 }} bg="lightgrey" />
            </Slider>
        </Box>
    )
}

export default SizeSlider