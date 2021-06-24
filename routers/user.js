const express = require('express');
const router = express.Router();

const { userController } = require('../controller/index');

//router 작업시마다 추가하기
//router.method('엔드포인트', 작업한 컨트롤러)
//router.post('/login', userController.login);



module.exports = router;