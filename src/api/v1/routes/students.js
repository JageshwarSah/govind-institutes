const express = require('express');
const controller = require('./../controllers/students');

const router = express.Router();

router
  .route('/')
  .get(controller.get_all_students)
  .post(controller.create_student);

router
  .route('/:id')
  .get(controller.get_student)
  .patch(controller.update_student)
  .delete(controller.delete_student);

module.exports = router;
