import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'


const AdminLayout = () => {
  return (
    <>
      <Sidebar/>
      <Outlet/>
    </>
  )
}

export default AdminLayout
