
const client = require('./client.model');
const clientModel = require('./client.model');
const createClient = async (req,res)=>{
    try{
        const {clientName,clientPh,clientEmail,projectName,amount ,projectBrief,status} = req.body;
        const isExist = await clientModel.findOne({clientEmail,createdBy:req.user._id});
        if(!isExist){
            const client = await clientModel.create({clientName,clientPh,clientEmail,createdBy:req.user._id,project:[{projectName,projectBrief,amount,status}]});
            return res.status(201).json({message:"client has been created successfully! ",client});
        }else{
            isExist.project.push({projectName,projectBrief,amount,status});
            await isExist.save()
            return res.status(200).json({message:"This client is already available!",client:isExist});
        }

    }catch(err){
        return res.status(500).json({message:"Internal Server Broked! "})
    }
}
const getAllClients = async(req,res)=>{
    try{
        
        const clients = await clientModel.find({createdBy:req.user._id});
        return res.status(200).json({message:"All client here!",clients});
    }catch(err){
        return res.status(500).json({message:"Internal Server Broked! "})
    }
}
const getClient = async(req,res)=>{
    try{
        const {id} = req.params;
        const Client = await clientModel.findById(id);
        if(!Client)return res.status(404).json({message:"client not found! "})
        return res.status(200).json({message:"here is the your client! ",client:Client})
    }catch(err){
        return res.status(500).json({message:"Internal Server Broked! "})
    }
}
const updateClient = async(req,res)=>{
    try{
        const {id} = req.params;
        
        const updatedClient = await clientModel.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:"Client up-to-date successfully" , client : updatedClient});
    }catch(err){
        return res.status(500).json({message:"Internal server Broked! "});
    }
}
const deleteClient = async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedClient = await clientModel.findByIdAndDelete(id)
        return res.status(200).json({message:"Client deleted Successfully! " , client:deletedClient});
    }catch(err){
        return res.status(500).json({message:"Internal server Broked! "});
    }    
}


//project update
const updateProject = async(req,res)=>{
    try{
        const {clientId,projectId} = req.params;
        const {projectName,projectBrief,amount,status} = req.body;
        const client = await clientModel.findById(clientId);
        if(!client) return res.status(404).json({message:'client not found! '});
        const project = client.project.id(projectId);
        if(!project)return res.status(404).json({message:'project not found! '});
        if(projectName) project.projectName = projectName;
        if(projectBrief) project.projectBrief = projectBrief;
        if(amount) project.amount = amount;
        if(status) project.status = status;
        await client.save();
        res.status(200).json({message:"project updated!",client})
    }catch(err){
        res.status(500).json({message:'Internal Server Error! '});
    }
}

const deleteProject = async (req,res)=>{
    try{
        const {clientId,projectId} = req.params;
        const client = await clientModel.findById(clientId);
        if(!client) return res.status(404).json({message:"Client not found! "});
        client.project.pull(projectId);
        await client.save();
        res.status(200).json({message:"Project deleted! ",client});

    }catch(err){
        res.status(500).json({message:"Internal server Error! "})
    }
}
module.exports = {createClient,getAllClients,updateClient,deleteClient,getClient,deleteProject,updateProject}