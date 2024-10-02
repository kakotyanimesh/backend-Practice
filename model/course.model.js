const mongoose = require('mongoose')
const { Schema, Types : { ObjectId }} = mongoose


const CourseSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    creatorId : ObjectId
})

const CourseModel = mongoose.model('Course', CourseSchema)

module.exports = {
    CourseModel
}