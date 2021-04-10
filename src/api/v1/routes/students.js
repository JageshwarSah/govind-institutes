const express = require('express');
const controller = require('./../controllers/students');
const auth = require('./../middlewares/authorization');

const router = express.Router();

router.use(auth.protect);
router
  .route('/')
  .get(auth.restrict_to('admin', 'teacher'), controller.get_all_students)
  .post(auth.restrict_to('admin'), controller.create_student);

router
  .route('/:id')
  .get(auth.restrict_to('admin', 'teacher'), controller.get_student)
  .patch(auth.restrict_to('admin'), controller.update_student)
  .delete(auth.restrict_to('admin'), controller.delete_student);

module.exports = router;
