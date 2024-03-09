import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Dashboard'
import CryptoPage from './Cryptopage'

function Navbar() {
  return (
    <div>
<Routes>
    <Route path='/' element={<Dashboard/>}/>
<Route path='/crypto/:id' element={<CryptoPage/>}/>

</Routes>

    </div>
  )
}

export default Navbar