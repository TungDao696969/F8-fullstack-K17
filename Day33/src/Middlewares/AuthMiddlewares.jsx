import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthMiddlewares() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login?continue=" + location.pathname} replace />;
  }

  return <Outlet />;
}
