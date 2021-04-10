const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
    },
  ],
});

// teacherSchema.pre(/^find/, async function (next) {
//   next();
// });

module.exports = mongoose.model('Teacher', teacherSchema);
