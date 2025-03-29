require("dotenv").config(); // Ensure .env is loaded at the very top

const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Needed for Twilio POST data

// Connect to MongoDB
connectDB();

// Import and use routes
const sosRoutes = require("./routes/sosRoutes");
const voiceRoutes = require("./routes/voiceRoutes");

app.use("/api", sosRoutes);
app.use("/api", voiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
