import express from "express"
import { validation } from "../../middleware/validation.js"
import { AddsubCategoryVal, paramsIdVal, updatesubCategoryaVal } from "./subcategory.validation.js"
import { AddsubCategory, deletesubCategory, getAllsubCategory, getSinglesubCategory, updateSubCategory } from "./subcategory.controller.js"

const subcategoryRouter=express.Router({mergeParams:true})



subcategoryRouter
.route('/')
.post(validation(AddsubCategoryVal),AddsubCategory)
.get(getAllsubCategory)

subcategoryRouter
.route('/:id')
.get(validation(paramsIdVal),getSinglesubCategory)
.put(validation(updatesubCategoryaVal),updateSubCategory)
.delete(validation(paramsIdVal),deletesubCategory)

export default subcategoryRouter