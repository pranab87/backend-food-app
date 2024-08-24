
import jwt from 'jsonwebtoken'
import bcrypt from  'bcryptjs'
import validator from 'validator'
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'

const loginUser=async(req,res)=>{
   const {email,password}=req.body;
   try{
      const user=await userModel.findOne({email});
      if(!user){
          return res.json({success:false,message:"User does not exist"});
      }
      const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.json({success:false,message:"Invalid Credentials"})
      }
      const token=createToken(user._id);
      res.json({success:true,token})
   }
   catch(error){
      console.log(error);
      res.json({success:false,message:"Error"});
   }
}


const createToken=(id)=>{
    return jwt.sign({id},process.env.jwt_secret)
}


//register user
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const exist=await userModel.findOne({email})

        if(exist){
           return res.json({success:false,message:"User Already Exist"})
        }
        if(!validator.isEmail(email))
           {
               return res.json({success:false,message:"Please  Enter A Valid Email"})
           }
           if(password.length<8)
               {
                   return res.json({success:false,message:"Please  Enter  A Strong Password"})
               }

 const salt= await bcrypt.genSalt(10);
 const hashedPassword=await bcrypt.hash(password,salt);
 const newUser=new userModel(
   {
       name:name,
       email:email,
       password:hashedPassword
   }
 )
const user= await newUser.save();
const token=createToken(user._id);
res.json({success:true,token})
               
    }
    catch(error)
    {
      console.log(error);
      res.json({success:false,message:"error"})
    }
}

//users order for frontend
const usersOrder=async(req,res)=>{
try {
    const orders=await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
}
}




export {loginUser,registerUser,usersOrder}