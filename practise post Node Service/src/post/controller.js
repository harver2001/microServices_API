const pool = require('../../db');
const queries = require('./queries');

const getPosts = (req,res) => {
    pool.query(queries.getPostsQuery, (error, results) => {
        if(error) throw error;
        res.send(results.rows);
    })
}

const getPostsById = (req,res) => {
    const pid = req.params.pid;
    pool.query(queries.getPostsByIdQuery, [pid] ,(error, results) => {
        if(error) throw error;
        res.send(results.rows);
    })
}


const addPosts = (req,res) => {
    const numLikes = 0;
    const dateCreated = (new Date()).toLocaleDateString('en-GB');
    const comments = "";
    const {creator, url, title, tags} = req.body;
    pool.query(queries.addPostsQuery, [creator, dateCreated, url, tags, title, comments, numLikes] ,(error, results) => {
        if(error) throw error;
        res.send(results.rows);
    })
}

const addComments = (req,res) => {
    const comments = req.body.comments;
    const pid =req.params.pid;
    pool.query(queries.addCommentsQuery, [comments, pid] ,(error, results) => {
        if(error) throw error;
        res.send(results.rows);
    })
}

const getCommentById = (req,res) => {
    const pid = req.params.pid;
    pool.query(queries.getCommentByIdQuery, [pid] ,(error, results) => {
        if(error) throw error;
        res.send(results.rows[0]["comments"]);
    })
}

const addLikes = (req,res) => {
    const pid =req.params.pid;
    pool.query(queries.addLikeByIdQuery, [pid] ,(error, results) => {
        if(error) throw error;
        res.send(results.rows);
    })
}

module.exports = {
    getPosts,
    getPostsById,
    addPosts,
    addComments,
    getCommentById,
    addLikes
}