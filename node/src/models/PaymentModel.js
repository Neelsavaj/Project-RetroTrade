const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    buyerId:{
        type: Schema.Types.ObjectId,
        ref: "Buyer",
    },
    payment_date:{
        type:Number
    },
    payment_status:{
        type: String,
        required:true
    },
    payment_method:{
        enum:['Credit Card','G-pay'],
        type:String,
        required:true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Payment', paymentSchema);