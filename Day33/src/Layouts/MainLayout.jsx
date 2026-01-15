import React from "react";
import Nav from "../Components/Nav";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div>
      <Nav />
      <hr></hr>
      <Outlet />
    </div>
  );
}
