import React from "react";
import Nav from "./Components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Contact from "./Pages/Contact";
import ProductDetail from "./Pages/ProductDetail";
import Dashboard from "./Pages/Users/Dashboard";
import MainLayout from "./Layouts/MainLayout";
import UserLayout from "./Layouts/UserLayout";
import AuthMiddlewares from "./Middlewares/AuthMiddlewares";
import RoleMiddlewares from "./Middlewares/RoleMiddlewares";
import CreateOrder from "./Pages/Users/CreateOrder";
import Login from "./Pages/Login";
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>

          <Route path="/product">
            <Route index element={<Product />}></Route>
            <Route path=":id" element={<ProductDetail />}></Route>
          </Route>

          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route element={<AuthMiddlewares />}>
          <Route element={<UserLayout />} path="/users">
            <Route index element={<Dashboard />}></Route>
            <Route path="order/:productId" element={<CreateOrder />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
