const invoiceModel = require('./invoice.model');
const createInvoice = async(req,res)=>{
    try{
        const {clientId,projectId,amount,dueDate} = req.body;
        const today = new Date();
        const dateStr = `${today.getFullYear()}${String(today.getMonth()+1).padStart(2,"0")}${String(today.getDate()).padStart(2,"0")}`;
        const cnt = await invoiceModel.countDocuments({
            invoiceNo:{$regex:`INV-${dateStr}`}
        });
        const invoiceNo = `INV-${dateStr}-${String(cnt+1).padStart(3,'0')}`;
        const invoice = await invoiceModel.create({
            createdBy:req.user._id,clientId,projectId,amount,dueDate,invoiceNo
        });
        return res.status(201).json({message:"invoice Created! ",invoice});
    }catch(err){
        return res.status(500).json({message:"Internal server Broken! "})
    }
}
const getAllInvoice = async(req,res)=>{
    try{
        const invoices = await invoiceModel.find({createdBy:req.user._id});
        return res.status(200).json({message:"all invoices here! ",invoices})
    }catch(err){
        return res.status(500).json({message:"Internal server Broken! "})
    }
}
const updateInvoice = async(req,res)=>{
    try{
        const {id} = req.params;
        const updateData = {...req.body};
        if(req.body.status==='paid')updateData.paidAt = new Date();
        const updatedInvoice = await invoiceModel.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(200).json({message:"updated successfully! ",updatedInvoice});
    }catch(err){
        return res.status(500).json({message:"Internal server Broken! "})
    }
}
const deleteInvoice = async(req,res)=>{
    try{
        const {id} = req.params;
        const updatedInvoice = await invoiceModel.findByIdAndDelete(id);
        return res.status(200).json({message:"invoice deleted successfully!"});
    }catch(err){
        return res.status(500).json({message:"Internal server Broken! "})
    }
}
module.exports ={createInvoice,updateInvoice,getAllInvoice,deleteInvoice}