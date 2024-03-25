
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handle/handle.js";
import { ApiFeature } from "../../utils/APIFeature.js";
import { reviewModel } from "../../../database/models/review.model.js";
import { AppError } from "../../utils/AppError.js";


const AddReview=catchError(async(req,res,next)=>{
    req.body.user=req.user._id

    let reviewExist=await reviewModel.findOne({user: req.user._id,product:req.body.product})
    if (reviewExist) return next(new AppError('You Created a review before'));

    let review =new reviewModel(req.body)
    await review.save()
    res.json({message:"success",review})

})

const getAllreviewes=catchError(async(req,res,next)=>{


    let apiFeature=new ApiFeature(reviewModel.find({}),req.query)
    .fields().sort().pagination().search().filteration()


    let reviews =await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.pageNumber,reviews})

})

const getSinglereview=catchError(async(req,res,next)=>{
    let review=await reviewModel.findById(req.params.id)
    !review&& res.status(404).json({message:"review not found "})
    review&&res.json({message:"success ",review})

})

const updateReview=catchError(async(req,res,next)=>{
    
    
    let review =await reviewModel.findOneAndUpdate({_id:req.params.id, user:req.user._id},req.body,{new:true})

    !review&& res.status(404).json("review not found")
    review&&res.json({message:"success",review})
    

})

const deleteReview=deleteOne(reviewModel)


export{
    AddReview,
    getAllreviewes,
    getSinglereview,
    updateReview,
    deleteReview

}