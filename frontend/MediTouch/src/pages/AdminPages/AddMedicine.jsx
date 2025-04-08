import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMedicine = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    medicine_name: '',
    price: '',
    category: '',
    image: null,
    description: '',
  });

  const [errors, setErrors] = useState({
    medicine_name: false,
    price: false,
    category: false,
    description: false,
  });

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/category/')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch((error) => {
        toast.error('Failed to fetch categories');
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? false : true,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };

    if (!product.medicine_name) {
      newErrors.medicine_name = true;
      toast.error('Medicine name cannot be empty!');
      isValid = false;
    }

    if (!product.price || product.price <= 0) {
      newErrors.price = true;
      toast.error('Price must be greater than zero!');
      isValid = false;
    }

    if (!product.category) {
      newErrors.category = true;
      toast.error('Category cannot be empty!');
      isValid = false;
    }

    if (!product.description) {
      newErrors.description = true;
      toast.error('Description cannot be empty!');
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append('medicine_name', product.medicine_name);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('image', product.image);
    formData.append('description', product.description);

    axios
      .post('http://127.0.0.1:8000/addmedicine/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        toast.success('Medicine added successfully!');
        setProduct({
          medicine_name: '',
          price: '',
          category: '',
          image: null,
          description: '',
        });
      })
      .catch((error) => {
        toast.error('Error while adding medicine');
        console.error('Error:', error.message);
      });
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <ToastContainer theme="colored" position="top-center" />
      
      <div className="max-w-4xl mx-auto mr-25">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-white">Add New Medicine</h1>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-blue-200">Dashboard</span>
              <span className="text-white">/</span>
              <span className="text-white font-semibold">Add Medicine</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          className="space-y-6 p-8 bg-white rounded-b-xl shadow-xl shadow-blue-200 border border-blue-100"
          onSubmit={handleSubmit}
        >
          {/* Medicine Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Medicine Name</label>
            <input
              type="text"
              name="medicine_name"
              placeholder="Enter medicine name"
              onChange={handleChange}
              value={product.medicine_name}
              className={`px-4 py-3 border ${errors.medicine_name ? 'border-red-500' : 'border-blue-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
              value={product.price}
              className={`px-4 py-3 border ${errors.price ? 'border-red-500' : 'border-blue-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Category</label>
            <select
              name="category"
              onChange={handleChange}
              value={product.category}
              className={`px-4 py-3 border ${errors.category ? 'border-red-500' : 'border-blue-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              onChange={handleChange}
              value={product.description}
              className={`px-4 py-3 border ${errors.description ? 'border-red-500' : 'border-blue-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
              rows="4"
            ></textarea>
          </div>

          {/* Medicine Image */}
          <div className="flex flex-col space-y-2">
            <label className="text-blue-800 font-medium">Medicine Image</label>
            <div className={`px-4 py-3 border border-blue-200 rounded-lg ${product.image ? 'bg-blue-50' : ''}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {product.image && (
                <p className="mt-2 text-sm text-blue-600">{product.image.name}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;