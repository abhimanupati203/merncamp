import User from '../models/user';
import {hasPassword, comparePassword} from '../helpers/auth';
import jwt from 'jsonwebtoken';

export const users = (req,res)=>{
    res.json({
        user:[{
            name:'Ryan',
            age:30
        },{
            name:'Abhilash',
            age:30
        },{
            name:'Naresh',
            age:30
        }]
    });
};

export const register = async (req,_res)=>{
    console.log('Register body',req.body);
    const  {name, email, password, secret} =req.body;
    if(!name) return _res.json({error: "Name is required"});
    if(!password || password.length < 6 ) return _res.json({error:"Password is required and should be in 6 characters long"});
    if(!secret) return _res.json({error:"Answer is required"});

    const exist = await User.findOne({email:email});

    if(exist) return _res.json({error:"Email already exists!"});

    const hashedPassword = await hasPassword(password);

    const user =  new User({name, email, password:hashedPassword, secret});
    
    try{
        await user.save();
        console.log('Registered user',user);
        return _res.json({
            ok:true
        })
    } catch(err){
        console.log('register failed', err);
        return _res.status(400).send("Error. Try again");
    }
}

export const login = async (req,_res)=>{
    console.log('Login  body',req.body);
    try{
    const {email,password} =req.body;
    const user = await User.findOne({email});
    if(!user) return _res.json({error:'No user found'});
    
    const match =await comparePassword(password, user.password);
    if(!match) return _res.json({error:'Wrong password'});

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'}); //20* 60 seconds
   
     user.password = undefined;
     user.secret =undefined;
     return _res.json({token,user});


}catch(e){
   return  _res.status(400).send('Error. try again');
}

}

export const getuser = async (req,res)=>{

   //send token in headers using POSTMAN 
   //verify the token using expressJWT 
   //if verified you will get userid
   //beased on userid find user from db
   //if found, send succesfull response

   try{
    console.log(req.user);
    const user  = await User.findById(req.auth._id);
     return { ok:true, data: res.json(user) }
   }catch(e){
    console.log(e);
   return  res.send(400);
   }

}

export const forgotPassowrd = async (req,res)=>{
    console.log(req);
    const { email, newPassword, secret} =req.body;

   if(!newPassword  || !newPassword<6){
    return res.json({
        error:"New password is required and should be min 6 characters long"
    });
   }
   if(!secret){
    return res.json({
        error:"Secret is required"
    });
   }
   const user = await User.findOne({email,secret});
   if(!user){
    return res.json({
        error:'We cant verify you with those details'
    })
   }
   try{
    const hashed= await hasPassword(newPassword);
    await User.findByIdAndUpdate(user._id,{password:hashed});
    return res.json({
        success:"Congrats"
    })

   }catch(e){
    console.log(e);
    return res.json({
        error:"Something went wrong. Try again."
    });
   }
}