import Canvas from './components/canvas/Canvas'
import ToolbarWrapper from './components/toolbar/ToolbarWrapper'
import { useEffect } from 'react'
import { izzy } from './izzy'

function App() {

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    }, [])

    const alertUser = (e) => {
        if (!izzy.isDirty()) return
        e.preventDefault()
        e.returnValue = ''
    }

    return (
        <>
            <Canvas />
            <ToolbarWrapper></ToolbarWrapper>
        </>
    )
}

export default App
