import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [data, setData] = useState({
        category_name: ""
    });

    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((items) => ({
            ...items,
            [name]: value
        }));
    };

    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("category_name", data.category_name);
        try {
            const response = await axios.post('http://127.0.0.1:8000/createcategory/', formData);
            toast.success("Category Added Successfully!!");
            navigate('/medicineadmin/addcategory');
            setData({ category_name: "" });
        } catch (err) {
            toast.error("Category Creation failed");
        }
    };
    
    return (
        <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center">
            <ToastContainer theme='colored' position='top-center'/>
            
            <div className="max-w-2xl w-full mr-1 ml-20">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <h1 className="text-2xl font-bold text-white">Add New Category</h1>
                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            <span className="text-blue-200">Dashboard</span>
                            <span className="text-white">/</span>
                            <span className="text-white font-semibold">Add Category</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-6 p-8 bg-white rounded-b-xl shadow-xl shadow-blue-200 border border-blue-100" onSubmit={onsubmit}>
                    <div className="flex flex-col space-y-2">
                        <label className="text-blue-800 font-medium" htmlFor='category_name'>Category Name</label>
                        <input 
                            type="text" 
                            name="category_name"
                            placeholder="Enter category name"
                            onChange={handleChange}
                            value={data.category_name}
                            className="px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white" 
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;