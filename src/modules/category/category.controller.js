import { categoryModel } from "../../../database/models/category.model.js";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handle/handle.js";
import { ApiFeature } from "../../utils/APIFeature.js";


const AddCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.image=req.file.filename
    let category =new categoryModel(req.body)
    await category.save()
    res.json({message:"success",category})

})

const getAllCategory=catchError(async(req,res,next)=>{

    let apiFeature=new ApiFeature(categoryModel.find(),req.query)
   
    let categories =await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.pageNumber,categories})

})

const getSingleCategory=catchError(async(req,res,next)=>{
    let categories=await categoryModel.findById(req.params.id)
    !categories&& res.status(404).json({message:"categories not found "})
    categories&&json({message:"success ",categories})

})

const updateCategory=catchError(async(req,res,next)=>{
    
    if(req.body.name) req.body.slug=slugify(req.body.name)
   
    if(req.file) req.body.image=req.file.filename
    
    let category =await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

    !category&& res.status(404).json("category not found")
    category&&res.json({message:"success",category})
    

})

const deleteCategory=deleteOne(categoryModel)

export{
    AddCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
}