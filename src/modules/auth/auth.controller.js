
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js"
import { userModel } from "../../../database/models/user.model.js"
import { sendEmails } from "../Emails/emails.js"
import { AppError } from "../../utils/AppError.js"

 const signup=catchError(async(req,res)=>{
    let user=new userModel(req.body)
    await user.save()
    let token=Jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    res.json({message:"success",token})

})

const signin=catchError(async(req,res,next)=>{
    let user=await userModel.findOne({email:req.body.email})
    if(user&&bcrypt.compareSync(req.body.password,user.password)){
        let token=Jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        return res.json({message:"success",token})
    }
    next(new AppError('incorrect email or password',401))
    

})
const changePassword=catchError(async(req,res,next)=>{
    let user=await userModel.findById(req.user._id)

    if(user&&bcrypt.compareSync(req.body.password,user.password)){

        let token=Jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        await userModel.findByIdAndUpdate(req.params.id,{password:req.body.newPassword,changePasswrdAt:Date.now()})

        return res.json({message:"success",token})
    }
    next(new AppError('incorrect email or password',401))
    
})


const protectedRoutes=catchError(async(req,res,next)=>{
    let {token}=req.headers

    if(!token) return next(new AppError('token must be provided',401))

    let decoded =Jwt.verify(token,process.env.JWT_KEY)

    let user = await userModel.findById(decoded.userId)
    if(!user) return next(new AppError("user not found",401))
    

    if(user.changePasswrdAt){

        let time=parseInt(user?.changePasswrdAt.getTime()/1000)

        if(time>decoded.iat){
            return next(new AppError("invalid token...login again"))
            
        }
    }

    req.user=user

    next()

    
})

const allowedTo=(...roles)=>{

   return catchError(async(req,res,next)=>{
        if(!roles.includes(req.user.role)) return next(new AppError("you are not authorized",401))

        next()

    
    })
}




export{
    signin,
    signup,
    changePassword,
    protectedRoutes,
    allowedTo
  
}
