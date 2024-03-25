import express from "express"
import { validation } from "../../middleware/validation.js"
import {  paramsIdVal } from "./brand.validation.js"
import { uploadFileSingle } from "../../service/fileuploads/fileUploads.js"
import { AddBrand, deleteBrand, getAllBrand, getSingleBrand, updateBrand } from "./brand.controller.js"
import { AddBrandVal, updateBrandVal } from "./brand.validation.js"


const brandRouter=express.Router()



brandRouter
.route('/')
.post(uploadFileSingle('logo'),validation(AddBrandVal),AddBrand)
.get(getAllBrand)

brandRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleBrand)
.put(uploadFileSingle('logo'),validation(updateBrandVal),updateBrand)
.delete(validation(paramsIdVal),deleteBrand)

export default brandRouter




