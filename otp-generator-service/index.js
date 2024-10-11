const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const otpRoutes = require('./routes/otpRoutes');

require("dotenv").config();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@otp.pvlqlqc.mongodb.net/`,
        { useNewUrlParser: true, useUnifiedTopology: true } 
    )
    .then(() => {
        console.log("Connected to MongoDB database!");
    })
    .catch((error) => {
        console.error("Connection failed!", error); 
    });

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

app.use('/api', otpRoutes);

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});