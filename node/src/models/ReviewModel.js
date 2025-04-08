const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: "Buyer",
    },
    rating:{
        type:Number,
        required:true,
    },
    review_text:{
        type:String,
        required:true
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Review', reviewSchema);