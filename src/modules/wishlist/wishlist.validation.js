import joi from "joi"

   const AddToWishlistVal=joi.object({
   
    product:joi.string().hex().length(24).required()

    
})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updateWishlistVal=joi.object({
    product:joi.string().hex().length(24).required(),

})



export{
    AddToWishlistVal,
    paramsIdVal,
    updateWishlistVal


}