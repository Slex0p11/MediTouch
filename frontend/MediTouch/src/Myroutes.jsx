import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/UserComponents/Layout'
import Homepages from './pages/UserPages/Homepages'
import AdminLayout from './components/AdminComponent/AdminLayout'
import Dashboard from './pages/AdminPages/Dashboard'
import Medicinelist from './pages/AdminPages/medicinelist'

const Myroutes = () => {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Homepages/>}/>

            
            </Route>
            <Route path='/medicineadmin/' element={<AdminLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='medicinelist' element={<Medicinelist/>}/>
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default Myroutes
