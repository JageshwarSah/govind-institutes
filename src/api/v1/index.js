import dotenv from 'dotenv'

//Load environment variables
dotenv.config()

import express from 'express'

//Express Application
const app = express()

//Import Routes
import coursesRouter from './routes/courses.js'
import departmentsRouter from './routes/departments.js'

//Routes
app.use('/api/courses', coursesRouter)
app.use('/api/departments', departmentsRouter)

//Initiate Server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${5000}`)
})
