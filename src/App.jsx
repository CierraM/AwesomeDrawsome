import { useState } from 'react'
import './App.css'
import Canvas from './components/canvas/Canvas'

function App() {
  const [count, setCount] = useState(0)

  return <Canvas />
}

export default App
