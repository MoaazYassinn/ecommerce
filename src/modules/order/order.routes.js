import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"
import { AddCashOrder, createCheckOutSession, getAllOrders, getSingleOrder } from "./order.controller.js"
import { AddToOrderVal } from "./order.validation.js"


const orderRouter=express.Router()


orderRouter
.route('/')
.get(protectedRoutes,allowedTo('user'),getSingleOrder)

orderRouter
.get('/All',protectedRoutes,allowedTo('admin'),getAllOrders)


// cartRouter.post('/applyCoupon',protectedRoutes,allowedTo('admin','user'),ApplyCoupon)

orderRouter
.route('/:id')
.post(protectedRoutes,allowedTo('user','admin'),validation(AddToOrderVal),AddCashOrder)

orderRouter
.post("/checkout/:id",protectedRoutes,allowedTo('user'),createCheckOutSession)
// .delete(protectedRoutes,allowedTo('admin','user'),validation(paramsIdVal),deleteItemFromCart)

export default orderRouter