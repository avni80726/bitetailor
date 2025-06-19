import { useState } from 'react';
import { Button, Input } from '@mantine/core';
import axios from 'axios';

function Onboarding() {
  const [formData, setFormData] = useState({
    restaurant_name: '',
    contact_number: '',
    email: '',

  });

  const handleChange = (field: string) => (event: { target: { value: any; }; }) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8055/items/restaurant_profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert('Restaurant registered successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to register restaurant');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-blue-900">Register Restaurant</h1>

        <label className="block mb-1 font-medium">Restaurant Name</label>
        <Input radius="md" className="mb-4" value={formData.restaurant_name} onChange={handleChange('name')} />

        <label className="block mb-1 font-medium">Contact Number</label>
        <Input radius="md" className="mb-4" value={formData.contact_number} onChange={handleChange('contact_number')} />

        <label className="block mb-1 font-medium">Email</label>
        <Input radius="md" className="mb-6" value={formData.email} onChange={handleChange('email')} />


        <Button type="submit" fullWidth radius="md" size="md" color="blue">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Onboarding;
