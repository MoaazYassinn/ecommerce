import express from "express"
import { validation } from "../../middleware/validation.js"
import { UploadFields } from "../../service/fileuploads/fileUploads.js"
import { AddProductVal, paramsIdVal, updateProductVal } from "./product.validation.js"
import { AddProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "./product.controller.js"



const productRouter=express.Router()



productRouter
.route('/')
.post(UploadFields([
    {name:'imageCover',maxCount:1},
    {name:'images',maxCount:10}
]),validation(AddProductVal),AddProduct)
.get(getAllProducts)

productRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleProduct)
.put(UploadFields([
    {name:'imageCover',maxCount:1},
    {name:'images',maxCount:10}
]),validation(updateProductVal),updateProduct)
.delete(validation(paramsIdVal),deleteProduct)

export default productRouter