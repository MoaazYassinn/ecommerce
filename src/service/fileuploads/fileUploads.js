
import multer from "multer";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";


export const fileUploadAll=()=>{
  
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'uploads/')
    },
    filename:  (req, file, cb)=> {
      cb(null,new mongoose.Types.ObjectId+"-"+ file.originalname)
    }
  })

function fileFilter (req, file, cb) {
 
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{

        cb(new AppError('images only',401), false)
    }
  
  }
  
  const upload = multer({ storage })
  return upload


}



export const uploadFileSingle=(filedname)=> fileUploadAll().single(filedname)
export const UploadFields=(fields)=>fileUploadAll().fields(fields)
export const UploadArrFiles=(filedname)=>fileUploadAll().fields(filedname,10)


