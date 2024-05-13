import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: null // State to store the uploaded image
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: file
    }));
  };

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    // Redirect to the second form page
    // You can use React Router for navigation
    // Example: history.push('/second-form');
    navigate("/page2")
    console.log('Form data saved:', formData);
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter your name"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter your address"
          rows="3"
        ></textarea>
      </div>
      <div className="mt-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Save</button>
    </form>
  );
};

export default FirstForm;
