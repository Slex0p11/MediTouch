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
      <section className="ml-60">
        <div className="flex justify-between mb-1 -mt-80">
          <h2 className="text-2xl mx-3 font-bold">Add Medicine</h2>
          <h2 className="text-xl font-bold">
            Dashboard/ <span className="text-green-600">Add Medicine</span>
          </h2>
        </div>
        <form
          className="space-y-6 px-4 max-w-sm  mx-auto  font-[sans-serif] shadow-lg shadow-blue-300"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Medicine Name</label>
            <input
              type="text"
              name="medicine_name"
              placeholder="Enter the name"
              onChange={handleChange}
              value={formData.medicine_name}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black"
            />
          </div>

          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter the Price"
              onChange={handleChange}
              value={formData.price}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black"
            />
          </div>

          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Category</label>
            <input
              type="text"
              name="Category"
              placeholder="Enter the category"
              onChange={handleChange}
              value={formData.Category}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black"
            />
          </div>

          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Description</label>
            <textarea
              name="description"
              placeholder="Enter the Description"
              onChange={handleChange}
              value={formData.description}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black"
            ></textarea>
          </div>

          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Medicine Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black file:mr-2 file:py-1 file:px-3 file:rounded file:border-none file:bg-gray-200 file:text-sm file:text-black"
            />
          </div>

          <button
            type="submit"
            className="!mt-8 px-6 py-2 w-full bg-green-400 hover:bg-[#444] text-sm text-white mx-auto block"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default AddMedicine;
