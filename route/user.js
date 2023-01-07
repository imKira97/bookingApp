const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const jsonparser = bodyParser.json();

const userController = require("../controllers/user");
router.get("/", userController.getUsers);

router.post("/user/adduser", jsonparser, userController.insertUser);

router.delete("/user/deleteuser/:email", userController.deleteUser);

module.exports = router;
