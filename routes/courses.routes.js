const { Router } = require('express')
const { userAuth } = require('../middlewares/auth')
const { buyCourse } = require('../controllers/courses.controller')
const { previewAll } = require('../controllers/courses.controller')
const courseRouter = Router()


courseRouter.post('/buyCourse', userAuth, buyCourse )
courseRouter.get('/preview', previewAll)


module.exports = {
    courseRouter
}