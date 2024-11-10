// const getStudentsQuery = "SELECT * FROM student";
// const getStudentsQueryById = "SELECT * FROM student WHERE id = $1";
// const checkNameExistsQuery = "SELECT s FROM student s WHERE s.name = $1";
// const addStudentQuery = "INSERT INTO student (name,age,dob) VALUES ($1,$2,$3)";
// const removeStudentQueryById = "DELETE FROM student WHERE id = $1";
// const updateStudentQueryById = "UPDATE student SET name = $1 WHERE id = $2";
const checkEmailExistsQuery = "SELECT s FROM users s WHERE s.email = $1";
const loginUserQuery = "SELECT * FROM users WHERE email = $1 AND password = $2";
const registerUserQuery = "INSERT INTO users (username,email,password,profilePhoto,posts,liked) VALUES ($1,$2,$3,$4,$5,$6)";
const getPostByIdQuery = "SELECT posts FROM users WHERE uid = $1";
const updateUserQueryById = "UPDATE users SET profilePhoto = $1 WHERE uid = $2";

module.exports = {
    // getStudentsQuery,
    // getStudentsQueryById,
    // checkNameExistsQuery,
    // addStudentQuery,
    // removeStudentQueryById,
    // updateStudentQueryById,
    checkEmailExistsQuery,
    loginUserQuery,
    registerUserQuery,
    getPostByIdQuery,
    updateUserQueryById,
}