var fs = require('fs');

var myModel = require('../models/sanpham.model');
const { log } = require('console');

exports.list_user= async (req, res, next) => {
  // thêm điều kiện lọc ở đây

  // let loc_user = {roleId : "64230d57d769d18b316b8313"}
   var nameUser = req.query.nameUser;
   var nameFind = new RegExp(nameUser);
   let dieu_kien_tim_kiem = {username: nameFind}

   //xắp xếp
   //xắp xếp
  let sortUser = req.query.sortUser || 1; // mặc định tăng dần

  let list_user= await myModel.userModel.find(dieu_kien_tim_kiem).sort({username: sortUser}).populate('roleId_User'); // tự động tham chiếu đến collection thể loại

  res.render('users/user', {list_user: list_user, sortUser: sortUser});
};

//edit user
exports.edit_User= async (req,res,next) => {
  let msg = " ";
  let idUser = req.params.idUser;
  //lấy thông tin sản phẩm để sửa, tự thêm khối try catch đê bắt lỗi

      let objUser = await myModel.userModel.findById(idUser);
      let listRole = await myModel.roleUserModel.find(); // listRole phải là bảng thể loại
      console.log(listRole);

      if(req.method =='POST'){
          // kiểm tra hợp lệ dữ liệu nếu có....
  
          // tạo model để gán dữ liệu
          let objUsers = new myModel.userModel();
          objUsers.fullname = req.body.fullname;
          objUsers.username = req.body.username;
          objUsers.email = req.body.email;
          objUsers.phone = req.body.phone;
          objUsers.roleId_User = req.body.roleId_User;
  
          objUsers._id = idUser;// thêm cho chức năng sửa
          // ghi vào CSDL
          try {
              // let new_sp = await objSP.save();
              // console.log(new_sp);
              // msg = 'Thêm mới thành công';
  
              await myModel.userModel.findByIdAndUpdate(idUser, objUsers);
              msg = 'Đã cập nhật thành công';
              res.redirect('/users/userList'); 
              // đưa lại về file phone
              

  
          } catch (error) {
              msg = 'Lỗi '+ error.message;
              console.log(error);
          }
  
      }
  
res.render('users/editUser',{msg: msg, objUser: objUser, listRole: listRole});

}

exports.deleteUser=async(req,res,next)=>{
    await myModel.userModel.deleteOne({_id:req.params.idDelUser});
    res.redirect('/users/userList');
  }
