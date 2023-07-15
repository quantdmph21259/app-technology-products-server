var fs = require('fs');

var myModel = require('../models/sanpham.model');
const { log } = require('console');

exports.list = async (req, res, next) => {
  // thêm điều kiện lọc ở đây

  // let loc_dienthoai = {roleId : "64230cecd769d18b316b8311"}
  var nameSp = req.query.nameSp;
  var regexp = new RegExp(nameSp);
  let dieukienloc = {name: regexp}

  //xắp xếp
  let sortSp = req.query.sortSp || 1; // mặc định tăng dần



  let list = await myModel.spModel.find(dieukienloc).sort({Price : sortSp}).populate('roleId'); // tự động tham chiếu đến collection thể loại
  // console.log(list);

//
let msg = " ";

let listRole =  await myModel.roleSpModel.find();

if(req.method== 'POST'){
  console.log(req.body);
  //kiểm tra dữ liệu hợp lệ nếu có

  //tạo model để gán dữ liệu
  let objSP = new myModel.spModel();
  objSP.name = req.body.name;
  objSP.Price = req.body.Price;
  objSP.describe = req.body.describe;
  objSP.roleId = req.body.roleId;
  objSP.img = req.body.img;
  //ghi vào csdl
  try{
    let new_sp = await objSP.save();
    console.log(new_sp);
    msg = 'thêm sản phẩm thành công'
    res.redirect('/sp/phone'); // đưa lại về file phone
  } catch (error)
  {
    msg = 'lỗi thêm mới' + error.message;
    console.log(error);
  }
}

  res.render('sanpham/phone', {listSp : list, msg: msg, listRole: listRole, sortSp : sortSp});
};

exports.list_dienthoai = async (req, res, next) => {
  // thêm điều kiện lọc ở đây

  //tìm kiếm điện thoại
  var name_phone = req.query.name_phone;
  var regexp = new RegExp(name_phone);

  //xắp xếp
  let sortDienThoai = req.query.sortDienThoai || 1; // mặc định tăng dần


  let loc_dienthoai = {roleId : "64230cecd769d18b316b8311", name: regexp}

  let list_dienthoai = await myModel.spModel.find(loc_dienthoai).sort({Price: sortDienThoai}).populate('roleId'); // tự động tham chiếu đến collection thể loại

  res.render('sanpham/dienthoai', {list_dienthoai : list_dienthoai, sortDienThoai: sortDienThoai})
};

exports.list_laptop = async (req, res, next) => {
  // thêm điều kiện lọc ở đây

  //tìm kiếm
  var name_laptop = req.query.name_laptop;
  var regexp = new RegExp(name_laptop);

  //xắp xếp
  let sortLaptop = req.query.sortLaptop || 1; // mặc định tăng dần
  

  let loc_laptop = {roleId : "64230cecd769d18b316b8312", name: regexp}

  let list_laptop = await myModel.spModel.find(loc_laptop).sort({Price: sortLaptop}).populate('roleId'); // tự động tham chiếu đến collection thể loại

  res.render('sanpham/laptop', {list_laptop: list_laptop, sortLaptop: sortLaptop})
};

exports.list_tablet= async (req, res, next) => {
  // thêm điều kiện lọc ở đây

  let loc_tablet = {roleId : "64230d57d769d18b316b8313"}

  let list_tablet= await myModel.spModel.find(loc_tablet).populate('roleId'); // tự động tham chiếu đến collection thể loại

  res.render('sanpham/tablet', {list_tablet: list_tablet})
};

exports.list_maytinh = async (req, res, next) => {
  // thêm điều kiện lọc ở đây

  let loc_maytinh = {roleId : "64230d57d769d18b316b8314"}

  let list_maytinh = await myModel.spModel.find(loc_maytinh).populate('roleId'); // tự động tham chiếu đến collection thể loại

  res.render('sanpham/maytinh', {list_maytinh : list_maytinh})
};

exports.list_tainghe = async (req, res, next) => {
  // thêm điều kiện lọc ở đây

  let loc_tainghe = {roleId : "64230d6ed769d18b316b8315"}

  let list_tainghe = await myModel.spModel.find(loc_tainghe).populate('roleId'); // tự động tham chiếu đến collection thể loại

  res.render('sanpham/tainghe', {list_tainghe : list_tainghe})
};

