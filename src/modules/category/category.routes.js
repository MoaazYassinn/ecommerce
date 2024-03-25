import express from "express"
import { AddCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "./category.controller.js"
import { validation } from "../../middleware/validation.js"
import { AddCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js"
import { uploadFileSingle } from "../../service/fileuploads/fileUploads.js"
import subcategoryRouter from "../subcategory/subcategory.routes.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"


const categoryRouter=express.Router()

categoryRouter.use('/:category/subcategories',subcategoryRouter)

categoryRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'),uploadFileSingle('image'),validation(AddCategoryVal),AddCategory)
.get(getAllCategory)

categoryRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleCategory)
.put(protectedRoutes,uploadFileSingle('image'),validation(updateCategoryVal),updateCategory)
.delete(protectedRoutes,validation(paramsIdVal),deleteCategory)

export default categoryRouter