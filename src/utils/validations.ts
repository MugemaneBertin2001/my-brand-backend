import Joi from "joi";
import { IUser } from "../models/userModel";
import { IBlog } from "../models/blogModel";
import { IMessage } from "../models/messageModel";

// login validation
export const loginDataValidation = (login:{email:String,password:String})=>{
    const loginSchema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required(),
    })
    return loginSchema.valid(login);
}
// signup validation

export const registerValidation = (
    user:{
        fullName:string, role: 
        string, email: string, 
        password:string
    })=>{

    const userSchema = Joi.object<IUser>({
        fullName: Joi.string().required(),
        role: Joi.string().valid(...["user","admin"]).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required()
    })
    return userSchema.validate(user)
}

// blog posting validation 

export const blogPostingValidation = (
    blog:{
        title:string,
        content: string,
        blogImage: string,
    }
    )=>{
        const blogSchema = Joi.object<IBlog>({
           title:Joi.string().required(),
           content: Joi.string().required(),
           blogImage: Joi.string().required() 
        })
        return blogSchema.validate(blog)

}

// message sending validation

export const messageSendinValidation = (
    message:{}
)=>{
    const messageSchema = Joi.object<IMessage>({
        fullName : Joi.string().required(),
        email: Joi.string().email().required(),
        messageBody : Joi.string().required(),

    })

    return messageSchema.validate(message)
}

// comment validation

export const commentValidation = (
    comment:{}
    )=>{

}