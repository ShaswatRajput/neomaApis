const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    propertyName:{
        type:String,
        required:true
        },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    },
    owner:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    }
   
})

module.exports = mongoose.model("property",propertySchema)