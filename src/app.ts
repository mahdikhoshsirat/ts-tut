import * as dotenv from "dotenv";
dotenv.config()
import express,{Express,request,response,nextfunction} from "express";
import mongoose from "mongoose";
import {Router} from "./router/router";
import {errorHandler,notFound} from"./errors/errors";
import cookieParser from "cookie-parser";
import {comperatoken} from "./modules/utils";
const app = express
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0").then(()=>{
    console.log("DB connecting...");
});
app.use(express.json())
app.use(express.uelencoded({extended:true}));
app.use(cookieParser())
app.use("/",Router);
app.use(errorHandler);
app.use(notFound);
app.listen(3000,()=> console.log("server is runing..."));