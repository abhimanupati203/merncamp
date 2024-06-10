
const express = require('express');
const {signup, sigin, signout} =  require('../controllers/auth');
const { userById } =require('../controllers/user');
const router = express.Router();
// const {userSignupValidator} = require('../validator');


router.post('/signup',  signup);
router.post('/signin',  sigin);
router.get('/signout',  signout);
router.param('userId', userById);
module.exports = router;
