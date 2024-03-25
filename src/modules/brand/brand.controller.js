import { brandModel } from "../../../database/models/brand.model.js";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handle/handle.js";
import { ApiFeature } from "../../utils/ApiFeature.js";



const AddBrand=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file.filename
    let brand =new brandModel(req.body)
    await brand.save()
    res.json({message:"success",brand})

})

const getAllBrand=catchError(async(req,res,next)=>{

    let apiFeature=new ApiFeature(brandModel.find(),req.query)
     .fields().sort().pagination().search().filteration()

    let brand = await apiFeature.mongooseQuery
    res.json({message:"success",brand})

})


const getSingleBrand=catchError(async(req,res,next)=>{
    let brand=await brandModel.findById(req.params.id)
    !brand&& res.status(404).json({message:"brand not found "})
    brand&&json({message:"success ",page:apiFeature.pageNumber,brand})

})

const updateBrand=catchError(async(req,res,next)=>{
    
    if(req.body.name) req.body.slug=slugify(req.body.name)
   
    if(req.file) req.body.logo=req.file.filename
    
    let brand =await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

    !brand&& res.status(404).json("brand not found")
    brand&&res.json({message:"success",brand})
    

})

const deleteBrand=deleteOne(brandModel)


export{
    AddBrand,
    getAllBrand,
    getSingleBrand,
    updateBrand,
    deleteBrand
}