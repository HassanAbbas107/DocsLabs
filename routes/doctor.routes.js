const Doctor = require("../models/Doctor")
const router = require("express").Router()


router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find()
        res.render("doctors/allDoctors.ejs", { doctors })
    } catch (err) {
        console.log(err)
    }
})

router.get("/new", (req, res) => {
    try {
        res.render("doctors/new.ejs")
    } catch (err) {
        console.log("error occured", err)
    }
})


router.post("/new", async (req, res) => {
    try {
        await Doctor.create(req.body)
        res.redirect("/doctors")
        console.log("doctor added successfully")
    } catch (err) {
        console.log("Can't add new doctor error occured: ", err)
    }
})

router.get("/:id", async(req, res)=>{
    try {
        const foundDoc = await Doctor.findById(req.params.id)
        console.log(foundDoc)
        res.render("doctors/details.ejs", {foundDoc})
    } catch (err) {
        console.log(err)
    }
})



module.exports = router