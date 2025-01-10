import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        category_name:""
    })

    useEffect(()=> {
        const fetchCategory = async () =>{
            try{
                let res = await axios.get(`http://127.0.0.1:8000/updateDeletecategory/${id}/`)
                let category = await res.data;
                setFormData(category)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchCategory()
    }, [id])

    const handleChange = (e) =>{
        const{name, value} = e.target;
        setFormData((items) => ({
            ...items,
            [name]: value
        }))
    }

    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/updateDeletecategory/${id}/`, formData);
    
            if (response.status === 200) { // Axios uses the status property
                toast.success("Category updated successfully");
                setFormData({ category_name: '' });
                setTimeout(() => {
                    navigate('/medicineadmin/categorylist');
                }, 3000);
            } else {
                toast.error("Update failed. Please try again");
            }
        } catch (err) {
            toast.error(`Update category failed: ${err.message}`);
        }
    };
    

  return (
       <>
        <ToastContainer theme='colored' position='top-center'/>
        <section className="ml-60">
        <div className="flex justify-between mb-5 -mt-80">
            <h2 className='text-2xl mx-3 font-bold'> Edit Category</h2>
            <h2 className='text-xl font-bold'>Dashboard/ <span className='text-green-600'>Edit category</span></h2>
        </div>
          <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif] shadow-lg shadow-blue-300" onSubmit={updateCategory}>
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm" htmlFor='category_name'>Category Name</label>
            <input 
        type="text" 
        name="category_name"
        placeholder="Enter your name"
        onChange={handleChange}
        value={formData.category_name}
        className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black" />
    
          </div>
    
          <button type="submit"
            className="!mt-8 px-6 py-2 w-full bg-green-400 hover:bg-[#444] text-sm text-white mx-auto block">Update</button>
        </form>
        </section>
     
        </>
  )
}

export default EditCategory
