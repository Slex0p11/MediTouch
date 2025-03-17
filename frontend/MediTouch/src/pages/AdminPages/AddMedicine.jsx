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
    // Fetch categories from the backend
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
    <>
      <ToastContainer theme="colored" position="top-center" />
      <section className="ml-60 mt-1">
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
          {/* Medicine Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">Medicine Name</label>
            <input
              type="text"
              name="medicine_name"
              placeholder="Enter the name"
              onChange={handleChange}
              value={product.medicine_name}
              className={`px-4 py-2 border ${errors.medicine_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
              value={product.price}
              className={`px-4 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              onChange={handleChange}
              value={product.category}
              className={`px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Enter the Description"
              onChange={handleChange}
              value={product.description}
              className={`px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Add Medicine
          </button>
        </form>
      </section>
    </>
  );
};

export default AddMedicine;
