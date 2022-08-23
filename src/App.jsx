import { useState } from 'react'
import { Button } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Button>Click Here</Button>
    </div>
  )
}

export default App
