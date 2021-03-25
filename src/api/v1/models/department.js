import { Mongoose, Schema } from 'mongoose'

const departmentSchema = new Schema({
	name: String,
	head_of_department: String,
})

export default Mongoose.model('Departments', departmentSchema)
