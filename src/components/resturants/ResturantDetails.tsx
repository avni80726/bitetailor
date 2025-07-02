import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Skeleton } from '@mantine/core';
import axios from 'axios';
import Image1 from "./images/download.jpeg";

function ResturantDetails() {
  const navigate = useNavigate();

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

  const [restaurantList, setRestaurantList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchRestaurantList = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:8055/items/restaurant_profile?sort=-date_created')
      .then((res) => {
        setRestaurantList(res.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch restaurant data", err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchRestaurantList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const userStr = localStorage.getItem('user');

    let userId = '';
    if (userStr) {
      try {
        userId = JSON.parse(userStr)?.id;
      } catch (err) {
        console.error('User parse failed', err);
      }
    }

    if (!token || !(role === 'restaurant' || role === 'aabe7f56-46f0-4ff6-8239-0bfdd0f175b9')) {
      console.warn("Invalid access");
      return;
    }

    const payload = {
      restaurant_name: formData.restaurantName,
      full_name: formData.fullName,
      phone_number: formData.phone,
      email_address: formData.email,
      shop_number: formData.building,
      floor: formData.floor,
      area: formData.locality,
      city: formData.city,
      landmark: formData.landmark,
      status: 'published',
      user_id: userId,
    };

    axios
      .post('http://localhost:8055/items/restaurant_profile', payload)
      .then((res) => {
        console.log("Submitted successfully", res);
        fetchRestaurantList();
        // navigate('/rescategory');
      })
      .catch(err => console.error('Post failed', err));
  };

  return (
    <div
      className="h-screen bg-cover bg-center w-screen"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="grid grid-cols-12 h-screen pt-16 bg-gray-50 w-fit m-auto">
        {/* Left Side (Form) */}
        <div className="col-span-7 bg-gray p-10 overflow-y-auto">
          <form onSubmit={handleSubmit} className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 ">Restaurant Information</h2>
            <p className="mb-6">Customers will see this name on Bite Tailor</p>

            <Input.Wrapper label="Restaurant name*" className="mb-6">
              <Input name="restaurantName" value={formData.restaurantName} onChange={handleChange} />
            </Input.Wrapper>

            <h3 className="text-xl font-semibold mt-8 mb-2">Owner details</h3>
            <p className="mb-4">Used for business communication</p>

            <div className="grid grid-cols-2 gap-4">
              <Input.Wrapper label="Full name*">
                <Input name="fullName" value={formData.fullName} onChange={handleChange} />
              </Input.Wrapper>
              <Input.Wrapper label="Email address*">
                <Input name="email" value={formData.email} onChange={handleChange} />
              </Input.Wrapper>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input.Wrapper label="Phone number*">
                <div className="flex items-center gap-2">
                  <span className="text-md">🇮🇳 +91</span>
                  <Input name="phone" value={formData.phone} onChange={handleChange} />
                </div>
              </Input.Wrapper>
            </div>

            <h3 className="text-xl font-semibold mt-10 mb-2">Restaurant address details</h3>
            <p className="mb-4">Address based on restaurant location</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input name="building" placeholder="Shop no. / building no. (optional)" value={formData.building} onChange={handleChange} />
              <Input name="floor" placeholder="Floor / tower (optional)" value={formData.floor} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input name="locality" placeholder="Area / Sector / Locality*" value={formData.locality} onChange={handleChange} />
              <Input name="city" placeholder="City (optional)" value={formData.city} onChange={handleChange} />
            </div>

            <Input name="landmark" placeholder="Add any nearby landmark (optional)" value={formData.landmark} onChange={handleChange} className="mb-6" />

            <Button type="submit" fullWidth>Next</Button>
          </form>
        </div>

        {/* Right Side (Display all restaurant profiles) */}
        <div className="col-span-5 bg-white p-6 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Registered Restaurants</h3>
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} height={80} radius="md" />
              ))}
            </div>
          ) : restaurantList.length ? (
            <div className="flex flex-col gap-4">
              {restaurantList.map((rest, i) => (
                <div key={rest.id + "_restaurant"} className="p-4 border rounded-md shadow-sm bg-gray-50">
                  <h4 className="text-lg font-bold">{rest.restaurant_name}</h4>
                  <p className="text-sm text-gray-500">Owner: {rest.full_name}</p>
                  <p className="text-sm text-gray-500">Phone: +91 {rest.phone_number}</p>
                  <p className="text-sm text-gray-500">Email: {rest.email_address}</p>
                  <p className="text-sm text-gray-500">Address: {rest.shop_number || ''} {rest.floor || ''}, {rest.area}, {rest.city}</p>
                  {rest.landmark && <p className="text-sm text-gray-400">Landmark: {rest.landmark}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No restaurant details submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResturantDetails;
