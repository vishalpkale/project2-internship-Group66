const collegeModel = require("../models/collegeModel")



































const getCollege=async function(req,res){
    try{
    let cName=req.query.name
    if(!cName){
        return res.status(400).send({status:false,msg:"Enter college Name in abbrivated form"})
    }
    const collegeData=await collegeModel.findone({name:cName})
    if(collegeData==null){
        return res.status(404).send({status:false,msg:"No college found with this name"})
    }
    const interns=await internModel.findById(collegeData._id).select({_id:1,name:1,email:1,mobile:1})
    const requiredData={
        "name": collegeData.name,
    "fullName": collegeData.fullName,
    "logoLink":collegeData.logoLink ,
    "interns":interns
    }
    return res.status(200).send({status:true,data:requiredData})
}
catch(err){
    return res.status(500).send({status:false,error:err.message})
}
}

module.exports.getCollege=getCollege