
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Oy1FIP2hJk8qPBlkyob73sdHozivO00Ea7dFzsDsxqsi4MxloGeVbMiQQPAbcFzhtRLBUMDLzbaXbsSrrFuIOtJ00I5M1xgPt');




const AddCashOrder=catchError(async(req,res,next)=>{

    let cart=await cartModel.findById(req.params.id)
    if(!cart) return next(new AppError('cart not found ',404))

    let totalOrderPrice=cart.totalAfterDiscount?cart.totalAfterDiscount:cart.totalPrice
  let order=new orderModel({
    user:req.user._id,
    orderItems:cart.cartItems,
    totalOrderPrice,
    shippingAddress:req.body.shippingAddress

    
  })
 await order.save()

 if(order){
  let options=cart.cartItems.map((prod)=>{
    return{
               updateOne:{
                 "filter":{ _id:prod.product},
                 "update":{$inc:{sold:prod.quantity,quantity: -prod.quantity}}
               }
     }
   
    })
    await productModel.bulkWrite(options)
 }
 
 else{
  return next(new AppError('cart not found ',404))
 }

 await cartModel.findByIdAndDelete(req.params.id)

   res.json({message:"succes",order})

})


const getSingleOrder=catchError(async(req,res,next)=>{

  let order=await orderModel.findOne({user:req.user._id}).populate('cartItems.product')
  res.json({message:"success",order})

})


const getAllOrders=catchError(async(req,res,next)=>{

  let order=await orderModel.find({})
  res.json({message:"success",order})

})


const createCheckOutSession=catchError(async(req,res,next)=>{

  const cart=await cartModel.findById(req.params.id)

  const totalOrderPrice=cart.totalAfterDiscount?cart.totalAfterDiscount:cart.totalPrice

  let session=await stripe.checkout.sessions.create({

    line_items:[{
      price_data:{
        currency:"egp",
        unit_amount:totalOrderPrice*100,
        product_data:{
          name:req.user.name

        }


      },
      quantity:1

    }],

    mode:'payment',
    success_url:"https://route-comm.netlify.app/#/",
    cancel_url:"https://route-comm.netlify.app/#/cart",
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress

    

  })
  res.json({message:"success",session})

})








export{
    AddCashOrder,
    getSingleOrder,
    getAllOrders,
    createCheckOutSession
 

}