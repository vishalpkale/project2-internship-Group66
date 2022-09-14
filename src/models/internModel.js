const mongoose = require('mongoose')
const id = mongoose.Schema.Types.ObjectId 

const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true, 
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    collegeId:{
        type:id,
        trim:true,
        ref:'College',
        required:true ,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
   
}, { timestamps: true })

module.exports = mongoose.model('Intern', internSchema)