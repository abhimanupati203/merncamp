const express = require('express');
const {getPosts, createPost} =  require('../controllers/posts');
const router = express.Router();
const {createPostValidator} = require('../validator');
const {requireSignin} = require('../controllers/auth');
const { userById } =require('../controllers/user');

router.get('/posts',  getPosts);


router.post('/post/new/:userId',requireSignin,  createPost);
router.param('userId', userById);
module.exports = router;
