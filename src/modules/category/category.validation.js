import joi from "joi"

 const AddCategoryVal=joi.object({
    name:joi.string().min(2).max(100).required().trim(),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required().valid('image/jpeg','image/jpg','image/png'),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    }).required()

})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updateCategoryVal=joi.object({
    name:joi.string().min(2).max(100).trim(),
    id:joi.string().hex().length(24).required(),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required().valid('image/jpeg','image/jpg','image/png'),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    })

})



export{
    AddCategoryVal,
    paramsIdVal,
    updateCategoryVal
   
}