const express = require('express');
const { registerUser,authUser,allUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router=express.Router();
//the register user and the auth-user are the two controllers over here
router.route('/').post(registerUser).get(protect,allUsers);

router.post("/login", authUser);
module.exports=router;