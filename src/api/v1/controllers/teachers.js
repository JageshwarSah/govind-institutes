const Teacher = require('./../models/teacher');
const database = require('./../helpers/database');

//* Teacher CRUD Operations
exports.get_all_teachers = database.get_all(Teacher);
exports.get_teacher = database.get_one(Teacher, 'students');
exports.create_teacher = database.create_one(Teacher);
exports.update_teacher = database.update_one(Teacher);
exports.delete_teacher = database.delete_one(Teacher);
