import User,{user}from"../modole/userModel";
import {comperatoken}from"../modules/utils";
import cookieParser from "cookie-parser";
interface User{
    username:string
}
const checklogin = async (req:any , res:any , next:any) =>{
    try{
        const token = req .cookies.token;
        if (!token)throw{message:"log in to your account"};
        const username = comperatoken(token)
        const user = await User.findOne({username});
        if (token !== user?.token)
        throw{message:"please log in to your account"};
    req.body = user ?.username;
    next();
    }catch(error){
    // error.message = "Please log in to your account";
    // res.clearCookie("token");
    next({error, status:400});    
    }
};
export{checklogin}