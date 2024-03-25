
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short product name'],
        maxlength:[100,'too long product name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description:{
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [10, 'too short description name'],
        maxlength:[500,'too long description name']

    },
    imageCover:String,
    images:[],

    price:{
        type:Number,
        required:true,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:0

    },
    quantity:{
      type:Number,
       min:0,
       default:0

    },
    sold:Number,
    rateAvg:{
        type:Number,
        max:5,
        min:0
    },
    rateCount:{
        type:Number,
        min:0,
        default:0
    }
    ,
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'subCategory'
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }

},{ timestamps: true , toJSON: { virtuals: true }})

schema.post('init',function(doc){

    if(doc.imageCover||doc.images){

        doc.imageCover=process.env.BASE_URL+"uploads/"+doc.imageCover;
        doc.images=doc.images?.map((images)=>process.env.BASE_URL+"uploads/"+images);
    }

})

schema.virtual('myReviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
    justOne: true
  });

  schema.pre('findOne',function(){
      this.populate('myReviews')
  })

export const productModel = mongoose.model('product', schema)



