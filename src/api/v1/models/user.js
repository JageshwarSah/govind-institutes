const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'Email already registered!'],
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlenth: 8,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password mismatch',
      },
    },
    passwordChangedAt: {
      type: Date,
    },

    passwordResetToken: String,
    passwordResetExpires: Date,

    profilePicture: {
      type: String,
      default: 'profile-default.jpg',
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'parent', 'student', 'user'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  this.passwordChangedAt = Date.now();
  next();
});

userSchema.methods.correct_token_timestamp = function (token_timestamp) {
  const password_modified_time = parseInt(
    this.passwordChangedAt.getTime() / 1000,
    10
  );

  // Returns whether password is changed after jwt was isssued
  return token_timestamp > password_modified_time;
};

userSchema.methods.verify_password = async function (
  candidate_password,
  user_password
) {
  try {
    return await bcrypt.compare(candidate_password, user_password);
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
