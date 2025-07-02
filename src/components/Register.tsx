import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: '',
  });

  const navigate = useNavigate();

  // ✅ Handle input and select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

 
  const registerUser = async () => { 
    const roleId =
      user.user_type === 'restaurant'
        ? 'aabe7f56-46f0-4ff6-8239-0bfdd0f175b9'
        : '77466f7d-c3f9-4d40-ac4d-a7bf18477221'; 
    try {
      const res = await axios.post(
        'http://localhost:8055/users',
        {
          email: user.email,
          password: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
          user_type: user.user_type,
          role: roleId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('User created:', res.data);

     
      if (user.user_type === 'restaurant') {
        navigate('/resdetails');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('Error: ' + JSON.stringify(error.response?.data?.errors || error.message));
    }
  };

  return (
    <div className="space-y-3 p-4 max-w-md mx-auto">
      <input
        value={user.first_name}
        onChange={handleChange}
        className="border p-2 w-full"
        name="first_name"
        placeholder="First Name"
      />
      <input
        value={user.last_name}
        onChange={handleChange}
        className="border p-2 w-full"
        name="last_name"
        placeholder="Last Name"
      />
      <input
        value={user.email}
        onChange={handleChange}
        className="border p-2 w-full"
        name="email"
        placeholder="Email"
      />
      <input
        value={user.password}
        onChange={handleChange}
        className="border p-2 w-full"
        name="password"
        placeholder="Password"
        type="password"
      />
      <select
        name="user_type"
        value={user.user_type}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select User Type</option>
        <option value="customer">Customer</option>
        <option value="restaurant">Restaurant</option>
      </select>
      <button onClick={registerUser} className="bg-blue-600 text-white p-2 w-full">
        Submit
      </button>
    </div>
  );
}

export default Register;
