import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMedicine = () => {
  return (
    <>
    <section className="ml-60">
    <div className="flex justify-between mb-5 -mt-80">
        <h2 className='text-2xl mx-3 font-bold'>Add Medicine</h2>
        <h2 className='text-xl font-bold'>Dashboard/ <span className='text-green-600'>Add medicine</span></h2>
    </div>
      <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif] shadow-lg shadow-blue-300">
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Id</label>
        <input type="text" placeholder="Enter the ID"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black" />
      </div>

      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Medicine Name</label>
        <input type="email" placeholder="Enter the name"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black" />
      </div>

      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Price</label>
        <input type="number" placeholder="Enter the Price"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black" />
      </div>
       
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Category</label>
        <input type="number" placeholder="Enter the Price"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black" />
      </div>
      

      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Description</label>
        <input type="text" placeholder="Enter the Description"
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black" />
      </div>
      <div className="flex items-center">
  <label className="text-gray-400 w-36 text-sm">Medicine Image</label>
  <input 
    type="file" 
    accept="image/*" 
    className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black file:mr-2 file:py-1 file:px-3 file:rounded file:border-none file:bg-gray-200 file:text-sm file:text-black" 
  />
</div>

      <button type="button"
        className="!mt-8 px-6 py-2 w-full bg-green-400 hover:bg-[#444] text-sm text-white mx-auto block">Submit</button>
    </form>
    </section>
 
    </>
  )
}

export default AddMedicine
