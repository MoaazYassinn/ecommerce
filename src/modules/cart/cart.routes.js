import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"
import { AddToCartVal, paramsIdVal, updateCartVal } from "./cart.validation.js"
import { AddCart, ApplyCoupon, clearUserCart, deleteItemFromCart, getLoggedUserCart, updateCart } from "./cart.controller.js"


const cartRouter=express.Router()


cartRouter
.route('/')
.post(protectedRoutes,allowedTo('user','admin'),validation(AddToCartVal),AddCart)
.get(protectedRoutes,allowedTo('user','admin'),getLoggedUserCart)
.delete(protectedRoutes,allowedTo('admin','user'),clearUserCart)


cartRouter.post('/applyCoupon',protectedRoutes,allowedTo('admin','user'),ApplyCoupon)

cartRouter
.route('/:id')
.put(protectedRoutes,allowedTo('user','admin'),validation(updateCartVal),updateCart)
.delete(protectedRoutes,allowedTo('admin','user'),validation(paramsIdVal),deleteItemFromCart)

export default cartRouter