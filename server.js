const express = require("express");
const axios = require("axios");
const app = express();

app.get("/check", async (req, res) => {
    try {
        // Get IP from request headers (Roblox will send it when calling)
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

        // Use IP geolocation API (ip-api.com is free)
        const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);

        res.json({ country: geoRes.data.country || "Unknown" });
    } catch (error) {
        res.status(500).json({ error: "Failed to check location" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
