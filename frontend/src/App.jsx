import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
        <ToastContainer/>
        {/* px-4: Trên màn hình nhỏ nhất, padding trái và phải sẽ là 4 đơn vị của Tailwind (khoảng 1rem hoặc 16px).
      sm:px-[5vw]: Trên màn hình nhỏ (small, từ 640px trở lên), padding trái và phải sẽ là 5% chiều rộng của cửa sổ trình duyệt (5vw - viewport width).
      md:px-[7vw]: Trên màn hình trung bình (medium, từ 768px trở lên), padding trái và phải sẽ là 7% chiều rộng của cửa sổ trình duyệt (7vw).
      lg:px-[9vw]: Trên màn hình lớn (large, từ 1024px trở lên), padding trái và phải sẽ là 9% chiều rộng của cửa sổ trình duyệt (9vw). */}
        <Navbar/>
        <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<Order/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App