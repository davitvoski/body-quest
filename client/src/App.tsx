import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(res => setData(res.message))
  }, [])

  return (
    <div className="App">
      <h1>{data}</h1>
    </div>
  )
}

export default App
