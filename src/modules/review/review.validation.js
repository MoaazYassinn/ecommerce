import joi from "joi"

   const AddReviewVal=joi.object({
    text:joi.string().min(1).max(300).required().trim(),
    rate:joi.number().min(0).max(5).required(),
    product:joi.string().hex().length(24).required()

    
})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updateReviewaVal=joi.object({
    id:joi.string().hex().length(24).required(),
    text:joi.string().min(1).max(300).trim(),
    rate:joi.number().min(0).max(5),
    product:joi.string().hex().length(24)


})



export{
    AddReviewVal,
    paramsIdVal,
    updateReviewaVal


}