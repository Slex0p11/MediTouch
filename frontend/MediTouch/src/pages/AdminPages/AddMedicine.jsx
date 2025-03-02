import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    id: '',
    medicine_name: '',
    price: '',
    description: '',
    image: null,
    Category: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/addmedicine/', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        toast.success('Medicine added successfully!');
        setFormData({
          id: '',
          medicine_name: '',
          price: '',
          description: '',
          image: null,
          Category: '',
        });
      } else {
        toast.error('Failed to add medicine');
      }
    } catch (err) {
      toast.error('Error while adding medicine');
      console.error(err.message);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <section className="ml-60 mt-1"> {/* Added mt-20 to shift the form down */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl mx-3 font-bold text-blue-600">Add Medicine</h2>
          <h2 className="text-xl font-bold">
            Dashboard/ <span className="text-green-600">Add Medicine</span>
          </h2>
        </div>
        <form
          className="space-y-6 px-8 py-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg shadow-blue-100 border border-gray-100"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Medicine Name */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium mb-1">Medicine Name</label>
              <input
                type="text"
                name="medicine_name"
                placeholder="Enter the name"
                onChange={handleChange}
                value={formData.medicine_name}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter the Price"
                onChange={handleChange}
                value={formData.price}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="Category"
                placeholder="Enter the category"
                onChange={handleChange}
                value={formData.Category}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Enter the Description"
                onChange={handleChange}
                value={formData.description}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
              ></textarea>
            </div>

            {/* Medicine Image */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium mb-1">Medicine Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded file:border-none file:bg-gray-200 file:text-sm file:text-gray-700"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default AddMedicine;