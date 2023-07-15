var express = require('express');
var router = express.Router();
var user_api = require('../controller/api/user.api');

// url : get /api/users ==> lấy danh sách
router.get('/users', user_api.listUser);

router.post('/users', user_api.addUser);

// url put : api.users/edit/123456xxx
router.put('/users/:idUser', user_api.editUser);

module.exports = router;
