const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudentsQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    })
}

const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsQueryById, [id], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    })
}

const addStudents = (req, res) => {
    const { name, age, dob } = req.body;
    pool.query(queries.checkNameExistsQuery, [name], (error, results) => {
        if (results.rows.length) {
            res.send("Name already exists");
        }
        pool.query(queries.addStudentQuery, [name, age, dob], (error, result) => {
            if (error) throw error;
            res.status(201).send("Student created succesfully");
        })
    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsQueryById, [id], (error, result) => {
        if (error) throw error;
        if (result.rows.length === 0) res.status(200).send("No Student with that id exists")
        pool.query(queries.removeStudentQueryById, [id], (error, results) => {
            if(error) throw error;
            return res.status(200).send("Student removed succesfully");
        })
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(queries.getStudentsQueryById, [id], (error, result) => {
        if (error) throw error;
        if (result.rows.length === 0) res.status(200).send("No Student with that id exists")
        pool.query(queries.updateStudentQueryById, [name,id], (error, results) => {
            if(error) throw error;
            return res.status(200).send("Student updated succesfully");
        })
    })
}

const loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.query(queries.checkEmailExistsQuery, [email], (error, result) => {
        if(error) throw error;
        if(result.rowCount === 0) res.status(400).send("Email does not exist");
        else{
            pool.query(queries.loginUserQuery, [email, password], (error, result) => {
                if(error) throw error;
                if(result.rowCount === 1) res.status(200).send(result);
                res.status(400).send("Invalid password");
            })
        }
    })
}

const registerUser = (req, res) => {
    const { username,email,password,profilePhoto,posts,liked } = req.body;
    pool.query(queries.checkEmailExistsQuery, [email], (error, result) => {
        if(error) throw error;
        if(result.rowCount === 1) res.status(400).send("Email already exist");
        else{
            pool.query(queries.registerUserQuery, [username,email,password,profilePhoto,posts,liked], (error, result) => {
                if(error) throw error;
                res.status(200).send(result);
            })
        }
    })
}

const getPostById = (req, res) => {
    const uid = req.params.uid;
    pool.query(queries.getPostByIdQuery, [uid] ,(error, result) => {
        if(error) throw error;
        var posts = result.rows[0]["posts"];
        posts += ',';
        var postsList = [];
        var tempPost = "";
        for(let i = 0; i < posts.length; i++){
            if(posts[i] === ','){
                postsList.push(tempPost);
                tempPost = "";
            }
            else tempPost += posts[i]; 
        }
        res.status(200).send(postsList);
    })
}

const updateProfilePhotoById = (req, res) => {
    const uid = req.params.uid;
    const newProfilePhoto = req.body.profilePhoto;
    pool.query(queries.updateUserQueryById, [newProfilePhoto,uid] ,(error, result) => {
        if(error) throw error;
        res.status(200).send(result);
    })
}

module.exports = {
    getStudents,
    getStudentsById,
    addStudents,
    removeStudent,
    updateStudent,
    loginUser,
    registerUser,
    getPostById,
    updateProfilePhotoById,
}