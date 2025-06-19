import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../assets/foodlogin.jpg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [justRegistered, setJustRegistered] = useState<boolean>(false);

  useEffect(() => {
    const flag = localStorage.getItem("justRegistered");
    if (flag === "true") {
      setJustRegistered(true);
      localStorage.removeItem("justRegistered");
    }
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
     
      const loginRes = await axios.post("http://localhost:8055/auth/login", {
        email,
        password,
      });

      const token = loginRes.data.data.access_token;
      localStorage.setItem("token", token);

      
      const profileRes = await axios.get("http://localhost:8055/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = profileRes.data.data;
      const role = typeof userData.role === "object" ? userData.role.name : userData.role;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userRole", role);

    
      if (role == "77466f7d-c3f9-4d40-ac4d-a7bf18477221") {
        navigate("/customer/dashboard");
      } else if (role == "aabe7f56-46f0-4ff6-8239-0bfdd0f175b9") {
        navigate("/restaurant/onboarding");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        onSubmit={submit}
        className="bg-white bg-opacity-75 w-full max-w-md p-8 rounded-lg text-black mx-auto"
      >
        <h1 className="text-center text-2xl font-bold mb-6">Login</h1>

        {justRegistered && (
          <p className="text-green-600 text-center mb-4">
            Registration successful! Please log in.
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded text-black border border-black"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded text-black border border-black"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded font-semibold border border-black hover:bg-gray-100 transition duration-200"
        >
          Login
        </button>

        <div className="mt-4 text-center text-sm">
          <span>
            New here? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
