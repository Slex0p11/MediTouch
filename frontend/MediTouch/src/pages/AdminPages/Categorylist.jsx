import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Categorylist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/category')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Category?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/updateDeletecategory/${id}/`);
        setData(data.filter((item) => item.id !== id));
        toast.success("Category Deleted Successfully");
      } catch (e) {
        toast.error("Failed to Delete Category. Please try again");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <ToastContainer theme="colored" position="top-center" />
      
      {/* Larger Container */}
      <div className="max-w-5xl mr-32 ml-auto bg-white rounded-xl shadow-2xl shadow-blue-200 overflow-hidden">
        {/* Expanded Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-3xl font-bold text-white">Category Management</h1>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <span className="text-blue-200 text-lg">Dashboard</span>
              <span className="text-white text-xl">/</span>
              <span className="text-white font-semibold text-lg">All Categories</span>
            </div>
          </div>
        </div>

        {/* Spacious Table Area */}
        <div className="p-8 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-10 py-4 text-left text-lg font-semibold uppercase">ID</th>
                <th className="px-16 py-4 text-left text-lg font-semibold uppercase">Category Name</th>
                <th className="px-14 py-4 text-left text-lg font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-200">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap text-lg text-blue-900 font-medium">{item.id}</td>
                    <td className="px-8 py-6 whitespace-nowrap text-lg text-blue-800">{item.category_name}</td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex gap-4">
                        <Link
                          to={`/medicineadmin/editcategory/${item.id}`}
                          className="px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors w-24 text-center"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteCategory(item.id)}
                          className="px-6 py-3 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors w-24"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-gray-500 text-lg">
                    No categories found in the database
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Expanded Footer */}
        <div className="bg-blue-50 px-8 py-4 border-t border-blue-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-blue-600">
              Total Categories: <span className="font-bold">{data.length}</span>
            </p>
            <Link 
              to="/medicineadmin/addcategory" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Category
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorylist;