const mongoose = require('mongoose')
const { AdminModel } = require('../model/admin.model')
const { CourseModel } = require('../model/course.model')
const { accessTokenAdmin, refreshTokenAdmin } = require('../utils/jwtToke')
const { signUpObject,signinObject, courseObject } = require('../utils/zodObject')
const bcrypt = require('bcrypt')


const signup = async (req, res) => {
    const parsedObject = signUpObject.safeParse(req.body)

    if(!parsedObject.success) return res.status(403).json({msg : 'invalid crediantials', error : parsedObject.error.errors})
    
    const { email, password, username, fullName } = parsedObject.data
    const hasedPassword = await bcrypt.hash(password, 10)
    
    try {
        await AdminModel.create({
            email,
            password : hasedPassword,
            username,
            fullName
        })

        res.status(201).json({
            msg: 'user created successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : `something went wrong : ${error.message}`
        })
        
    }
}

const signin = async (req, res) => {
    const parsedObject = signinObject.safeParse(req.body)

    if(!parsedObject.success) return res.status(403).json({msg : 'invalid credentials', error : parsedObject.error.errors})

    const { email, password } = parsedObject.data

    try {
        const admin = await AdminModel.findOne({email})
        
        if(!admin) return res.status(404).json({msg : 'invalid email or password'})

        const comaparePassword = await bcrypt.compare(password, admin.password)

        if(!comaparePassword) return res.status(404).json({msg : 'invalid password or email'})
        
        const accessToken = accessTokenAdmin(admin._id)
        const refreshToken = refreshTokenAdmin(admin._id)

        const cookieOptions = {
            httpOnly : true,
            secure : true
        }

        res.status(200)
            .cookie('accesstoken', accessToken, cookieOptions)
            .cookie('refreshtoken', refreshToken, cookieOptions)
            .json({msg : 'user logged in successfully '})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : `unable signedin error : ${error.message}`
        })
    }
}


const createCourse = async (req, res) => {
    const adminId = req.userId

    const parsedObject = courseObject.safeParse(req.body)

    if(!parsedObject.success) return res.status(404).json({msg : 'invalid credentials', error : parsedObject.error.errors})
    
    const { title, description, price } = parsedObject.data

    try {
        const course = await CourseModel.create({
            title,
            description,
            price : parseFloat(price),
            creatorId : adminId
        })

        res.status(200).json({
            msg : `course with ${course._id} created successfully`, 
            courseId : course._id
        })
    } catch (error) {
        res.status(500).json({
            msg : `something went wrong while creating the course ! error : ${error.message}`
        })
    }
}

const updateCourse = async (req, res) => {
    const courseId = req.body.courseId

    if(!courseId) return res.status(400).json({msg : 'No courseId provided'})

    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(403).json({msg : `courseId with ${courseId} is invlid format`})
    }

    const parsedObject = courseObject.safeParse(req.body)
    
    // if(!courseId) return res.status(404).json({msg :})

    if(!parsedObject.success) return res.status(403).json({msg : 'invalid creadiantials', error : parsedObject.error.errors})

    const { title, description, price } = parsedObject.data
        
    try {
        const updateResult = await CourseModel.updateOne({
            _id : courseId
        }, {
            title,
            description,
            price : parseFloat(price)
        })

        if(!updateResult.upsertedCount === 0) return res.status(404).json({msg : `course with ${courseId} not found `})
    
        res.status(200).json({
            msg : `course with ${courseId} got updated`
        })
    } catch (error) {
        res.status(500).json({
            msg : `something went wrong error : ${error.message}`
        })
    }
}


const deleteCourse = async (req, res) => {
    const courseId = req.body.courseId
    if(!courseId) return res.status(400).json({msg : 'undefined courseId'})
    
    // const id = new mongoose.Types.ObjectId(courseId) 
    // converting the courseId to objectid to help more acurate find in mongodB server (extra thing)
       
    if(!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(400).json({msg : 'Invalid CourseId format'})
    }
    try {
    
        // const id = new mongoose.Types.ObjectId(courseId) => when i try to use it got deprecated but it add extra safety what to do 
    
    
        const result = await CourseModel.deleteOne({_id : courseId})
    
        if(result.deletedCount === 0){
            return res.status(404).json({msg : `course with ${courseId} not found`})
        }
    
        res.status(200).json({
            msg : `course with ${courseId} deleted successfully`
        })
    } catch (error) {
        res.status(500).json({
            msg : `unable to delete course error : ${error.message}`
        })
    }
}

const preview = async (req, res) => {
    const adminId = req.userId

    try {
        const courses = await CourseModel.find({creatorId : adminId})

        res.status(200).json({
            msg : 'courses fetched successfully',
            courses : courses
        })
    } catch (error) {
        
    }
}

module.exports = {
    signup,
    signin,
    createCourse,
    updateCourse,
    deleteCourse,
    preview
}