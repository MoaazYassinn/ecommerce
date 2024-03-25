import joi from "joi"

 const AddProductVal=joi.object({
    title:joi.string().min(2).max(100).required().trim(),
    description:joi.string().min(10).max(500).required().trim(),
    price:joi.number().min(0).required(),
    priceAfterDiscount:joi.number().min(0).optional(),
    quantity:joi.number().min(0).required(),
    category:joi.string().hex().length(24).required(),
    subCategory:joi.string().hex().length(24).required(),
    brand:joi.string().hex().length(24).required(),
    createdBy:joi.string().hex().length(24).optional(),



    imageCover:joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required().valid('image/jpeg','image/jpg','image/png'),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    })).required(),

    images:joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required().valid('image/jpeg','image/jpg','image/png'),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    })).required()



})

const paramsIdVal=joi.object({
   id:joi.string().hex().length(24).required()

})

const updateProductVal=joi.object({
    
    id:joi.string().hex().length(24).required(),
    title:joi.string().min(2).max(100).trim(),
    description:joi.string().min(10).max(500).trim(),
    price:joi.number().min(0),
    priceAfterDiscount:joi.number().min(0),
    quantity:joi.number().min(0),
    category:joi.string().hex().length(24),
    subCategory:joi.string().hex().length(24),
    brand:joi.string().hex().length(24),
    createdBy:joi.string().hex().length(24),


    imageCover:joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required().valid('image/jpeg','image/jpg','image/png'),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    })),

    images:joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required().valid('image/jpeg','image/jpg','image/png'),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    }))

})



export{
    AddProductVal,
    paramsIdVal,
    updateProductVal
   
}