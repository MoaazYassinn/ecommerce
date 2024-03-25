import mongoose from "mongoose"

export const dbConnection=()=>{
    mongoose.connect('procces.env.DB_CONNECTION')
    .then(()=>console.log('databdase is Connected'))   
    .catch((err)=>console.log(err))
}
