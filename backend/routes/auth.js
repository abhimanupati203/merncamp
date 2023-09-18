import express from 'express';

import { users, register, login, getuser, forgotPassowrd} from '../controllers/auth';
import { requireSignin } from '../middlewares';


const router = express.Router();

router.get('/users',users);

router.get('/pointofcontact',requireSignin, getuser);
router.post('/forgot-password', forgotPassowrd);
router.post('/register',register);
router.post('/login',login);

module.exports= router;