import joi from "joi"

   const AddAddressVal=joi.object({
        street:joi.string().required().trim(),
        city:joi.string().required().trim(),
        phone:joi.string().required().trim()
   

    
})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updateAddressVal=joi.object({
    id:joi.string().hex().length(24).required(),
    street:joi.string().trim(),
    city:joi.string().trim(),
    phone:joi.string().trim()

})



export{
    AddAddressVal,
    paramsIdVal,
    updateAddressVal


}