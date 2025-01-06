import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/UserComponents/Layout'
import Homepages from './pages/UserPages/Homepages'
import AdminLayout from './components/AdminComponent/AdminLayout'
import Dashboard from './pages/AdminPages/Dashboard'
import Medicinelist from './pages/AdminPages/medicinelist'
import AddMedicine from './pages/AdminPages/AddMedicine'
import Categorylist from './pages/AdminPages/Categorylist'
import AddCategory from './pages/AdminPages/AddCategory'
import EditCategory from './pages/AdminPages/EditCategory'
import EditMedicine from './pages/AdminPages/EditMedicine'

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
                <Route path='addmedicine' element={<AddMedicine/>}/>
                <Route path='editmedicine/:id' element={<EditMedicine/>}/>

                <Route path='categorylist' element={<Categorylist/>}/>
                <Route path='addcategory' element={<AddCategory/>}/>
                <Route path='editcategory/:id' element={<EditCategory/>}/>
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default Myroutes
