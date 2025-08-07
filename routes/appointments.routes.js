const router = require("express").Router()
const Appointment = require("../models/Appointment")
const Doctor = require("../models/Doctor")



router.get("/", async (req, res) => {
    try {
        const allAppointments = await Appointment.find()
        res.render("appointments/allAppointments.ejs", { allAppointments })
    } catch (err) {
        console.log(err)
    }
})

router.get("/new", async (req, res) => {
    try {
        const allDoctors = await Doctor.find()
        res.render("appointments/new.ejs", { allDoctors })
    } catch (err) {
        console.log(err)
    }
})

router.post("/new", async (req, res) => {
    try {
        req.body.notes = { content: req.body.notes }
        console.log(req.body.notes)
        await Appointment.create(req.body)
        res.redirect("/appointments")
        console.log("new appointment have been created successfully")
    } catch (err) {
        console.log(err)
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const foundAppointment = await Appointment.findById(req.params.id).populate('doctor')
        console.log(foundAppointment.doctor)
        res.render("appointments/appointment-details.ejs", {foundAppointment})
    }catch(err){
        console.log(err)
    }
})

router.get("/:id/edit", async (req,res) =>{
    try {
       const foundAppointment = await Appointment.findById(req.params.id)
       res.render("appointments/edit.ejs", {foundAppointment}) 
    } catch (err) {
        console.log(err)
    }
})

router.put("/:id", async(req,res) => {
    try {
        await Appointment.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/appointments")
        console.log("appointment updated succesfully")
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id", async(req,res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id)
         res.redirect("/appointments")
        console.log("appointment deleted succesfully")
    } catch (err) {
        console.log(err)
    }
})

router.post("/:id/note", async(req,res) => {
try {
    const foundAppointment = await Appointment.findById(req.params.id)
    foundAppointment.notes.push(req.body)
    await foundAppointment.save()
    res.redirect("/appointments")
    console.log("note added successfully")
} catch (err) {
    console.log(err)
}
})

module.exports = router