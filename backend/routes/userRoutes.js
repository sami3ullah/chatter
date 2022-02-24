const express = require("express");
const {
  registerUser,
  authenticateUser,
  allUsers,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser).get(allUsers);
router.post("/login", authenticateUser);

module.exports = router;
