const { Router } = require('express')
const { adminAuth } = require('../middlewares/auth')
const { signup, signin, updateCourse, createCourse, deleteCourse, preview } = require('../controllers/admin.controller')

const adminRouter = Router()

// signUp signIn 

adminRouter.post('/signUp', signup)


adminRouter.post('/signin', signin)


adminRouter.post('/createCourse', adminAuth, createCourse)


adminRouter.put('/updateCourse', adminAuth , updateCourse)


adminRouter.delete('/deleteCourse', adminAuth, deleteCourse)

adminRouter.get('/preview', adminAuth, preview)

module.exports = {
    adminRouter
}