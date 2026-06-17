const Task = require('../tasks/tasks.model');
const Invoice = require('../invoice/invoice.model');
const User = require('../auth/auth.model');
const mongoose = require('mongoose');
const getdashBoardData = async(req,res) =>{
    try{
        const freelancerId = new mongoose.Types.ObjectId(req.user.id);
        const now = new Date();
        const currentYear = now.getFullYear();
        const user = await User.findById(freelancerId).select("createdAt");
        const registationDate = new Date(user.createdAt);
        const startMonth = registationDate.getFullYear()===currentYear?registationDate.getMonth():0;
        const startOfLastMonth = new Date(now.getFullYear(),now.getMonth()-1,1);
        const endOfLastMonth = new Date(now.getFullYear(),now.getMonth(),0,23,59,59);
        const graphStartDate = registationDate.getFullYear()===currentYear?new Date(currentYear,startMonth,1):new Date(currentYear,0,1)
        // const startOfCurrentYear = new Date(now.getFullYear(),0,1);
        const [totalProjects,invoiceStats] = await Promise.all([
            Task.countDocuments({
                createdBy:freelancerId,status:'done'
            }),
            Invoice.aggregate([
                {
                    $match:{
                        createdBy:freelancerId,status:"paid"
                    }
                },{
                    $facet:{
                        totalEarnings:[
                            {$group:{_id:null, sum:{$sum:'$amount'}}}
                        ],
                        lastMonthEarings:[
                            {$match:{paidAt:{$gte:startOfLastMonth,$lte:endOfLastMonth}}},
                            {$group:{_id:null,sum:{$sum:"$amount"}}}
                        ],
                        graphData:[
                            {$match: { paidAt: { $gte: graphStartDate } }},
                            {$group:{_id:{$month:"$paidAt"},earnings:{$sum:"$amount"}}},
                            { $sort: { '_id': 1 } }
                        ]
                    }
                }
            ])
        ]);
        const totalEarnings = invoiceStats[0].totalEarnings[0]?.sum||0;
        const lastMonthEarings = invoiceStats[0].lastMonthEarings[0]?.sum||0;
        const rawGraphData = invoiceStats[0].graphData || [];
        const currentMonth = now.getMonth();
        const monthlyEarningGraph = [];
        for(let i = startMonth;i<=currentMonth;i++){
            const monthNum = i+1;
            const found = rawGraphData.find(item => item._id===monthNum);
            monthlyEarningGraph.push({
                month: new Date(0,i).toLocaleString('en-US',{month:'short'}),
                earnings:found?found.earnings:0
            })
        }
        return res.status(200).json({
            message:"Here is all Earning! ",
            success:true,
            data:{
                totalProjects,totalEarnings,lastMonthEarings,graphData:monthlyEarningGraph
            }
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal sever broked! "});
    }
}

module.exports = {getdashBoardData};