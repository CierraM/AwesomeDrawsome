
import Canvas from './components/canvas/Canvas'

import { ChakraProvider } from '@chakra-ui/react'
import ToolbarWrapper from './components/toolbar/ToolbarWrapper'


function App() {


  return (
    <ChakraProvider>
      <Canvas />
      <ToolbarWrapper></ToolbarWrapper>
    </ChakraProvider>
  )

}

export default App
