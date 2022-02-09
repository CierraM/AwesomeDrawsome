import { Fragment } from "react";
import { izzy } from "../../../izzy";
import { Image } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { brushAtom } from "../../../store/atoms";

const TipChoices = (props) => {
    const [brush, setBrush] = useAtom(brushAtom)
    
    const tipChoices = izzy.getBrushTips().map(tip => {
        const setBrushTip = (e) => {
            setBrush(prev => brush.update({ tipId: tip.id }))
            props.onSelect()
        }
        return (
            <Image
                src={tip.url}
                key={tip.id}
                maxW="5rem"
                borderRadius="100%"
                filter="invert(1)"
                cursor="pointer"
                onClick={setBrushTip}
            ></Image>
        )
    })

    return <Fragment>
        {tipChoices}
    </Fragment>
}

export default TipChoices;