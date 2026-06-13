const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',required:true
    },
    clientName:{
        type:String,
        required:true
    },
    clientEmail:{
        type:String,required:true,
    },
    clientPh:{
        type:String
    },
    project:[{
        projectName:{type:String,required:true},
        projectBrief:{type:String},
        amount:{type:Number},
        status:{type:String,
        enum:['active','inactive','completed'],default:'active'},
        createdAt:{type:Date,default:Date.now}
    }]
},{timestamps:true})
clientSchema.index({clientEmail:1,createdBy:1},{unique:true})
const client = mongoose.model('client',clientSchema);
module.exports = client;