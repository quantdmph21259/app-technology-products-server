var myModel = require('../models/sanpham.model');

exports.index = async (req, res, next) => {
  let msg = ' ';
  let icon_warning = ' ';

    if(req.method === 'POST'){
      // lấy thông tin usser đăng nhập
      try {
        let objLogin = await myModel.userModel.findOne({username: req.body.username});
        console.log(objLogin);

        if(objLogin != null){
          //tồn tại username == ktra pass
          if(objLogin.password == req.body.password) {
            req.session.userLogin = objLogin;
            return res.redirect('/sp/phone');
          }
          else {
            msg = "sai password";
            icon_warning = "bi bi-exclamation-triangle";
          }
        }
        else{
          msg = 'không tồn tại user' + req.body.username;
          icon_warning = "bi bi-exclamation-triangle";
        }
      } catch (error) {
        msg = 'Lỗi đăng nhập ' + error.message;
        icon_warning = "bi bi-exclamation-triangle";
      }
    }

    res.render('Login/login',{msg:msg, icon_warning: icon_warning});
    // res.render('Login/login');
  };

  exports.register = async (req, res, next) => {


    //
let msg = " ";

let listRole_User =  await myModel.roleUserModel.find();

if(req.method== 'POST'){
  console.log(req.body);
}

//   // kiểm tra dữ liệu hợp lệ nếu có
if(req.body.password != req.body.re_pass){
  msg = 'password không trùng khớp'
  return res.render('Login/register', {msg: msg});
}
 
  //ghi vào csdl
  try{

     //tạo model để gán dữ liệu
  let objUser = new myModel.userModel();
  objUser.fullname = req.body.fullname;
  objUser.username = req.body.username;
  objUser.email = req.body.email;
  objUser.password = req.body.password;
  objUser.phone = req.body.phone;
  objUser.roleId_User = '64230d8fde7becacaf02eaa3';

    let new_user = await objUser.save();
    console.log(new_user);
    msg = 'đăng ký thành công'
    res.redirect('/'); // đưa lại về file login
  } catch (error)
  {
    msg = 'lỗi đăng ký' + error.message;
    console.log(error);
  }


  res.render('Login/register', { msg: msg, listRole_User: listRole_User});

    // res.render("Login/register");
  };

  
