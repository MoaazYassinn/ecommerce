import { AppError } from "../utils/AppError.js"


export const validation=(schema)=>{

    return(req,res,next)=>{
        let filter={}
        if(req.file) {
            filter={image:req.file,...req.params,...req.body,...req.query}
        }
        else if(req.files){
            filter={...req.files,...req.params,...req.body,...req.query}

        }
        else{
              filter={...req.params,...req.body,...req.query}
        }
        const {error}=schema.validate(filter,{abortEarly:false})
        
        if(!error){
                next()
        }else{

            let errmsg=[]
            error.details.forEach((val) => {
                errmsg.push(val.message)
                
            });
            next(new AppError(errmsg,401))
           
        }
    }
   

   
}
