const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/guardianDB"; // Use local MongoDB

        console.log("✅ Connecting to Local MongoDB...");
        await mongoose.connect(mongoURI); // No deprecated options

        console.log("✅ Local MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
