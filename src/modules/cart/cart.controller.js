
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { couponModel } from "../../../database/models/coupon.model.js";

const CalcTotalPrice=(cart)=>{
    let totalPrice=0
        cart.cartItems.forEach((item)=>{
            totalPrice+=item.quantity*item.price
        })

        cart.totalPrice=totalPrice
      if(cart.discount){
        let  totalAfterDiscount=cart.totalPrice-(cart.totalPrice*cart.discount)/100
       cart.totalAfterDiscount=totalAfterDiscount
      }
}



const AddCart=catchError(async(req,res,next)=>{

    let product=await productModel.findById(req.body.product)
    if(!product) return next(new AppError('product not found ',404))

    if(product.quantity<req.body.quantity) return next(new AppError('sold out',404))

    req.body.price=product.price

    let cartExist=await cartModel.findOne({user: req.user._id})

    if (!cartExist) {
        let cart =new cartModel({
            user:req.user._id,
            cartItems:[req.body]
        })
        CalcTotalPrice(cart)
       await cart.save()
       !cart&& res.status(404).json({message:"cart not found "})
       cart&&res.json({message:"success ",cart})

    }
    else{

        let item= cartExist.cartItems.find((item)=>item.product==req.body.product)

        if(item) {

            if(item.quantity>=product.quantity) return next(new AppError('sold out ',404))
            item.quantity+=req.body.quantity||1
        }
        else cartExist.cartItems.push(req.body)

        
        CalcTotalPrice(cartExist)
        await cartExist.save()
        res.json({message:"success",cart:cartExist})
    }

    

})




const updateCart=catchError(async(req,res,next)=>{
    
    
    let cart =await cartModel.findOne({user:req.user._id})
      
    let item=cart.cartItems.find(item=>item._id==req.params.id)

    if(!item) return next(new AppError('item not found'))
    
    item.quantity=req.body.quantity

    CalcTotalPrice(cart)
    await cart.save()

    cart&&res.json({message:"success",cart})
    

})

const deleteItemFromCart=catchError(async(req,res,next)=>{
    
    
    let cart =await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    CalcTotalPrice(cart)

    await cart.save()
    !cart&& res.status(404).json("cart not found")
    cart&&res.json({message:"success",cart})
    

})

const getLoggedUserCart=catchError(async(req,res,next)=>{
    
    
    let carts  =await cartModel.findOne({user:req.user._id}).populate('cartItems.product')

    !carts&& res.status(404).json("carts not found")
    carts&&res.json({message:"success",carts})
    

})

const clearUserCart=catchError(async(req,res,next)=>{
    
    
    let carts  =await cartModel.findOneAndDelete({user:req.user._id})

    !carts&& res.status(404).json("carts not found")
    carts&&res.json({message:"success",carts})
    

})

const ApplyCoupon=catchError(async(req,res,next)=>{
    
    
    let coupon =await couponModel.findOne({code:req.body.coupon,expires:{$gte:Date.now()}})
     if(!coupon) return next(new AppError('coupon not found ',404))


    let cart  =await cartModel.findOne({user:req.user._id})
     if(!cart)return next(new AppError('cart not found ',404))

    let  totalAfterDiscount=cart.totalPrice-(cart.totalPrice*coupon.discount)/100
          cart.totalAfterDiscount=totalAfterDiscount
          cart.discount=coupon.discount


   await cart.save()

   res.json({message:"success",cart})
    

})




export{
    AddCart,
    updateCart,
    deleteItemFromCart,
    getLoggedUserCart,
    clearUserCart,
    ApplyCoupon

}