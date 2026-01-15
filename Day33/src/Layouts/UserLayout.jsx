import React from "react";
import { Link, Outlet } from "react-router-dom";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";
export default function UserLayout() {
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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-6 text-center">User Panel</h2>

        <nav className="flex flex-col space-y-3">
          <Link className="menu-item" to="/users">
            Dashboard
          </Link>
          <Link className="menu-item" to="#">
            Account
          </Link>
          <Link className="menu-item" to="#">
            Password
          </Link>
          <Link className="menu-item" to="#">
            My Order
          </Link>
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
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
