const express = require('express');
const postsRoutes = require('./src/post/routes');
const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/', (req,res) =>{
    res.send("Hello, world!");
})

app.use('/api/v1/posts',postsRoutes);

app.listen(PORT, () => {
    console.log('listening on port 4000');
});