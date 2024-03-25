import express from "express"
import { validation } from "../../middleware/validation.js"
import { AddReview, deleteReview, getAllreviewes, getSinglereview, updateReview } from "./review.controller.js"
import { paramsIdVal } from "../review/review.validation.js"
import { AddReviewVal, updateReviewaVal } from "./review.validation.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"


const reviewRouter=express.Router()


reviewRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),validation(AddReviewVal),AddReview)
.get(getAllreviewes)

reviewRouter
.route('/:id')
.get(validation(paramsIdVal),getSinglereview)
.put(protectedRoutes,allowedTo('user'),validation(updateReviewaVal),updateReview)
.delete(protectedRoutes,allowedTo('admin;','user'),validation(paramsIdVal),deleteReview)

export default reviewRouter