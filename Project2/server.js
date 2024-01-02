const express = require('express');
const bodyParser = require('body-parser');
const authService = require('./src/appwrite/auth');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // const response = await authService.createAccount({ email, password, name });
    res.json({ success: true });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
