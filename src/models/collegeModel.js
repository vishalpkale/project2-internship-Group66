const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
      
    name:{
        type:String,
        required:[true "college name is required"],
        unique : [true "user alreaady exist."],
        trim:true
    },
    fullName:{
        type:String,
        required:[true "college fullName is required."],
    },
    logoLink:{
        type:String,
        trim:true,
        required:[true "logoLink is required."]
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

    

})

module.exports = mongoose.model('college', collegeSchema)