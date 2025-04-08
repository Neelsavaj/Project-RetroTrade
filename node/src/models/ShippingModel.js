const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingSchema = new Schema({

    paymentId:{
        type: Schema.Types.ObjectId,
        ref: "Payment",
    },
    shipping_provider:{
        type:String,
        required:true,
    },
    tracking_number:{
        type:String,
    },
    shipping_status:{
        enum:['Pending','Shipped','Delivered'],
        type:String,
        required:true
    },
    shipped_date:{
        type:Number,
        required:true,
    },
    delivered_date:{
        type:Number,
        required:true,
    },
    stateId:{
        type: Schema.Types.ObjectId,
        ref: "State",
        required:true,
    },
    cityId:{
        type: Schema.Types.ObjectId,
        ref: "City",
        required:true,
    },
    areaId:{
        type: Schema.Types.ObjectId,
        ref: "Area",
        required:true,
    },
    address:{
        type: String,
        required:true,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Shipping', shippingSchema);