const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")



//------------------Common Validation Function-----------------/

const isValidRequestBody = function (str) {
    return Object.keys(str).length == 0
}

const isValidfName = new RegExp(/^[a-z]+\s[a-z ]+$/i)
const isValidEmail = new RegExp(/\S+@\S+\.\S+/)
const isValidMobile = new RegExp(/^[6-9]\d{9}$/)
//---------------------------------------Create Intern-------------------------------------------------------------------/
const intern = async function (req, res) {
    try {
       const  requestBody = req.body


        //checking Body is Blank or not
        if (isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "plz enter Intern data" });
        }
        //Destructuring
        let { name, email, mobile, collegeName } = req.body;

        //Validation for Students Name   
        if (!name) {
            return res.status(400).send({ status: false, message: "Name missing" });
        } 
        if (!isValidfName.test(name)) {  
            return res.status(400).send({ status: false, message: "Please Enter a valid Intern Name(Fullname)" });
        }
        //Validation for Students Email id
        if (!email) {
            return res.status(404).send({ status: false, message: "email ID is required" });
        }
        if (!isValidEmail.test(email)) {
            return res.status(400).send({ status: false, message: "enter valid email" });
        }
        let validEmail = await internModel.findOne({ email: email });

        if (validEmail) {
            return res.status(409).send({ status: false, message: "Email already exist use another email" });
        }


        //Validation for Students mobile
        if (!mobile) {
            return res.status(404).send({ status: false, message: "mobile is required" });
        }
        if (!isValidMobile.test(mobile)){
            return res.status(400).send({ status: false, message: "enter valid mobile number" });
        }
        let validMobile = await internModel.findOne({ mobile: mobile });
        if (validMobile) {
            return res.status(400).send({ status: false, message: "mobile already exist use another mobile" });
        }

        //Validation for Students Selected College Name 
        
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "collegeName is required" });
        }
        const doc = await collegeModel.findOne({ name: collegeName });
        if (!doc) {
            return res.status(404).send({ status: false, message: "college is not registered" });
        }
        let collegeId = doc._id;
        const result = await internModel.create({ name, email, mobile, collegeId });
       return res.status(201).send({ status: true, data: result });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


module.exports.intern = intern