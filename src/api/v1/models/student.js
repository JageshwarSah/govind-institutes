const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['student'],
      default: 'student',
    },
    name: {
      type: String,
      required: [true, 'Name cant be empty'],
      minlength: [4, 'Name must have more than 4 characters'],
      maxlength: [32, 'Name must have less than 32 characters'],
    },
    entrolmentId: {
      type: Number,
      unique: [true, 'Roll must be unique'],
      requried: [true, 'Roll is required'],
    },
    rollNumber: {
      type: Number,
      required: true,
    },
    profileImage: String,
    email: {
      type: String,
    },
    mobile: Number,
    registrationDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Fields
studentSchema.virtual('registrationYear').get(function () {
  return new Date(this.registrationDate).getFullYear();
});

// Export Model
module.exports = mongoose.model('Student', studentSchema);
