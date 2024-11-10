const getPostsQuery = "SELECT * FROM posts";
const getPostsByIdQuery = "SELECT * FROM posts WHERE pid = $1";
const addPostsQuery = "INSERT INTO posts (creator, dateCreated, url, tags, title, comments, numLikes) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const addCommentsQuery = "UPDATE posts SET comments = $1 WHERE pid = $2";
const getCommentByIdQuery = "SELECT * FROM posts WHERE pid = $1";
const addLikeByIdQuery = "UPDATE posts SET numLikes = numLikes+1 WHERE pid = $1";

module.exports = {
    getPostsQuery,
    getPostsByIdQuery,
    addPostsQuery,
    addCommentsQuery,
    getCommentByIdQuery,
    addLikeByIdQuery,
}