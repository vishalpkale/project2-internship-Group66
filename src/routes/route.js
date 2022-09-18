const express =require("express");
const router = express.Router();
const collegeController=require('../controllers/collegeController')
const internController=require('../controllers/internController')

router.post("/functionup/colleges",collegeController.createCollage)

router.post('/functionup/interns',internController.intern)

router.get('/functionup/collegeDetails',collegeController.getCollege)

router.all('/*/*',async function(req,res){
    return res.status(404).send({status:"false" ,msg:"Not found,check url"})
})

module.exports= router;
