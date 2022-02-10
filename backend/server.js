const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/dummy-data");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// home route
app.get("/", (req, res) => {
  res.send("home route");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  res.send(singleChat);
});

app.listen(PORT, console.log(`server has started on PORT ${PORT}`));
