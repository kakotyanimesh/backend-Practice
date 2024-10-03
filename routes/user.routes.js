const { Router, json } = require('express')
const { userAuth } = require('../middlewares/auth')
const { signin, signup, viewCourses } = require('../controllers/user.controller')
const userRouter = Router()

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.get('/viewCourses', userAuth, viewCourses)

module.exports = {
    userRouter
}