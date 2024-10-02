const { Router } = require('express')
const jwt = require('jsonwebtoken')
const z = require('zod')
const bcrypt = require('bcrypt')
const { accessTokenAdmin, refreshTokenAdmin } = require('../utils/jwtToke')
const { default: errorMap } = require('zod/locales/en.js')
const { UserModel } = require('../model/user.model')
const { AdminModel } = require('../model/admin.model')

const adminRouter = Router()

// signUp signIn 

adminRouter.post('/singUp', async (req, res) => {
    try {
        const signupObject = z.object({
            email : z.string().email({message : 'provide a valid email address'}),
            password : z.string()
                        .min(8, { message: 'Password must be at least 8 characters long.' })
                        .max(20, { message: 'Password must not exceed 20 characters.' })
                        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
                        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
                        .regex(/[\W_]/, { message: 'Password must contain at least one special character (e.g., !@#$%^&*()_+).' })
                        .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
            username : z.string().min(5, { message : 'username must contains 10 character'}).max(20, {message : 'username must not exceed 20 character'}),
            fullName : z.string()
        })
    
        const parsedObject = signupObject.safeParse(req.body)
    
        if(!parsedObject.success) {
            return res.status(403).json({
                message : `validation failed, check provided data for following error : `,
                error : parsedObject.error.errors
            })
        }
    
        const { email, password, username, fullName } = parsedObject.data
    
        const hasedPassword = await bcrypt.hash(password, 10)
    
    
    
        const admin = await AdminModel.create({
            email,
            password : hasedPassword,
            username,
            fullName
        })
    
        const accessToken = accessTokenAdmin(admin._id)
        const refreshToken = refreshTokenAdmin(admin._id)
    
        res.status(200).json({
            message : `admin created successfully`,
            accessToken,
            refreshToken
        })
    } catch (error) {
        console.log(error);
        res.status(403).json({
            message : `something went wrong while creating the admin ! error : ${error.message}`
        })
    }
})



module.exports = {
    adminRouter
}