import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditMedicine = () => {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    medicine_name: '',
    price: '',
    description: '',
    image: null,
    Category: '',
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/category/')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    const fetchMedicine = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/medicine/${id}/`);
        setFormData(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMedicine();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const updateMedicine = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('medicine_name', formData.medicine_name);
      formDataToSubmit.append('price', formData.price);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('image', formData.image);
      formDataToSubmit.append('Category', formData.Category);

      const response = await axios.patch(
        `http://127.0.0.1:8000/updateDeletemedicine/${id}/`,
        formDataToSubmit
      );

      if (response.status === 200) {
        toast.success('Medicine updated successfully');
        setTimeout(() => {
          navigate('/medicineadmin/medicinelist');
        }, 2000);
      } else {
        toast.error('Failed to update medicine');
      }
    } catch (err) {
      toast.error('Error updating medicine');
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <ToastContainer theme="colored" position="top-center" />
      
      <div className="max-w-4xl mx-auto mr-25">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-white">Edit Medicine Details</h1>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-blue-200">Dashboard</span>
              <span className="text-white">/</span>
              <span className="text-white font-semibold">Edit Medicine</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={updateMedicine}
          className="space-y-6 p-8 bg-white rounded-b-xl shadow-xl shadow-blue-200 border border-blue-100"
        >
          {/* Medicine Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Medicine Name</label>
            <input
              type="text"
              name="medicine_name"
              placeholder="Enter medicine name"
              onChange={handleChange}
              value={formData.medicine_name}
              className="px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Price (Rs.)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              onChange={handleChange}
              value={formData.price}
              className="px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              onChange={handleChange}
              value={formData.description}
              className="px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="4"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Category</label>
            <select
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              className="px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Medicine Image</label>
            <div className={`px-4 py-3 border border-blue-200 rounded-lg ${formData.image ? 'bg-blue-50' : ''}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.image && (
                <p className="mt-2 text-sm text-blue-600">
                  {typeof formData.image === 'string' ? 'Current image' : formData.image.name}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Update Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMedicine;