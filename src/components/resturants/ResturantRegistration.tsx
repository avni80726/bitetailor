import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResturantRegistration() {
  const [user, setUser] = useState({
    email: "",
   contact_number: "",
    first_name: "",
    last_name: "",
    address: "",
    password:""
  });

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      status: "active",
      email: user.email,
      password: user.password,
      role: "aabe7f56-46f0-4ff6-8239-0bfdd0f175b9", // Restaurant role ID
      first_name: user.first_name,
      last_name: user.last_name,
    };

    axios
      .post("http://localhost:8055/users", payload)
      .then((res) => {
        console.log("User created:", res.data);
        localStorage.setItem("justregistered", "true");

        return axios.post("http://localhost:8055/auth/login", {
          email: user.email,
          password: user.password,
        });
      })
      .then((loginRes) => {
        console.log("User logged in:", loginRes.data);
        const token = loginRes.data.data.access_token;

        localStorage.setItem("token", token);

        return axios.get("http://localhost:8055/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((profileRes) => {
        console.log("Logged-in user data:", profileRes.data);
        const userData = profileRes.data.data;
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect based on role ID
        const roleId = userData.role;

        if (roleId === "aabe7f56-46f0-4ff6-8239-0bfdd0f175b9") {
          // Restaurant role
          navigate("/restaurant/dashboard");
        } else if (roleId === "77466f7d-c3f9-4d40-ac4d-a7bf18477221") {
          // Customer role
          navigate("/customer/dashboard");
        } else {
          
          navigate("/resturant/onboard");
        }

        alert("Registration and login successful!");
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        alert("Something went wrong during registration or login.");
      });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 max-w-md mx-auto">
      <input
        className="border p-2 w-full"
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
        value={user.first_name}
      />
      <input
        className="border p-2 w-full"
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
        value={user.last_name}
      />
      <input
        className="border p-2 w-full"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={user.email}
      />
      <input
        className="border p-2 w-full"
        name="address"
        placeholder="Address"
        onChange={handleChange}
        value={user.address}
      />
      <input
        className="border p-2 w-full"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={user.password}
      />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full">
        Submit
      </button>
    </form>
  );
}

export default ResturantRegistration;
