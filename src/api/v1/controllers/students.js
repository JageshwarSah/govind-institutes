const Student = require('./../models/student');
const Error = require('../helpers/error_handler');
const database = require('./../helpers/database');

//* CRUD Operations
exports.get_all_students = database.get_all(Student);
exports.get_student = database.get_one(Student);
exports.create_student = database.create_one(Student);
exports.update_student = database.update_one(Student);
exports.delete_student = database.delete_one(Student);
