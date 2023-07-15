var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");

router.get("/userList", userController.list_user);

//edit user
router.get("/editUser/:idUser", userController.edit_User);
router.post("/editUser/:idUser", userController.edit_User);
//delete user
router.get("/deleteUser/:idDelUser", userController.deleteUser);
module.exports = router;
