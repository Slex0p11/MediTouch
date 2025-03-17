import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

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
    // Fetch categories from backend
    axios.get('http://127.0.0.1:8000/api/category/')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    // Fetch existing medicine data
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
        setFormData({ medicine_name: '', price: '', description: '', image: null, Category: '' });
        setTimeout(() => {
          navigate('/medicineadmin/medicinelist');
        }, 3000);
      } else {
        toast.error('Failed to update medicine');
      }
    } catch (err) {
      toast.error('Error updating medicine');
      console.error(err.message);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <section className="ml-60">
        <div className="flex justify-between mb-5 -mt-80">
          <h2 className="text-2xl mx-3 font-bold">Edit Medicine</h2>
          <h2 className="text-xl font-bold">
            Dashboard/ <span className="text-green-600">Edit medicine</span>
          </h2>
        </div>
        <form
          className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif] shadow-lg shadow-blue-300"
          onSubmit={updateMedicine}
        >
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm" htmlFor="medicine_name">
              Medicine Name
            </label>
            <input
              type="text"
              name="medicine_name"
              placeholder="Enter Medicine Name"
              onChange={handleChange}
              value={formData.medicine_name}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black"
            />
          </div>

          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              onChange={handleChange}
              value={formData.price}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black"
            />
          </div>

          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              onChange={handleChange}
              value={formData.description}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black"
            />
          </div>

          <div>
            <label>Category:</label>
            <select
              name="Category"
              value={formData.Category}
              onChange={handleChange}
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

          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white text-black"
            />
          </div>

          <button
            type="submit"
            className="!mt-8 px-6 py-2 w-full bg-green-400 hover:bg-[#444] text-sm text-white mx-auto block"
          >
            Update Medicine
          </button>
        </form>
      </section>
    </>
  );
};

export default EditMedicine;
