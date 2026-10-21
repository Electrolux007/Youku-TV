import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Landingpage from './Components/Landingpage'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element= {<Layout/>}>
      <Route index element= {<Landingpage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App