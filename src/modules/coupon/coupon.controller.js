
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handle/handle.js";
import { ApiFeature } from "../../utils/APIFeature.js";
import { AppError } from "../../utils/AppError.js";
import { couponModel } from "../../../database/models/coupon.model.js";


const AddCoupon=catchError(async(req,res,next)=>{

    let couponExist=await couponModel.findOne({code: req.body.code})
    if (couponExist) return next(new AppError('Coupon Already Exist'));

    let coupon =new couponModel(req.body)
    await coupon.save()
    res.json({message:"success",coupon})

})

const getAllcoupons=catchError(async(req,res,next)=>{


    let apiFeature=new ApiFeature(couponModel.find({}),req.query)
    .fields().sort().pagination().search().filteration()


    let coupons =await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.pageNumber,coupons})

})

const getSinglecoupon=catchError(async(req,res,next)=>{
    let coupon=await couponModel.findById(req.params.id)
    !coupon&& res.status(404).json({message:"coupon not found "})
    coupon&&res.json({message:"success ",coupon})

})

const updateCoupon=catchError(async(req,res,next)=>{
    
    
    let coupon =await couponModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})

    !coupon&& res.status(404).json("coupon not found")
    coupon&&res.json({message:"success",coupon})
    

})

const deleteCoupon=deleteOne(couponModel)


export{
    AddCoupon,
    getAllcoupons,
    getSinglecoupon,
    updateCoupon,
    deleteCoupon

}