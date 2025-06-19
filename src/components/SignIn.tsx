

function Signin() {
  return (
    <div className='space-y-3 p-4 max-w-md mx-auto'>
      <form>
        <input name="email"
                placeholder='enter email'
                className='border p-2 w-full'
                required
        ></input>
        <input
                name="password"
                placeholder="enter password"
                className='border p-2 w-full'
                required
        > 
        </input>
        <button className='border' hover:bg-sky-700>Login In </button>
      </form>
    </div>
  )
}

export default Signin
