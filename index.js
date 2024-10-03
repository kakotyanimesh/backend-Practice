const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const { userRouter } = require('./routes/user.routes')
const { adminRouter } = require('./routes/admin.routes')
const { courseRouter } = require('./routes/courses.routes')


const app = express()
app.use(express.json())
app.use(cookieParser())
const port = process.env.port || 3000 

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)

app.get('/', (req, res) => {
    res.send('hi')
})


const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

    } catch (error) {
        console.log(`something went wrong while connecting with mongoDb server !! error : ${error.message}`);
        
    }
}

app.listen(port, () => {
    main()
    console.log(`the app is running at http://localhost:${port}`)
})