import joi from "joi"

   const AddToOrderVal=joi.object({
   id:joi.string().hex().length(24).required(),
   shippingAddress:joi.object({
      street:joi.string().trim().required(),
      city:joi.string().trim().required(),
      phone:joi.string().trim().required(),


   }).required()


    
})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updateCartVal=joi.object({
    id:joi.string().hex().length(24).required(),

   quantity:joi.number().integer().options({convert:false}).required()
   


})



export{
   AddToOrderVal,
    paramsIdVal,
    updateCartVal


}