import React from "react";

const BrushContext = React.createContext({
    color: '#fff',
    size: 5,
    opacity: 1,
})

export default BrushContext;