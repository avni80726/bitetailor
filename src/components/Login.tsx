import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-black bg-opacity-75 w-full max-w-md p-8 rounded-lg text-white mx-auto ">
      <h1 className="text-center text-2xl font-bold mb-6">Login</h1>

      <div className="mb-4">
        <label className="block mb-1">Your Email</label>
        <input
          type="email"
          className="w-full p-2 rounded text-white border border-white"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Your Password</label>
        <input
          type="password"
          className="w-full p-2 rounded text-white border border-white"
          placeholder="Enter your password"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input type="checkbox" id="remember" className="mr-2" />
        <label htmlFor="remember">Remember Me</label>
      </div>

      <span className="block text-right text-sm text-blue-400 hover:underline mb-6 cursor-pointer">
        Forgot Password?
      </span>

      <button className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 font-semibold">
        Login
      </button>

      <div className="mt-4 text-center text-sm">
        <span>New here? <Link to="/register">Register</Link></span>
      </div>
    </div>
  );
}

export default Login;
