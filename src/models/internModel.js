const mongoose = require('mongoose')
const id = mongoose.Schema.Types.ObjectId 

const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true "intern name is required."]
    },
    email:{
        type:String,
        required:[true "email is required."],
        unique:[true "email is already taken."],
        trim:true
    },
    mobile:{
        type:String,
        required:[true "mobile number is required."],
        unique:[true "mobile number is already taken."],
        trim:true
    },
    collegeId:{
        type:id,
        trim:true,
        ref:"college",
        required:[true "collegeId is required."],
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
   
}, { timestamps: true })

module.exports = mongoose.model('intern', internSchema)