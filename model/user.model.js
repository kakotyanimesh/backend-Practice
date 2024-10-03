const mongoose = require('mongoose')
const {Schema } = mongoose

const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : [true, 'username should be unique']
    },
    fullName : {
        type : String,
        required : true,
    }

}, {timestamps : true})


const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    UserModel
}