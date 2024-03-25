import joi from "joi"

 const AddsubCategoryVal=joi.object({
    name:joi.string().min(2).max(100).required().trim(),
    category:joi.string().hex().length(24).required()
    
})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updatesubCategoryaVal=joi.object({
    id:joi.string().hex().length(24).required(),
    name:joi.string().min(2).max(100).trim(),
    category:joi.string().hex().length(24)



})



export{
    AddsubCategoryVal,
    paramsIdVal,
    updatesubCategoryaVal
   
}