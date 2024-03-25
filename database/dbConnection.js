import mongoose from "mongoose"

export const dbConnection=()=>{
    mongoose.connect('mongodb+srv://nodecycle41:Moaazmarwa59201630@cluster0.pxqcvba.mongodb.net/nodeC41')
    .then(()=>console.log('databdase is Connected'))   
    .catch((err)=>console.log(err))
}