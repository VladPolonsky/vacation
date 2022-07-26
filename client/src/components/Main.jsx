import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AddVac from './AddVac'
import Login from './Login'
import Register from './Register'
import Vacations from './Vacations'


export default function Main() {
  return (
    <div className='main'>
        <Routes>
            <Route path="/vacations" element={<Vacations/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/add" element={<AddVac/>}/>
        </Routes>
        </div>
  )
}
