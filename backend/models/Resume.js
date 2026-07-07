const mongoose = require("mongoose")

const resumeSchema = new mongoose.Schema({
    filename:{
        type: String,
        required: true
    },
    analysisResult: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Resume",resumeSchema)