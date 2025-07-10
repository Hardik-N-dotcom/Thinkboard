import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Create from './pages/Create'
import Notedetail from './pages/Notedetail'

const App = () => {

  return (
    <div className="relative h-full w-full">
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/note/:id' element={<Notedetail/>} />
        
      </Routes>
      </div>

    
  )
}

export default App