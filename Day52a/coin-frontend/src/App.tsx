import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("accessToken");

  if (tokenFromUrl) {
    localStorage.setItem("accessToken", tokenFromUrl);
    window.history.replaceState({}, "", "/");
  }

  const token = localStorage.getItem("accessToken");
  const isAuth = !!token;

  return isAuth ? <Dashboard /> : <Login />;
}

export default App;
