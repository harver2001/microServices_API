const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require('axios');



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

app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

app.use('/api', otpRoutes);

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/getPostsbyUser/:userId", async (req, res) => {
    const userId = req.params.userId;
    const url = `https://harver2001-postservice-microservice-b85r.onrender.com/posts/${userId}`;
    try {
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Internal Server Error' });
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});