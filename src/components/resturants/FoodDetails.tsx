import { useState, useEffect } from 'react';
import { Input, Button } from '@mantine/core';
import axios from 'axios';

function FoodDetails() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    image: '',
  });

  const [foods, setFoods] = useState<any[]>([]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      type: form.type,
      image: form.image || null,
    };

    try {
      const response = await axios.post('http://localhost:8055/admin/settings/data-model/Food', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(' Food created:', response.data);

      setForm({
        name: '',
        description: '',
        price: '',
        type: '',
        image: '',
      });

      fetchFoods(); 
    } catch (error: any) {
      console.error(' Error creating food:', error.response?.data || error.message);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:8055/items/food');
      setFoods(response.data.data);
    } catch (error: any) {
      console.error(' Error fetching foods:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-7">
        <form
          onSubmit={handleSubmit}
          className="border bg-white p-6 rounded-2xl shadow-lg space-y-6"
        >
          {['name', 'description', 'price', 'type', 'image'].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium capitalize">{field}:</label>
              <Input
                name={field}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                radius="md"
                type={field === 'price' ? 'number' : 'text'}
                step={field === 'price' ? '0.01' : undefined}
                placeholder={`Enter ${field}`}
                required={field !== 'image'}
              />
            </div>
          ))}

          <Button type="submit" radius="md" fullWidth>
            Register Food
          </Button>
        </form>
      </div>

      <div className="col-span-5 space-y-4">
        <h2 className="text-xl font-semibold"> Food List</h2>
        {foods.length === 0 ? (
          <p>No food items found.</p>
        ) : (
          foods.map((food, index) => (
            <div key={index} className="p-4 bg-white rounded-xl shadow">
              <p><strong>Name:</strong> {food.name}</p>
              <p><strong>Description:</strong> {food.description}</p>
              <p><strong>Price:</strong> ${food.price}</p>
              <p><strong>Type:</strong> {food.type}</p>
              <p><strong>Image:</strong> {food.image || 'N/A'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FoodDetails;
