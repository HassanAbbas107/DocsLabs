const mongoose = require("mongoose")
const notesSchema = new mongoose.Schema({
    content:{
        type:String
    },
    createdAt:{
        type:date,
        default:now
    }

})

const appointmentSchema = new mongoose.Schema({
    patientName:{
        type:String
    },
    date:{
        type:date
    },
    reason:{
        type:String
    },
    doctor:{
        
        type: mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    notes:[notesSchema]
    



})