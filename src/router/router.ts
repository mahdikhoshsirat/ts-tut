import express from "express"
import{userRouter}from"./user Roter";
//import {checklogin}from"..//middleware/checklogin";
const Router = express.Router();
Router.use("/user", userRouter)
export{Router}