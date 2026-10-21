import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import "../App.css"
import Sidebar from './Sidebar'
const Layout = () => {
  return (
    <>
        <Navbar/>
        <div className='layoutbody'>
        <Sidebar/>
        <div className='content'>
        <Outlet/>
        </div>
        </div>
    </>
  )
}

export default Layout