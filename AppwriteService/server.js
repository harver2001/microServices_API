const express = require('express');
const bodyParser = require('body-parser');
const authService = require('./appwrite/auth');
const jwt = require('jsonwebtoken');
const { useId } = require('react');
require('dotenv').config()

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const response = await authService.createAccount({ email, password, username });
    const {userId, ...rest} = response;
    const user = {
      email : email,
      password : password
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);

    res.json({ success: true, userId : userId, email : email, status: 200, accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    if(error.message === "A user with the same id, email, or phone already exists in this project."){
      res.status(409).json({ success: false, error: error.message });
    }
    else{
      res.status(501).json({ success: false, error: error.message });
    }
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await authService.login({ email, password });
    const {userId, ...rest} = response;
    const user = {
      email : email,
      password : password
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    // res.status(200).json({response : response});
    res.json({ success: true, userId : userId, email : email, status: 200, accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    if(error.message === "Invalid credentials. Please check the email and password."){
      res.status(401).json({ success: false, error: error.message });
    }
    else{
      res.status(501).json({ success: false, error: error.message });
    }
    res.status(501).json({ success: false, error: error.message });
  }
})
app.get('/posts', authenticateToken, (req, res) => {
  res.json(req.user.name)
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

// endpoint to generate new access token from refresh token passed in body
app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  res.sendStatus(204)
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000,() => {
    console.log('Listening on port 3000 with Yash Aniki')
})