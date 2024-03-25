import joi from "joi"

   const AddToCartVal=joi.object({
   product:joi.string().hex().length(24).required(),
   quantity:joi.number().integer().options({convert:false})


    
})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updateCartVal=joi.object({
    id:joi.string().hex().length(24).required(),

   quantity:joi.number().integer().options({convert:false}).required()
   


})



export{
    AddToCartVal,
    paramsIdVal,
    updateCartVal


}