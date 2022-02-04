
import Canvas from './components/canvas/Canvas'

import { ChakraProvider } from '@chakra-ui/react'
import ToolbarWrapper from './components/toolbar/ToolbarWrapper'
import { Provider, useAtom } from "jotai";
import { useEffect } from 'react';
import { brushAtom } from './store/atoms';
import { izzy } from './izzy';

function App() {
  const [brush] = useAtom(brushAtom)

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
