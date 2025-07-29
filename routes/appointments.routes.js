const mongoose = require("mongoose")
const Appointment =require("../models/Appointment")
const router = require("express").Router()

router.get("/",async(req,res)=>{
    try {
        const AllAppointment = await Appointment.find()  //populate
        res.render("Appointment/all-appointment.ejs",{AllAppointment:AllAppointment})
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
    const createAppointment = await Appointment.create(req.body)
})



router.get("/:appointmentId",async(req,res)=>{
    try{
        const foundAppointment = await Appointment.findById(req.params.appointmentId)
        
        res.render("/appointment-details.ejs",{foundAppointment: foundAppointment})
    }
    catch(error){
        console.log(error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate("doctor")

        res.render("appointment/showAppointmentDetails.ejs", { appointment: appointment })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router