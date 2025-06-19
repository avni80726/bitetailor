

function Dashboard() {
  return (
    <div  className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat">
    <form  className="bg-white bg-opacity-75 w-full max-w-md p-8 rounded-lg text-black mx-auto">
      <h1 className="text-center text-2xl font-bold mb-6">Login</h1>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          className="w-full p-2 rounded text-black border border-black"
          placeholder="Enter your name"
         required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded text-black border border-black"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Contact Number</label>
        <input
          type="tel"
          className="w-full p-2 rounded text-black border border-black"
          placeholder="Enter your contact number"
          
        />
      </div>

       <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="tel"
          className="w-full p-2 rounded text-black border border-black"
          placeholder="Enter your password"
          required
          
        />
      </div>

      <button type="submit" className="w-full bg-white text-black py-2 rounded font-semibold border border-black hover:bg-gray-100 transition duration-200">
        Login
      </button>

      <div className="mt-4 text-center text-sm">
        <span>
          New here? 
        </span>
      </div>
    </form>
    </div>
  )
}

export default Dashboard;
