const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    description: {
        type: String
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required:true
    },
    price: {
        type: Number,
    },
    condition: {
        type: String
    },
    imageURL: {
        type: String
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Buyer', buyerSchema);