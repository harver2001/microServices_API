const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const USER_SERVICE_URL = 'https://otpgenerateandverify.onrender.com';
const POST_SERVICE_URL = 'https://harver2001-postservice-microservice-b85r.onrender.com';

app.use('/userservice', async (req, res) => {
    const url = `${USER_SERVICE_URL}${req.path}`;
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
});

app.use('/postservice', async (req, res) => {
    const url = `${POST_SERVICE_URL}${req.path}`;
    try {
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Internal Server Error hello' + " " + url });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});