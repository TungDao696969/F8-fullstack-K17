import { Button } from "@/components/ui/button";

import Login from "./Login";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export default function Header() {
  const { token, logout } = useAuth();
  const { data: user, isLoading } = useProfile();
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-1 text-2xl font-extrabold">
          <span className="text-black">Order</span>
          <span className="rounded bg-orange-500 px-1 text-white">UK</span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Button className="rounded-full bg-orange-500 text-white">
            Home
          </Button>
          <a className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
            Browse Menu
          </a>
          <a className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
            Special Offers
          </a>
          <a className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
            Restaurants
          </a>
          <a className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
            Track Order
          </a>
        </nav>

        {/* Auth */}
        {token ? (
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
            ) : (
              <div>
                <span className="font-medium">{user?.name}</span>
                <Button
                  className="cursor-pointer ml-2"
                  variant="outline"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
}
