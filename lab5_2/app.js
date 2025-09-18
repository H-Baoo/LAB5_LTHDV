require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookie = require("cookie-parser");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser);

// Session config +cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,        // chặn JS phía client đọc cookie
      secure: false,         // true nếu deploy HTTPS
      maxAge: 1000 * 60 * 60 // 1 giờ
    }
  })
);

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running! Go to /auth/register or /auth/login");
});
// Connect DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
