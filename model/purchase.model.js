const mongoose = require("mongoose")

const {Schema, Types: {ObjectId}} = mongoose


const PurchaseSchema = new Schema({
    userId : {
        type : ObjectId,
        ref : "User"
    },
    courseId : {
        type : ObjectId,
        ref : "Course"
    }
})


const PurchaseModel = mongoose.model('Purchase', PurchaseSchema)

module.exports = {
    PurchaseModel
}