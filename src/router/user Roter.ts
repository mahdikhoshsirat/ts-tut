import express from "express"
import {login,logout,signup} from "../controller/user";
import { checklogin } from "../middleware/checklogin";
const userRouter = express.Router();
userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.put("logout",checklogin,logout)
export{userRouter}