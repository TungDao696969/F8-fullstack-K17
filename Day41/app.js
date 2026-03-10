const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const app = express();

// Import routes
const authRoutes = require("./routes/index");

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(flash());

// Routes
app.use(authRoutes);

app.listen(3000, () => {
  console.log("Đang chạy với http://localhost:3000");
});
