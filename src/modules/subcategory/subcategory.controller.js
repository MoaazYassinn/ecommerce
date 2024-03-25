
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { subCategoryModel } from "../../../database/models/subCategory.model.js";
import { deleteOne } from "../handle/handle.js";
import { ApiFeature } from "../../utils/ApiFeature.js";


const AddsubCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let subcategory =new subCategoryModel(req.body)
    await subcategory.save()
    res.json({message:"success",subcategory})

})

const getAllsubCategory=catchError(async(req,res,next)=>{

    let filterObj={}
    if(req.params.category){
        filterObj.category=req.params.category
    }

    let apiFeature=new ApiFeature(subCategoryModel.find(filterObj),req.query)
    .fields().sort().pagination().search().filteration()


    let subcategories =await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.pageNumber,subcategories})

})

const getSinglesubCategory=catchError(async(req,res,next)=>{
    let subcategories=await subCategoryModel.findById(req.params.id)
    !subcategories&& res.status(404).json({message:"subcategories not found "})
    subcategories&&json({message:"success ",subcategories})

})

const updateSubCategory=catchError(async(req,res,next)=>{
    
    if(req.body.name) req.body.slug=slugify(req.body.name)
    
    let subcategory =await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

    !subcategory&& res.status(404).json("subcategory not found")
    subcategory&&res.json({message:"success",subcategory})
    

})

const deletesubCategory=deleteOne(subCategoryModel)


export{
    AddsubCategory,
    getAllsubCategory,
    getSinglesubCategory,
    updateSubCategory,
    deletesubCategory
}