import BrushContext from "./brush-context";
import { useState } from "react";

const BrushProvider = (props) => {

    const brushContext = {
        color: '#fff',
        size: 5,
        opacity: 1,
    }

    return (
        <BrushContext.Provider value={brushContext}>
            {props.children}
        </BrushContext.Provider>
    )
}

export default BrushProvider;