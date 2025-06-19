import React, { useState } from 'react';
import { Button, Input } from '@mantine/core';
import axios from 'axios';

function ResturantDetails() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    fullName: '',
    phone: '',
    email: '',
    building: '',
    floor: '',
    locality: '',
    city: '',
    landmark: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form to Directus
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('directus_token');
    if (!token) {
      alert('User not logged in.');
      return;
    }

    const payload = {
      restaurant_name: formData.restaurantName,
      full_name: formData.fullName,
      phone_number: formData.phone,
      email_address: formData.email,
      shop_number: formData.building,
      floor: formData.floor,
      locality: formData.locality,
      city: formData.city,
      landmark: formData.landmark,
    };

    try {
      const response = await axios.post(
        'http://localhost:8055/items/restaurant_profile', 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Submitted:', response.data);
      alert('Restaurant profile submitted successfully!');
    } catch (error: any) {
      console.error('Submit error:', error.response?.data || error.message);
      alert('Failed to submit restaurant data.');
    }
  };

  return (
    <div className="grid grid-cols-12 h-screen pt-16">
      {/* Left Side (Form) */}
      <div className="col-span-7 bg-gray-100 p-10 overflow-y-auto">
        <form onSubmit={handleSubmit} className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Restaurant Information</h2>
          <p className="text-gray-600 mb-6">Customers will see this name on Bite Tailor</p>

          <Input.Wrapper label="Restaurant name*" className="mb-6">
            <Input
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
            />
          </Input.Wrapper>

          <h3 className="text-xl font-semibold mt-8 mb-2">Owner details</h3>
          <p className="text-gray-600 mb-4">Used for business communication</p>

          <div className="grid grid-cols-2 gap-4">
            <Input.Wrapper label="Full name*">
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Input.Wrapper>

            <Input.Wrapper label="Email address*">
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Input.Wrapper>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input.Wrapper label="Phone number*">
              <div className="flex items-center gap-2">
                <span className="text-md">🇮🇳 +91</span>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </Input.Wrapper>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-2">Restaurant address details</h3>
          <p className="text-gray-600 mb-4">Address based on restaurant location</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              name="building"
              placeholder="Shop no. / building no. (optional)"
              value={formData.building}
              onChange={handleChange}
            />
            <Input
              name="floor"
              placeholder="Floor / tower (optional)"
              value={formData.floor}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              name="locality"
              placeholder="Area / Sector / Locality*"
              value={formData.locality}
              onChange={handleChange}
            />
            <Input
              name="city"
              placeholder="City (optional)"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <Input
            name="landmark"
            placeholder="Add any nearby landmark (optional)"
            value={formData.landmark}
            onChange={handleChange}
            className="mb-6"
          />

          <Button type="submit" fullWidth>
            Next
          </Button>
        </form>
      </div>

      {/* Right Side (Info / Image / Preview) */}
      <div className="col-span-5 bg-white flex items-center justify-center">
        <p className="text-gray-400">Right Panel (You can add an image, info, or preview here)</p>
      </div>
    </div>
  );
}

export default ResturantDetails;
