const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
    userId: String,
    gps: {
        latitude: Number,
        longitude: Number,
    },
    timestamp: { type: Date, default: Date.now },
    audioHash: String, // Will store blockchain hash of audio
});

module.exports = mongoose.model("SOS", sosSchema);
