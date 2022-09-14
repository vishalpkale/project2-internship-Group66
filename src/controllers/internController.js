const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const isValidString=new RegExp(/^[a-z]+\s[a-z ]+$/i)
const isValidEmail=new RegExp(/\S+@\S+\.\S+/)
const isValidMobile=new RegExp(/^[6-9]\d{9}$/)

const intern = async function (req, res) {
    try {
        //Destructuring
        let { name, email, mobile, collegeName } = req.body;

        //checking Body is Blank or not
        if (Object.keys(req.body).length == 0)
            return res.status(404).send({ status: false, msg: "plz enter Intern data" });

        //Validation for Students Name   
        if (!name)
            return res.status(404).send({ status: false, msg: "Name missing" });

        if (!isValidString.test(name))
            return res.status(400).send({ status: false, msg: "Please Enter a valid Intern Name" });

        //Validation for Students Email id    
        if (!isValidEmail.test(email))
            return res.status(400).send({ status: false, msg: "enter valid email" });
        if (email) {
            let validEmail = await internModel.findOne({ email: email });
          
            if (validEmail) {
                return res.status(400).send({ status: false, msg: "emailId already exists" });
            }
        }

        //Validation for Students mobile
        if (!isValidMobile.test(mobile))
            return res.status(400).send({ status: false, msg: "enter valid mobile number" });
        if (mobile) {
            let validMobile = await internModel.findOne({ mobile: mobile });
            if (validMobile) {
                return res.status(400).send({ status: false, msg: "Mobile Number already exists" });
            }
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
        res.status(201).send({ status: true, data: result });
    } 
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


module.exports.intern = intern