import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";

export default function Nav() {
  const activeClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-gray-600 hover:text-blue-500";

  const { token, user, getProfile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);
  const handleLogout = () => {
    const currentUrl = location.pathname;

    if (currentUrl.startsWith("/users")) {
      navigate("/login?continue=" + currentUrl, { replace: true });
    }

    setTimeout(() => {
      logout();
    }, 0);
  };
  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <div className="flex gap-6 items-center justify-center">
        <NavLink className={activeClass} to="/">
          Home
        </NavLink>

        <NavLink className={activeClass} to="/about">
          About
        </NavLink>

        <NavLink className={activeClass} to="/product">
          Product
        </NavLink>

        <NavLink className={activeClass} to="/contact">
          Contact
        </NavLink>

        {token ? (
          user ? (
            <p className="font-semibold">Hi, {user.name}</p>
          ) : (
            <p>Loading...</p>
          )
        ) : (
          <NavLink
            className={activeClass}
            to={"/login?continue=" + location.pathname}
            replace
          >
            Login
          </NavLink>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="border rounded-sm p-1 bg-red-500 text-white cursor-pointer hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
