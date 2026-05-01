import { useState } from 'react'
import './App.css'
import Login from './pages/Login.jsx'

function App() {
  const [token, setToken] = useState(null)

  console.log(token);

  return (
    <Login setToken={setToken} />
  )
}

export default App
