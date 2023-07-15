const {model} = require('mongoose');
var db = require('./db');
//định nghĩa cấu trúc model
const spSchema = new db.mongoose.Schema(
    //truyền vào đối tượng định nghĩa cấu trúc
    {
        name : {type: String, required : true}, // required : true : dữ liệu bắt buộc nhập
        Price : {type: Number, required : true},
        describe : {type: String, required : true},
        img : {type: String, required : false},
        roleId :  {type : db.mongoose.Schema.Types.ObjectId, ref : 'roleSpModel'},
    },
    {
        collection: "san_pham"
    }
);

// định nghĩa model
let spModel = db.mongoose.model('spModel', spSchema);

//thể loại
const roleSpSchema = new db.mongoose.Schema(
    {
        roleName : {type : String, required : true},
    },
    {
        collection : "role_sp"
    }
);

let roleSpModel = db.mongoose.model('roleSpModel', roleSpSchema);



//user

const userChema = new db.mongoose.Schema(
    {
        fullname : {type : String, required : true},
        username : {type : String, required : true},
        email : {type : String, required : true},
        password : {type : String, required : true},
        phone : {type : String, required : true},
        roleId_User : {type: db.mongoose.Schema.Types.ObjectId , ref: 'roleUserModel'},
    },
    {
        collection: "users"
    }
);

let userModel = db.mongoose.model('userModel', userChema);

//role_user

const roleUserChema = new db.mongoose.Schema(
    {
        roleName : {type : String, required : true},
    },
    {
        collection: "role_users"
    }
);

let roleUserModel = db.mongoose.model('roleUserModel', roleUserChema);

module.exports = {spModel, roleSpModel, userModel, roleUserModel}