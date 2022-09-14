const collegeModel = require("../models/collegeModel")
const internModel=require("../models/internModel")

//------------------Common Validation Function-----------------/

const isValid = function (value) {
    if (typeof (value) != "string" || value === null) return false
    if (typeof (value) === "string" && value.trim().length == 0) return false
    return true
}

const isValidRequestBody = function (str) {
    return Object.keys(requestBody).length > 0
}

const isValidURL = function (str) {
    var pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/igm);
    if (pattern.test(str)) return true;
};


const isValidString=new RegExp(/^[a-z]+\s[a-z ]+$/i)
//------------------Create College----------------------//

const createCollage = async function (req, res) {
    try {
        requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Please Provide College Data" })
        }
        const { name, fullName, logoLink } = requestBody

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "name is required and have non empty string value" })
        }
        if (!isValidString.test(fullName)) {
            return res.status(400).send({ status: false, message: "fullName is required and have non empty string value" })
        }
        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "logoLink is required" })
        }
        if (!isValidURL(logoLink)) {
            return res.status(400).send({ status: false, message: "Enter valid logoLink" })
        }
        const isNamePresent = await collegeModel.findOne({ name: name, isDeleted: false })
        if (isNamePresent) {
            return res.status(400).send({ status: false, message: "Name is already exist" })
        }
        const newCollege = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, message: "New College Entry Created", data: newCollege })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

//---------------------------get college----------------------------//



const getCollege=async function(req,res){
    try{
    let cName=req.query.collegeName
    if(!cName){
        return res.status(400).send({status:false,message:"Enter college Name in abbreviated form"})
    }
    const collegeData=await collegeModel.findOne({name:cName})
    if(collegeData==null){
        return res.status(404).send({status:false,message:"No college found with this name"})
    }
    const interns=await internModel.find({collegeId:collegeData['_id']}).select({_id:1,name:1,email:1,mobile:1})
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


module.exports.createCollage=createCollage
module.exports.getCollege=getCollege