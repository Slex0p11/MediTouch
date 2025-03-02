import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [data,setData] = useState({
        category_name:""

    })

    const navigate = useNavigate();
    
//handle changed input
    const handleChange = (event)=> {
        const {name,value} = event.target;
        setData((items)=>({
            ...items,
            [name]:value
        }))
    }

    const onsubmit = async(e) => {
        e.preventDefault()
        const formData  = new FormData();
        formData.append("category_name", data.category_name);
        try{
            const response = await axios.post('http://127.0.0.1:8000/createcategory/', formData)
            toast.success("Category Added Sucessfully!!")


            navigate('/medicineadmin/addcategory')
            setData({
                category_name:""
            })
        }
        catch(err){
            toast("Category Creation failed", err)
        }  
    
    }
    
  return (
    <>
    <ToastContainer theme='colored' position='top-center'/>
    <section className="ml-60">
    <div className="flex justify-between mb-5 -mt-80">
        <h2 className='text-2xl mx-3 font-bold text-blue-600'> Add Category</h2>
        <h2 className='text-xl font-bold'>Dashboard/ <span className='text-green-600'>Add category</span></h2>
    </div>
      <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif] shadow-lg shadow-blue-300" onSubmit={onsubmit}>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm" htmlFor='category_name'>Category Name</label>
        <input 
    type="text" 
    name="category_name"
    placeholder="Enter your name"
    onChange={handleChange}
    value={data.category_name}
    className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black" />

      </div>

      <button type="submit"
        className="!mt-8 px-6 py-2 w-full bg-green-400 hover:bg-[#444] text-sm text-white mx-auto block">Submit</button>
    </form>
    </section>
 
    </>
  )
}

export default AddCategory
