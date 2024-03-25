import express from "express"
import { validation } from "../../middleware/validation.js"
import { paramsIdVal } from "../address/address.validation.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"
import { addAddress, getLoggedUserAddress, removeFromaddress} from "./address.controller.js"
import { AddAddressVal } from "./address.validation.js"


const addressRouter=express.Router()


addressRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(AddAddressVal),addAddress)
.get(protectedRoutes,allowedTo('user'),getLoggedUserAddress)

addressRouter
.route('/:id')
.delete(protectedRoutes,allowedTo('admin','user'),validation(paramsIdVal), removeFromaddress)

export default addressRouter