import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/UserComponents/Layout'
import Homepages from './pages/UserPages/Homepages'

const Myroutes = () => {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Homepages/>}/>

            
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default Myroutes
