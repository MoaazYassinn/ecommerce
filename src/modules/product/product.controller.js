import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { productModel } from "../../../database/models/product.model.js";
import { deleteOne } from "../handle/handle.js";
import { ApiFeature } from "../../utils/ApiFeature.js";



const AddProduct=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.title)


    req.body.imageCover=req.files.imageCover[0].filename
    req.body.images=req.files.images.map((img)=>img.filename)

    let product =new productModel(req.body)
    await product.save()
    res.json({message:"success",product})

})

const getAllProducts=catchError(async(req,res,next)=>{

     let apiFeature=new ApiFeature(productModel.find(),req.query)
     .fields().sort().pagination().search().filteration()

    let products = await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.pageNumber,products})
   

})


const getSingleProduct=catchError(async(req,res,next)=>{
    let product=await productModel.findById(req.params.id)
    !product&& res.status(404).json({message:"product not found "})
    product&&json({message:"success ",product})

})


const updateProduct=catchError(async(req,res,next)=>{
    
    req.body.slug=slugify(req.body.title)
   
    if(req.files.imageCover)req.body.imageCover=req.files.imageCover[0].filename
    if(req.files.images) req.body.images=req.files.images.map((img)=>img.filename)

    
    let product =await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

    !product&& res.status(404).json("product not found")
    product&&res.json({message:"success",product})
    

})

const deleteProduct=deleteOne(productModel)


export{
    AddProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}