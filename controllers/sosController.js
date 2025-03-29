const SOS = require("../models/sosModel");
const { makeEmergencyCall } = require("../utils/twilioService");

// ✅ Define function first, then export
const triggerSOS = async (req, res) => {
    try {
        const { userId, latitude, longitude, phoneNumber } = req.body; // ✅ Get phoneNumber from request

        if (!userId || !latitude || !longitude || !phoneNumber) {
            return res.status(400).json({ error: "Missing required fields: userId, latitude, longitude, phoneNumber" });
        }

        const newSOS = new SOS({
            userId,
            gps: { latitude, longitude },
        });

        await newSOS.save();

        // 🔹 Pass `phoneNumber` to makeEmergencyCall
        const callSid = await makeEmergencyCall(phoneNumber);

        return res.status(200).json({ 
            message: "🚨 SOS Triggered & Emergency Call Sent!", 
            sosId: newSOS._id, 
            callSid 
        });

    } catch (err) {
        console.error("❌ Error triggering SOS:", err.message);
        res.status(500).json({ error: err.message });
    }
};

// ✅ Correctly export the function
module.exports = { triggerSOS };
