import { Schema,model,document } from "mongoose";
import { string } from "yup";
export interface user extends document {
    first_name:string;
    last_name:string;
    username:string;
    password:string;
    confirm_password:string;
    email:string;
    national_code:string;
    token:string;
}
const userSchema =new Schema<user>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        confirm_password: { type: String },
        email: { type: String, required: true },
        phone_number: { type: String, required: true },
        national_code: { type: String, required: true },
        token: { type: String, default: "" },
  //     roles: { type: String, default: "" },
    //     otp: {
    //       value: { type: String },
    //       expireIn: { type: Number },
    }
    //   },
  //   { timestamps: true }
);
export default model <user>("Usermodel", userSchema);
//export{userModel}