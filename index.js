const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
// const { userRouter } = require('./routes/user.routes')
const { adminRouter } = require('./routes/admin.routes')
const { courseRouter } = require('./routes/courses.routes')


const app = express()
app.use(express.json())
const port = process.env.port || 3000 

app.use('/api/v1/admin', adminRouter)
// app.use('/api.v1.user', userRouter)
app.use('/api/v1/course', courseRouter)

app.get('/', (req, res) => {
    res.send('hi')
})


const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port, () => console.log(`the app is running at http://localhost:${port}`))

    } catch (error) {
        console.log(`something went wrong while connecting with mongoDb server !! error : ${error.message}`);
        
    }
}

main()