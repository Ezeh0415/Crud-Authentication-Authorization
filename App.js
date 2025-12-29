const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/config/ConnectDb");
const Router = require("./src/Router/Router");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));

//  CORS (FIRST)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//  Body parsers (for Base64 images)
app.use(express.json({ limit: "70mb" }));
app.use(express.urlencoded({ extended: true, limit: "70mb" }));

//  Rate limiter (skip OPTIONS)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === "OPTIONS",
  message: {
    message: "Too many requests, please try again later.",
  },
});

//  Apply limiter only where needed
app.use("/api", apiLimiter);

//  DB + Routes
connectDB();
app.use(Router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
