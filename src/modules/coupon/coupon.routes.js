import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"
import { AddCouponVal, paramsIdVal, updateCouponVal, } from "./coupon.validation.js"
import { AddCoupon, deleteCoupon, getAllcoupons, getSinglecoupon, updateCoupon } from "./coupon.controller.js"


const couponRouter=express.Router()

couponRouter.use(protectedRoutes,allowedTo('admin'))

couponRouter
.route('/')
.post(validation(AddCouponVal),AddCoupon)
.get(getAllcoupons)

couponRouter
.route('/:id')
.get(validation(paramsIdVal),getSinglecoupon)
.put(validation(updateCouponVal),updateCoupon)
.delete(validation(paramsIdVal),deleteCoupon)

export default couponRouter