var express = require("express");
var router = express.Router();
var spController = require("../controller/sanpham.controller");
//check_login
var check_login = require('../middlewares/check_login');

//tạo middleware chung cho tất cả các router
router.use( (req,res, next) => {
    console.log('====> gọi vào middleware');
    next(); // thực hiện công việc tiếp theo
  })

router.get("/phone", check_login.yeu_cau_dang_nhap , spController.list);
router.get("/dienthoai",check_login.yeu_cau_dang_nhap , spController.list_dienthoai);
router.get("/laptop",check_login.yeu_cau_dang_nhap , spController.list_laptop);
router.get("/tablet",check_login.yeu_cau_dang_nhap , spController.list_tablet);
router.get("/maytinh", check_login.yeu_cau_dang_nhap ,spController.list_maytinh);
router.get("/tainghe", check_login.yeu_cau_dang_nhap ,spController.list_tainghe);
//addsp
// router.post("/phone", spController.add_Sp);
router.post("/phone", spController.list);

//editsp
router.get("/editSp/:idSp",check_login.yeu_cau_dang_nhap , spController.edit_Sp);
router.post("/editSp/:idSp", spController.edit_Sp);
//details

router.get("/details/:idSpdetail",check_login.yeu_cau_dang_nhap , spController.showDetail);
//delete
router.get('/deleteSp/:idDel', spController.deleteSp);
//thể loại
router.get('/list_Role',check_login.yeu_cau_dang_nhap , spController.listRoleSp);
router.post('/list_Role', spController.addRole);
router.get('/deleteRole/:idRoleDel', spController.deleteRole);




module.exports = router;