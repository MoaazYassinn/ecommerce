import express from "express"
import { validation } from "../../middleware/validation.js"
import {  paramsIdVal } from "./user.validation.js"
import { AddUserVal, updateUserVal } from "./user.validation.js"
import { AddUser, deleteUser, getAllUser, getSingleUser, updateUser } from "./user.controller.js"
import { checkEmail } from "../../middleware/checkEmail.js"


const userRouter=express.Router()


userRouter
.route('/')
.post(validation(AddUserVal),checkEmail,AddUser)
.get(getAllUser)

userRouter
.route('/:id')
.get(validation(paramsIdVal),getSingleUser)
.put(validation(updateUserVal),updateUser)
.delete(validation(paramsIdVal),deleteUser)

export default userRouter