const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productURL:{
        type:String,
    },
    productDescription:{
        type:String,
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subcategoryId:{
        type:Schema.Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},{
    timestamps: true
})
module.exports = mongoose.model('Product', productSchema);