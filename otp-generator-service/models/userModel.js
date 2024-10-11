const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isUserVerified : {
        type : Boolean,
        default : true
    },
    isUserLoggedIn : {
        type : Boolean,
        default : false
    }
})

const Users = mongoose.model('users', userSchema);
module.exports = Users;