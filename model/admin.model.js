const mongoose = require('mongoose')

const { Schema } = mongoose

const AdminSchema = new Schema({
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
        unique : [true, 'username must be unique']
    },
    fullName : {
        type : String,
        required : true
    }
})

const AdminModel = mongoose.model("Admin", AdminSchema)

module.exports = {
    AdminModel
}