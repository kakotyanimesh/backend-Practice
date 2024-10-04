const mongoose = require('mongoose')
const { UserModel } = require('../model/user.model')
const { signUpObject, signinObject } = require('../utils/zodObject')
const bcrypt = require('bcrypt')
const { accessTokenUser, refreshTokenAdmin, refreshTokenUser } = require('../utils/jwtToke')
const { PurchaseModel } = require('../model/purchase.model')


const signup = async(req, res) => {
    const parsedObject = signUpObject.safeParse(req.body)

    if(!parsedObject.success) return res.status(403).json({msg : 'invalid credentials', err: parsedObject.error.errors})
    
    const { email, password, username, fullName } = parsedObject.data

    const hasedPassword = await bcrypt.hash(password, 10)

    try {
        await UserModel.create({
            email, 
            password : hasedPassword,
            username,
            fullName
        })

        res.status(201).json({
            msg : 'user created successfully'
        })
    } catch (error) {
        res.status(500).json({
            msg : `something went while creating the user , error : ${error.message}`
        })
    }
}


const signin = async(req, res) => {
    const parsedObject = signinObject.safeParse(req.body)

    if(!parsedObject.success) return res.status(403).json({msg : 'invalid credentials', err : parsedObject.error.errors})
    
    const { email, password } = parsedObject.data

    try {
        const user = await UserModel.findOne({email})

        if(!user) return req.status(400).json({msg : 'invlid password or email'})
        
        const comaparePassword = await bcrypt.compare(password, user.password)

        if(!comaparePassword) return res.status(403).json({ msg : 'invlid password or email'})

        const accessToken = accessTokenUser(user._id)
        const refreshToken = refreshTokenUser(user._id)

        const cookieOptions = {
            httpOnly : true,
            secure : true
        }

        res.status(200)
            .cookie('accesstoken', accessToken, cookieOptions)
            .cookie('refreshtoken', refreshToken, cookieOptions)
            .json({
                msg : 'user logged In successfully !!'
            })
    } catch (error) {
        res.status(500).json({
            msg : `something went wrong while signIn process, error : ${error.message}`
        })
    }
}
const viewCourses = async(req, res) => {
    // user Id and then search in purchasesModel with that user Id 

    const userId = req.userId

    try {
        const courses = await PurchaseModel.find({userId}).populate("courseId", "title description price")
        
        res.status(200).json({
            msg : 'courses fetched successfully',
            courses

        })
    } catch (error) {
        res.status(500).json({
            msg : `something went wrong , error : ${error.message}`
        })
    }
}


module.exports = {
    signup,
    signin,
    viewCourses
}