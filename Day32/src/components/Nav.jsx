import React from "react";
import { Link, NavLink } from "react-router-dom";
export default function Nav() {
  const activeClass = ({ isActive }) => {
    return isActive ? "text-red-600 font-bold" : "";
  };
  return (
    <div className="flex justify-center gap-10">
      <NavLink className={activeClass} to="/">
        Home
      </NavLink>
      <NavLink className={activeClass} to="/about">
        About
      </NavLink>
      <NavLink className={activeClass} to="/products">
        Product
      </NavLink>
      <NavLink className={activeClass} to="/contact">
        Contact
      </NavLink>
    </div>
  );
}
