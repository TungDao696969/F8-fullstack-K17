function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login</h1>
      <button onClick={handleLogin}>Đăng nhập bằng Google</button>
    </div>
  );
}

export default Login;
