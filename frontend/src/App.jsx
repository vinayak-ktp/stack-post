import React from 'react'
import Home from './Pages/Home/Home'
import { Outlet } from 'react-router-dom'
import { UserContextProvider } from './contexts/UserContext'

const App = () => {
  return (
    <UserContextProvider>
      <Home />
    </UserContextProvider>
  )
}

export default App