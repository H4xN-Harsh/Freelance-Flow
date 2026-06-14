const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',required:true
    },clientId:{
        type:mongoose.Schema.Types.ObjectId,ref:'client',required:true
    },projectId:{
        type:mongoose.Schema.Types.ObjectId,required:true
    },title:{type:String,required:true},
    description:{type:String},
    status:{
        type:String,enum:['todo','in-progress','done'],default:'todo'
    }
},{timestamps:true})
module.exports = mongoose.model("Task",taskSchema);