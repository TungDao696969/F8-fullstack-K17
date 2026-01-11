import React from 'react'
import Nav from './components/Nav'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div>
      <Nav />
      <hr className='mt-3'></hr>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/products">
          <Route path="" element={<Products />}></Route>
          <Route path=":id" element={<ProductDetail />}></Route>
        </Route>
        <Route path="/contact" element={<Contact />}></Route>

      </Routes>
    </div>
  )
}
