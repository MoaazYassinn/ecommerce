import joi from "joi"

   const AddCouponVal=joi.object({
    code:joi.string().min(1).max(300).trim(),
    discount:joi.number().min(0).required(),
    expires:joi.date().required()


    
})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updateCouponVal=joi.object({
    id:joi.string().hex().length(24).required(),

    code:joi.string().min(1).max(300).trim(),
    discount:joi.number().min(0),
    expires:joi.date()


})



export{
    AddCouponVal,
    paramsIdVal,
    updateCouponVal


}