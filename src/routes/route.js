const express =require("express");
const router = express.Router();
const collegeController=require('../controllers/collegeController')



router.get('/functionup/collegeDetails',collegeController.getCollege)

module.exports= router();