// exports.add_Sp = async (req,res,next) => {
//   //khai báo biến thông tin
//   let msg = " ";

//   let listRole =  await myModel.roleSpModel.find();

//   if(req.method== 'POST'){
//     console.log(req.body);
//     //kiểm tra dữ liệu hợp lệ nếu có

//     //tạo model để gán dữ liệu
//     let objSP = new myModel.spModel();
//     objSP.name = req.body.name;
//     objSP.Price = req.body.Price;
//     objSP.describe = req.body.describe;
//     objSP.roleId = req.body.roleId;
//     objSP.img = req.body.img;
//     //ghi vào csdl
//     try{
//       let new_sp = await objSP.save();
//       console.log(new_sp);
//       msg = 'thêm sản phẩm thành công'
//     } catch (error)
//     {
//       msg = 'lỗi thêm mới' + error.message;
//       console.log(error);
//     }
//   }

//   res.render('sanpham/phone', {msg: msg, listRole: listRole});
// };

exports.edit_Sp= async (req,res,next) => {
  let msg = " ";
  let idSp = req.params.idSp;
  //lấy thông tin sản phẩm để sửa, tự thêm khối try catch đê bắt lỗi

      let objSp = await myModel.spModel.findById(idSp);
      let listRole = await myModel.roleSpModel.find(); // listRole phải là bảng thể loại
      console.log(listRole);

      if(req.method =='POST'){
          // kiểm tra hợp lệ dữ liệu nếu có....
  
          // tạo model để gán dữ liệu
          let objSP = new myModel.spModel();
          objSP.name = req.body.name;
          objSP.Price = req.body.Price;
          objSP.describe = req.body.describe;
          objSP.roleId = req.body.roleId;
          objSP.img = req.body.img;
  
          objSP._id = idSp;// thêm cho chức năng sửa
          // ghi vào CSDL
          try {
              // let new_sp = await objSP.save();
              // console.log(new_sp);
              // msg = 'Thêm mới thành công';
  
              await myModel.spModel.findByIdAndUpdate(idSp, objSP);
              msg = 'Đã cập nhật thành công';
              res.redirect('/sp/phone'); 
              // đưa lại về file phone
              

  
          } catch (error) {
              msg = 'Lỗi '+ error.message;
              console.log(error);
          }
  
      }
  
res.render('sanpham/editSp',{msg: msg, objSp: objSp, listRole: listRole});
}

exports.showDetail = async (req,res, next) => {
  let idSpdetail = req.params.idSpdetail;

  //lấy id
  let objDetail = await myModel.spModel.findById(idSpdetail).populate('roleId');
  let listRole = await myModel.roleSpModel.find();

  let objSpDetail = new myModel.spModel();
  objSpDetail._id = idSpdetail;


  let detail = await myModel.spModel.find().populate('roleId');

  res.render('sanpham/spDetails', {detail : detail, objDetail: objDetail, listRole: listRole});
}

exports.deleteSp=async(req,res,next)=>{ 
  await myModel.spModel.deleteOne({_id:req.params.idDel});
  res.redirect('/sp/phone');
}

//list thể loại
exports.listRoleSp = async(req, res, next) => {
  let list = await myModel.roleSpModel.find(); // tự động tham chiếu đến collection thể loại
  res.render('TheLoai/List_TheLoai', {list_Role : list});
}


// thêm thể loại
exports.addRole = async(req, res, next) => {
  //
let msg = " ";


if(req.method== 'POST'){
  console.log(req.body);
  //kiểm tra dữ liệu hợp lệ nếu có

  //tạo model để gán dữ liệu
  let objRole = new myModel.roleSpModel();
  objRole.roleName = req.body.roleName;
  //ghi vào csdl
  try{
    let new_role = await objRole.save();
    console.log(new_role);
    msg = 'thêm sản phẩm thành công'
    res.redirect('/sp/list_Role'); // đưa lại về file phone
  } catch (error)
  {
    msg = 'lỗi thêm mới' + error.message;
    console.log(error);
  }
}
res.render('TheLoai/List_TheLoai', {msg: msg});
};

// xóa thể loại
exports.deleteRole=async(req,res,next)=>{ 
  await myModel.roleSpModel.deleteOne({_id:req.params.idRoleDel});
  res.redirect('/sp/list_Role');
}



