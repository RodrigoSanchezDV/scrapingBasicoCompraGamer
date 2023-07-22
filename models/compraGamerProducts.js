import mongoose from "mongoose";

const schema = new mongoose.Schema({
    category:  {
        type:String, 
        required:true
    },
    name:  {
        type:String, 
        required:true
    }, // String is shorthand for {type: String}
    price:   {
        type:String, 
        required:true
    },
    img: {
        type:String, 
    },
    /* isDeleted:{
        type:Boolean,
        default:false
    }, */
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date},
    deletedAt:{type:Date, default:null},
},{
    versionKey:false
});

const productModel = mongoose.model("Product",schema);

export default productModel;