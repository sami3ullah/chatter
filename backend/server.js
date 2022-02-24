const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/dummy-data");
const connectMongoDb = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
// Databse connection
connectMongoDb();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // to accept JSON data

// home route
app.get("/", (req, res) => {
  res.send("home route");
});

app.use("/api/user", userRoutes);

// error handling for routes that doesn't exist
app.use(notFound);
// error handling for all other errors
app.use(errorHandler);

app.listen(PORT, console.log(`server has started on PORT ${PORT}`.yellow.bold));
