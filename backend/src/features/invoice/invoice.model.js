const mongoose = require('mongoose');
const invoiceSchema = mongoose.Schema({
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    clientId:{type:mongoose.Schema.Types.ObjectId,ref:'client',required:true},
    projectId:{type:mongoose.Schema.Types.ObjectId,required:true},
    invoiceNo:{type:String,required:true,unique:true},
    amount:{type:Number,required:true},
    dueDate:{type:Date,required:true},
    status:{
        type:String,enum:['pending','paid','overdue'],default:'pending'
    }
},{timestamps:true});
module.exports = mongoose.model('Invoice',invoiceSchema);