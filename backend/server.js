const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// home route
app.get("/", (req, res) => {
  res.send("home route");
});

app.get("");

app.listen(PORT, console.log(`server has started on PORT ${PORT}`));
