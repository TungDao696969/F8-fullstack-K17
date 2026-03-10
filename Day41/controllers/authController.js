// Hiển thị trang login
const getLogin = (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  res.render("login", {
    error: req.flash("error")[0] || null,
    emailError: req.flash("emailError")[0],
    passwordError: req.flash("passwordError")[0],
  });
};

// Xử lý đăng nhập
const postLogin = (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  let hasError = false;
  if (!email) {
    req.flash("emailError", "Vui lòng nhập email");
    hasError = true;
  }
  if (!password) {
    req.flash("passwordError", "Vui lòng nhập password");
    hasError = true;
  }
  if (hasError) {
    return res.redirect("/login");
  }

  if (email === "admin@gmail.com" && password === "123456") {
    req.session.user = {
      email,
    };
    return res.redirect("/");
  }
  req.flash("error", "Sai tài khoản hoặc mật khẩu");
  res.redirect("/login");
};

// Hiển thị trang home
const getHome = (req, res) => {
  res.render("home", {
    user: req.session.user,
  });
};

// Xử lý logout
const getLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = {
  getLogin,
  postLogin,
  getHome,
  getLogout,
};
