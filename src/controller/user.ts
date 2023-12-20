import User from "../modole/userModel";
import{request,response,nextFunction} from "express";
import {signupSchima} from "../validation/signupschima";
import cookie from "cookie-parser";
//import{headers}from "node-fetch"
import{comparhashstring,generatetoken,hashstring} from "../modules/utils";
//signup Router
const signup = async (req:Request, res:response ,next:nextFunction) =>{
try{
    interface user {
        password:string;
    }
    const{
        first_name,
        last_name,
        username,
        password,
        confirm_password,
        email,
        phone_number,
        national_code,
    }=req.body;
    await signupSchima.validation(req.body,{abortEarly:false});
    let user= null;
    user =await User.findOne({username});
    if(user) throw {message:"the usename is duplicated"}
    user = await User.findOne({phone_number});
    if (user) throw {message:"the phone number is duplicated"};
    user = await User.findOne({email});
    if (user)throw {message:"the email is duplicated"};
    user = await User.findOne({national_code});
    if (user) throw {message:"the national code is daplicated"};
    const hash = await hashstring(password);
    const result =await User .create({
        first_name,
        last_name,
        username,
        password:hash,
        email,
        phone_number,
        national_code,
    });
//result.save();
res.status(201).json({
    status:201,
    success:true,
    message:"mm",
    result,
});
 } catch(error){
    next({error,status:400});
 }   
};
const login = async (req:request,res:response,next:nextFunction) =>{
    const {profile,password}=req.body;
    try{
        const user = await User.findOne({
            $or:[{username:profile},{email:profile}],
        });
        if (!user) throw {message:"username or password is not corect"};
        const campera =await comparhashstring(password, user.password);
        if (!user || !campera)
        throw {message:"username or password is not corect"};
        const token = generatetoken(user.username);
        user.token=token;
        user.save();
        res.cookie("token",token,{
            httpOnly:true,
            samesite:"strict",
            secure:true,
        });
        res.status(200).json({
            status:200,
            succes:true,
            message:"you have successfully logged in to your account",
        });
    }catch(error){
     next({error,status:400});
    }
};
const logout = async (req:request,res:response,next:nextFunction) => {
  try{
    const {username} = req.body;
    await User.updateOne({username},{$set:{token:""} });
    res.clearcookie("token");
    res.status(200).json({
        message:"yu have successfully logged out of your account",
        status:200,
        success:true,
    });
  }  catch(error){
    next({error,status:400});
  }
  const dllacc = async (req:request,res:response,next:nextFunction) =>{
  try{
   const {username}=req.body
   await User.deleteOne({username})
   res.status(200).json({
    message:"your acount has been successfully deleted ",
    status:200,
    success:true,
   }); 
  }catch(error){
    next ({error,status:400});
  }
};
const edit=async(req:request,res:response,next:nextFunction) =>{
    try{
        const {username}=req.body
        const user=await User.findOne({username})
        if (!user)throw {message:"user is not found"}
        await User.updateOne(req.body)
    }catch(error){
        next({error,status:400});
    }
}
};
export{signup,login,logout};
