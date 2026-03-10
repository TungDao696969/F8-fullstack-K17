function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash("error", "Bạn cần đăng nhập trước");
    return res.redirect("/login");
  }

  next();
}

module.exports = checkLogin;
