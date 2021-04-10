const router = require('express').Router();

const controller = require('./../controllers/users');
const auth = require('./../middlewares/authorization');

// No authentication required for these routes
router.route('/signup').post(auth.signup);
router.route('/login').post(auth.login);

// router.route('/forgot-password').post(auth.forgot_password);
// router.route('/reset-password/:reset_token').post(auth.forgot_password);

// Authentication required

router.use(auth.protect);
router.route('/update-password').patch(auth.update_password);
router.route('/delete-me').post(auth.delete_me);

router.route('/').get(auth.restrict_to('admin'), controller.get_all_users);

router
  .route('/:id')
  .get(auth.restrict_to('admin'), controller.get_user)
  .delete(auth.restrict_to('admin'), controller.delete_user)
  .patch(auth.restrict_to('admin'), controller.update_user);

module.exports = router;
