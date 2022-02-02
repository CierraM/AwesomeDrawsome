
import { ChakraProvider } from '@chakra-ui/react'
import ToolbarWrapper from './components/toolbar/ToolbarWrapper'

function App() {

  return (
    <ChakraProvider>
      <ToolbarWrapper></ToolbarWrapper>
    </ChakraProvider>
  )
}

export default App
