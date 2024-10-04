// buy course and get all courses 
const { CourseModel } = require('../model/course.model')
const { PurchaseModel } = require('../model/purchase.model')



const buyCourse = async (req, res) => {
    const userId = req.userId
    const courseId = req.body.courseId

    try {
        const courses = await PurchaseModel.create({
            userId,
            courseId
        })

        res.status(200).json({
            msg : 'courses purchased successfully'
        })
    } catch (error) {
        res.status(500).json({
            msg :  `something went wrong while buying the course : ${error.message}`
        })
    }

    
}

const previewAll = async (req, res) => {
    try {
        const courses = await CourseModel.find({})

        res.status(200).json({
            courses
        })
    } catch (error) {
        res.status(500).json({
            msg : `unable to fetch the courses ${error.message}`
        })
    }
}

module.exports = {
    buyCourse,
    previewAll
}