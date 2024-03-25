import express from "express"
import { validation } from "../../middleware/validation.js"
import { paramsIdVal } from "../wishlist/wishlist.validation.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"
import { AddToWishlistVal } from "./wishlist.validation.js"
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js"


const wishlistRouter=express.Router()


wishlistRouter
.route('/')
.patch(protectedRoutes,allowedTo('user'),validation(AddToWishlistVal),addToWishlist)
.get(getLoggedUserWishlist)

   wishlistRouter
   .route('/:id')
   .delete(protectedRoutes,allowedTo('admin','user'),validation(paramsIdVal), removeFromWishlist)

export default wishlistRouter