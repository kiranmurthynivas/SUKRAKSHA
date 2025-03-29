require('dotenv').config();
const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Make an emergency call to the given phone number.
 * @param {string} phoneNumber - The recipient's phone number.
 */
async function makeEmergencyCall(phoneNumber) {
    try {
        if (!phoneNumber) {
            throw new Error("Missing 'phoneNumber' parameter in makeEmergencyCall()");
        }

        const call = await client.calls.create({
            url: `${process.env.SERVER_URL}/api/voice`,  // Custom voice message
            to: phoneNumber,  // ✅ Use the dynamically provided number
            from: process.env.TWILIO_PHONE_NUMBER
        });

        console.log(`🚀 Emergency Call Sent! Call SID: ${call.sid}`);
        return call.sid;
    } catch (error) {
        console.error("❌ Error making call:", error.message);
        throw error;
    }
}

module.exports = { makeEmergencyCall };
