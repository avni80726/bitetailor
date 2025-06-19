import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    reastaurant_name:"",
    contact_number:"",
    shop_number:""

  }); 

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // API CALLS
  const registerUser = () => {

    // construct payload
    const payload = {
      status: "active",
      email: user.email,
      password: user.password,
      role: "77466f7d-c3f9-4d40-ac4d-a7bf18477221",
      first_name: user.first_name,
      last_name: user.last_name,
      floor:"",
      restaurant_timings:""
    };

    axios.post("http://localhost:8055/users", payload).then(
      (response) => {
        console.log("Response for user registration: ", response.data);

        // call signup request
        signIn();
      }, (error) => {
        console.log("Error while registering user: ", error?.response);
      }
    );

  };

  const signIn = () => {

    // construct paylaod
    const payload = {
      email: user.email,
      password: user.password
    };

    axios.post("http://localhost:8055/auth/login", payload).then(
      (response) => {
        console.log("Response for user signin: ", response.data);
        // TODO: access tokens and manage these locally
        // localStorage.setItem("token", );

        // call me request
        fetchUser();
      }, (error) => {
        console.log("Error while signin user: ", error?.response);
      }
    );

  };

  const fetchUser = () => {
    axios.get("http://localhost:8055/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(
      (response) => {
        console.log("Response for user data: ", response.data);
        // TODO: access user data and manage these locally
        // localStorage.setItem("token", );

        // call onboard restaurant

      }, (error) => {
        console.log("Error while fetching user data: ", error?.response);
      }
    );
  };

  const onboardRestaurant = () => {
    // set a isLoggedIn flag in localStorage and redirect user to dashboard
    
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

        <input
        value={user.reastaurant_name}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="reastaurant_name"
      />
        <input
        value={user.contact_number}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="contact_number"

      />
        <input
        value={user.shop_number}
        onChange={handleChange}
        className="border p-2 w-full"        
        placeholder="shop_number"
      />

      <input
      
        onChange={handleChange}
        className="border p-2 w-full"        
        placeholder="floor"
      />
       
      <button  className="bg-blue-600 text-white p-2 w-full">
        Submit
      </button>
    </div>
  );
}

export default Register;
