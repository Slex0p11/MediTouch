import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const medicinelist = () => {
    const [data,setData] =  useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/allmedicine')
        .then(res=>(
            setData(res.data)
        ))
        .catch(err=>console.log(err.message))
    }, [])

const deleteContact = async(id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this Medicine?");
    
    if (confirmDelete) {
        try {
             
            await axios.delete(`http://127.0.0.1:8000/updateDeletemedicine/${id}`);
            setData(data.filter((item) => item.id !== id));  
            toast.success("Medicine Deleted Successfully");
        } catch (e) {
            toast.error("Failed to Delete Medicine. Please try again");
        }
    }
     
}

  return (
    <>
      
<ToastContainer theme='colored' position='top-center' />
<div className="overflow-x-auto shadow-md sm:rounded-lg ml-60">
    <div className="flex justify-between mb-5 -mt-79">
        <h2 className='text-2xl mx-3 font-bold'>Medicine List</h2>
        <h2 className='text-xl font-bold'>Dashboard/ <span className='text-green-600'>medicine list</span></h2>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-9">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    Id
                </th>              
                <th scope="col" className="px-6 py-3">
                    Medicine name
                </th>
                <th scope="col" className="px-6 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {data.map((items)=>(
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={items.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {items.id}
              </th>
              <td className="px-6 py-4">
                  {items.medicine_name}
              </td>
              <td className="px-6 py-4">
                  <img src={items.image} alt={items.medicine_name} />
              </td>
              <td className="px-6 py-4">
                  {items.description}
              </td>
              <td className="px-6 py-4">
                  Rs. {items.price}
              </td>
              <td className="px-6 py-4">
                  {items.Category}
              </td>
              <td className="px-6 py-4">
                    <Link to="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link> &nbsp; &nbsp;
                    <Link to="#" className="font-medium text-blue-600 dark:text-red-500 hover:underline" 
                    onClick = {()=> deleteContact(items.id)}
                    >Delete</Link>
              </td>
              
          </tr>
            ))}
            
             
        </tbody>
    </table>
</div>

    </>
  )
}

export default medicinelist
