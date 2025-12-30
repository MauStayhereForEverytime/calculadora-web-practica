import { useState } from 'react'
import Login from './pages/Login'
import Calculator from './pages/Calculator'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLoginSuccess = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <>
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Calculator user={user} onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
