
import Canvas from './components/canvas/Canvas'

import { ChakraProvider } from '@chakra-ui/react'
import ToolbarWrapper from './components/toolbar/ToolbarWrapper'
import { Provider } from "jotai";

function App() {


  return (
    <Provider>
      <ChakraProvider>
        <Canvas />
        <ToolbarWrapper></ToolbarWrapper>
      </ChakraProvider>
      </Provider>
  )

}

export default App
