const mongoose = require('mongoose');
//connect
mongoose.connect('mongodb://127.0.0.1/asm_sp')
.catch((err) => {
    console.log("loi ket noi csdl");
    console.log('err');
});
module.exports = {mongoose}