
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';

function App() {
 

  return (
    <Router>
    <div className='text-white w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat opacity-50' style={{ backgroundImage: `url(${new URL('../src/assets/foodlogin.jpg', import.meta.url)})`}} >

<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  
</Routes>
    </div>
    </Router>
  )
}

export default App
