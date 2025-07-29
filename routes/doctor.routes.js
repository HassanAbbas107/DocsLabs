const mongoose = require("mongoose")
const Doctor =require("../models/Doctor")
const router = require("express").Router()

router.get("/",async(req,res)=>{
    try {
        const AllDoctors = await Doctor.find()  //populate
        res.render("Doctors/all-doctors.ejs",{AllDoctors:AllDoctors})
    } catch (error) {
        console.log(error)
    }
})
router.get("/new",async(req,res)=>{
    try {
          
        res.render("/new.ejs")
    } catch (error) {
        console.log(error)
    }
})
router.post("/",async (req,res)=>{
    const createDoc = await Doctor.create(req.body)
})
outer.get("/:bookId",async(req,res)=>{
    try{
        const foundDoctor = await Doctor.findById(req.params.bookId)
        
        res.render("/doctor-details.ejs",{foundDoctor: foundDoctor})
    }
    catch(error){
        console.log(error)
    }
})
module.exports = router