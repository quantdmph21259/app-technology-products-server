var express = require("express");
var router = express.Router();
var home_controller = require("../controller/login.controller");

/* GET home page. */
router.get("/", home_controller.index);
router.post("/", home_controller.index);
module.exports = router;
