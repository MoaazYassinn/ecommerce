import Joi from "joi"

 const AddUserVal=Joi.object({
    name: Joi.string().min(2).max(38).required(),
    email: Joi.string().email().required (),
    password: Joi.string().required().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    rePassword: Joi.valid(Joi.ref ('password') ).required(),
    role:Joi.string().optional().trim(),
    

})

const paramsIdVal=Joi.object({
   id:Joi.string().hex().length(24).required()

})

const updateUserVal=Joi.object({
    
    id:Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(38),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    rePassword: Joi.valid(Joi.ref ('password') ),
    role:Joi.string().valid('user','admin')
    
})





export{
    AddUserVal,
    paramsIdVal,
    updateUserVal
   
}