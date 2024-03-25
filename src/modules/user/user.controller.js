import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import { deleteOne } from "../handle/handle.js";

const AddUser=catchError(async(req,res,next)=>{
    
    let user =new userModel(req.body)
    await user.save()
    res.json({message:"success",user:{name:user.name,email:user.email}})

})

const getAllUser=catchError(async(req,res,next)=>{

    let apiFeature=new ApiFeature(userModel.find(),req.query)
   
    let users =await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.pageNumber,users})

})

const getSingleUser=catchError(async(req,res,next)=>{
    let user=await userModel.findById(req.params.id)
    !user&& res.status(404).json({message:"user not found "})
    user&&res.json({message:"success ",user})

})

const updateUser=catchError(async(req,res,next)=>{
    
    
    let user =await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

    !user&& res.status(404).json("user not found")
    user&&res.json({message:"success",user})
    

})

const deleteUser=deleteOne(userModel)

export{
    AddUser,
    getSingleUser,
    updateUser,
    getAllUser,
    deleteUser
}