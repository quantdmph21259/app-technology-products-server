var express = require("express");
var router = express.Router();
var loginController = require("../controller/login.controller");

// router.get("/login", loginController.index);
// router.post("/", loginController.index);

router.get("/register", loginController.register);
router.post("/register", loginController.register);

module.exports = router;