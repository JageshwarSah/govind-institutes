const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('./../models/user');
const Error = require('./../helpers/error_handler');

// Create Access Token
exports.create_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN * 10 * 3600 * 1000,
  });
};

//* Send new token
exports.send_new_token = (id) => {
  const token = this.create_token(id);
  res.status(201).json({
    status: 'success',
    token,
  });
};

// * Singing Up method
exports.signup = async (req, res, next) => {
  try {
    let new_user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    const token = this.create_token(new_user.id);

    res.status(201).json({
      status: 'success',
      token,
      data: new_user,
    });
  } catch (err) {
    next(err);
  }
};

//* Login method
exports.login = async (req, res, next) => {
  //TODO: Get login info
  const { email, password } = { ...req.body };

  //TODO: Check if required information are provided
  if (!email || !password)
    return next(new Error('Provide email and password', 400));

  //TODO: Check if user is available with provied info
  try {
    const user = await User.findOne({ email }).select('+password');

    // if (!user) return next(new Error('Email is not registed', 404));

    //TODO Verify User provided password with database
    if (!user || !(await user.verify_password(password, user.password)))
      return next(new Error('Invalid username or password', 401));

    //TODO: Create and send access token
    this.send_new_token(user.id);
  } catch (err) {
    next(err);
  }
};

//* Update My Password method
exports.update_password = async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = {
    ...req.body,
  };

  if (!currentPassword)
    return next(new Error('Provide your current password', 400));

  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!user || !(await user.verify_password(currentPassword, user.password)))
      return next(new Error('Your current password is incorrect', 400));

    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;

    await user.save();

    const token = this.create_token(user.id);
    response.success(res, 200, token);
  } catch (err) {
    next(err);
  }
};

//* Protect Access Middleware
exports.protect = async (req, res, next) => {
  //TODO: Check available token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new Error('You are not logged in. Please login!'));

  //TODO: Decode token payload
  let decoded_id;
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_PRIVATE_KEY
    );

    decoded_id = decoded.id;

    //TODO: Find user associated with the decoded payload
    const current_user = await User.findById(decoded_id);
    if (!current_user) return next(new Error('Invalid token'), 400);

    //TODO: Test for password modification after token was issued
    if (!current_user.correct_token_timestamp(decoded.iat))
      return next(new Error('User recently changed the password'));

    //TODO: Grant protected access
    //TODO: Pass user info with request objectd
    req.user = current_user;
    console.log('Protected access granted');
    next();
  } catch (err) {
    next(err);
  }
};

//* Restricted Access Middleware
exports.restrict_to = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new Error('You are not authorised to access this route'));

    //Grant Access
    next();
  };
};
