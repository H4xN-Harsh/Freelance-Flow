const taskModel = require('./tasks.model');

const createTask = async(req,res)=>{
    try{
        const {clientId,projectId,title,description} = req.body;
        const task = await taskModel.create({createdBy:req.user._id,clientId,projectId,title,description});
        return res.status(200).json({message:"Task created successfully! ",task});
    }catch(err){
        return res.status(500).json({message:"Internal Server Broken! "});
    }
}
const updateTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const updatedTask = await taskModel.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:"Updated successfully! ", task:updatedTask});
    }catch(err){
        return res.status(500).json({message:"Internal Server Broken! "});
    }
}
const getAllTask = async(req,res)=>{
    try{
        const tasks = await taskModel.find({createdBy:req.user._id}).populate('clientId', 'clientName clientEmail');;
        return res.status(200).json({message:"here is all task! ",tasks});
    }catch(err){
        return res.status(500).json({message:"Internal Server Broken! "});
    }
}
const deleteTask = async(req,res)=>{
    try{
        const {id} = req.params;
        await taskModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Deleted successfully! "});
    }catch(err){
        return res.status(500).json({message:"Internal Server Broken! "});
    }
}


module.exports = {createTask,updateTask,getAllTask,deleteTask}