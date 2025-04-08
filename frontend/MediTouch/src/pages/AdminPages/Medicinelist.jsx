import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const MedicineList = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/allmedicine')
      .then(res => setData(res.data))
      .catch(err => console.log(err.message));

    axios.get('http://127.0.0.1:8000/api/category/')
      .then(res => setCategories(res.data))
      .catch(err => console.log(err.message));
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.category_name : "No Category";
  };

  const deleteContact = async (id) => {
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
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.medicine_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <ToastContainer theme='colored' position='top-center' />
      <div className="ml-60 mt-10 px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700">Medicine List</h2>
          <p className="text-sm text-gray-500">
            Dashboard / <span className="text-blue-600 font-semibold">Medicine List</span>
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by medicine name..."
            className="w-full sm:w-1/2 px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border border-blue-300 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.category_name}</option>
            ))}
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((items) => (
            <div key={items.id} className="bg-white rounded-2xl shadow-md p-5 border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-blue-700">{items.medicine_name}</h3>
                <span className="text-xs text-gray-500">ID: {items.id}</span>
              </div>

              <img
                src={items.image}
                alt={items.medicine_name}
                className="w-full h-40 object-cover rounded-lg border border-blue-200 mb-4"
              />

              <p className="text-gray-600 text-sm mb-2"><span className="font-medium text-gray-700">Description:</span> {items.description}</p>
              <p className="text-gray-600 text-sm mb-2"><span className="font-medium text-gray-700">Category:</span> {getCategoryName(items.category)}</p>
              <p className="text-blue-700 font-bold mb-4">Price: Rs. {items.price}</p>

              <div className="flex gap-3">
                <Link
                  to={`/medicineadmin/editmedicine/${items.id}`}
                  className="bg-blue-500 text-white px-4 py-2 text-sm font-medium rounded w-full text-center hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteContact(items.id)}
                  className="bg-red-500 text-white px-4 py-2 text-sm font-medium rounded w-full text-center hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filteredData.length === 0 && (
            <p className="text-center col-span-full text-gray-500">No medicines found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MedicineList;
