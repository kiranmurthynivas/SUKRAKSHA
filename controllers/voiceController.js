const twilio = require("twilio");

// Load Twilio credentials from .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const serverUrl = process.env.SERVER_URL;

const client = new twilio(accountSid, authToken);

/**
 * POST /api/voice
 * Initiates an automated voice call.
 */
exports.sendVoiceCall = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ error: "Phone number is required" });
        }

        if (!serverUrl) {
            return res.status(500).json({ error: "SERVER_URL is not defined. Check your .env file." });
        }

        // ✅ Corrected TwiML URL for handling voicemail
        const twimlUrl = `${serverUrl}/api/voice/twiml`;

        console.log(`ℹ️ Using TwiML URL: ${twimlUrl}`);

        client.calls.create({
            url: twimlUrl,
            to: phoneNumber,
            from: twilioPhoneNumber,
        }).then(call => {
            console.log(`📞 Call initiated: ${call.sid}`);
            res.status(200).json({ message: "Voice call sent successfully!", callSid: call.sid });
        }).catch(err => {
            console.error("❌ Error making call:", err);
            res.status(500).json({ error: err.message });
        });

    } catch (err) {
        console.error("❌ Unexpected error:", err);
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET /api/voice/twiml
 * Serves TwiML response.
 */
exports.getVoiceTwiml = (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();

    // ✅ Correct voice message with proper TwiML formatting
    twiml.say("This is an emergency. Please help me now!", { voice: 'alice' });

    console.log("✅ TwiML response sent:", twiml.toString());

    res.type("text/xml");
    res.send(twiml.toString()); // ✅ Ensure correct TwiML response
};


/**
 * POST /api/voice/recording
 * Handles recorded voicemail data.
 */
exports.handleRecording = (req, res) => {
    const recordingUrl = req.body.RecordingUrl;

    if (!recordingUrl) {
        return res.status(400).json({ error: "No recording found" });
    }

    console.log(`📥 New voicemail recorded: ${recordingUrl}`);

    res.status(200).json({ message: "Voicemail received", recordingUrl });
};
