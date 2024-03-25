import express from "express"
import { changePassword, protectedRoutes, signin, signup } from "./auth.controller.js"
import { validation } from "../../middleware/validation.js"
import { changePasswordVal, signinVal, signupVal } from "./auth.validation.js"
import { checkEmail } from "../../middleware/checkEmail.js"


const authRouter=express.Router()

authRouter.post('/signup',validation(signupVal),checkEmail,signup)
authRouter.post('/signin',validation(signinVal),signin)
authRouter.patch('/changePassword',protectedRoutes,validation(changePasswordVal),changePassword)




export default authRouter