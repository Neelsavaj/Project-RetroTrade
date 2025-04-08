 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({

    subcategoryName:{
        type:String,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category",
    },
    subcategoryDescription:{
        type:String,
    },
},{
    timestamps: true
})
module.exports = mongoose.model('SubCategory', subcategorySchema);