import React, { useState } from 'react';

const FirstForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: null,
    imageUrl: null // To store the image URL for preview
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imageUrl: reader.result // Set the image URL for preview
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    // Clear form fields after saving
    setFormData({
      name: '',
      address: '',
      image: null,
      imageUrl: null
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" onChange={handleImageChange} />
        {formData.imageUrl && (
          <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
        )}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default FirstForm;
