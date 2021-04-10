const User = require('./../models/user');
const database = require('./../helpers/database');

//* CRUD Operations
exports.get_all_users = database.get_all(User);
exports.get_user = database.get_one(User);
//! User sign up for user creation
// exports.create_user = database.create_one(User);
exports.update_user = database.update_one(User);
exports.delete_user = database.delete_one(User);
