const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required:true
    },

    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required:true,
    },



}, {
    timestamps: true
})
module.exports = mongoose.model('Cart', cartSchema);